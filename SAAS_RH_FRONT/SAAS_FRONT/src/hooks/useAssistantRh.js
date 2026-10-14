import { useState } from 'react'
import { poserQuestion } from '../api/rag.api.js'
import { messageErreur } from '../api/messageErreur.js'

function useAssistantRh() {
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState(null)
  const [enCours, setEnCours] = useState(false)

  async function poser(question) {
    setEnCours(true)
    setErreur(null)
    setResultat(null)
    try {
      setResultat(await poserQuestion(question))
    } catch (error) {
      setErreur(messageErreur(error))
    } finally {
      setEnCours(false)
    }
  }

  return { resultat, erreur, enCours, poser }
}

export default useAssistantRh
