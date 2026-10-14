import { useEffect, useRef, useState } from 'react'
import { ErreurHttp, envoyerMessages } from '../api/chat.api.js'
import { MESSAGE_API_INJOIGNABLE } from '../api/messageErreur.js'

// Limites de l'API : 20 messages au plus, 2000 caractères par message.
const MAX_MESSAGES = 20
const MAX_CARACTERES = 2000

function lireArguments(texte) {
  try {
    return JSON.parse(texte)
  } catch {
    return {}
  }
}

// L'API ne reçoit que le texte de la conversation (pas les cartes d'outils).
function construireHistorique(messages) {
  return messages
    .filter((message) => message.contenu)
    .map((message) => ({ role: message.role, content: message.contenu.slice(0, MAX_CARACTERES) }))
    .slice(-MAX_MESSAGES)
}

function messageErreurChat(error) {
  const apiInjoignable = !(error instanceof ErreurHttp) || [502, 503, 504].includes(error.statut)
  return apiInjoignable ? MESSAGE_API_INJOIGNABLE : error.message
}

function useChatAgent() {
  const [messages, setMessages] = useState([])
  const [enCours, setEnCours] = useState(false)
  const prochainId = useRef(0)
  const controleur = useRef(null)

  // Arrête le flux en cours quand la page est quittée.
  useEffect(() => () => controleur.current?.abort(), [])

  async function envoyer(texte) {
    const idAssistant = ++prochainId.current
    const messageUtilisateur = { id: ++prochainId.current, role: 'user', contenu: texte, outils: [] }
    const messageAssistant = { id: idAssistant, role: 'assistant', contenu: '', outils: [], erreur: null }

    const historique = construireHistorique([...messages, messageUtilisateur])
    setMessages([...messages, messageUtilisateur, messageAssistant])
    setEnCours(true)

    const ceControleur = new AbortController()
    controleur.current = ceControleur

    const modifierAssistant = (modifier) =>
      setMessages((precedents) =>
        precedents.map((message) => (message.id === idAssistant ? modifier(message) : message)),
      )

    function appliquerEvenement(nom, donnees) {
      if (nom === 'token') {
        modifierAssistant((m) => ({ ...m, contenu: m.contenu + donnees.texte }))
      } else if (nom === 'tool_call') {
        const outil = {
          id: ++prochainId.current,
          nom: donnees.nom,
          arguments: lireArguments(donnees.arguments),
          resultat: null,
        }
        modifierAssistant((m) => ({ ...m, outils: [...m.outils, outil] }))
      } else if (nom === 'tool_result') {
        modifierAssistant((m) => {
          // Rattache le résultat au premier outil du même nom encore sans résultat.
          const cible = m.outils.find((o) => o.nom === donnees.nom && o.resultat === null)
          return {
            ...m,
            outils: m.outils.map((o) => (o === cible ? { ...o, resultat: donnees.resultat } : o)),
          }
        })
      } else if (nom === 'error') {
        modifierAssistant((m) => ({ ...m, erreur: donnees.message }))
      }
    }

    try {
      await envoyerMessages(historique, {
        signal: ceControleur.signal,
        onEvenement: appliquerEvenement,
      })
    } catch (error) {
      if (error.name !== 'AbortError') {
        modifierAssistant((m) => ({ ...m, erreur: messageErreurChat(error) }))
      }
    } finally {
      if (controleur.current === ceControleur) setEnCours(false)
    }
  }

  function reinitialiser() {
    controleur.current?.abort()
    controleur.current = null
    setMessages([])
    setEnCours(false)
  }

  return { messages, enCours, envoyer, reinitialiser }
}

export default useChatAgent
