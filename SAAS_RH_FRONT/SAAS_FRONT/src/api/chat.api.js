import { API_URL } from './axiosClient.js'

// Erreur renvoyée par l'API avant le début du flux (400, 502...).
export class ErreurHttp extends Error {
  constructor(message, statut) {
    super(message)
    this.statut = statut
  }
}

// Transforme un bloc SSE ("event: nom\ndata: {json}") en { nom, donnees }.
function lireBloc(bloc) {
  const nom = bloc.match(/^event: (.*)$/m)?.[1]
  const donnees = bloc.match(/^data: (.*)$/m)?.[1]
  if (!nom || donnees === undefined) return null
  return { nom, donnees: JSON.parse(donnees) }
}

// Envoie la conversation à l'agent et relaie chaque événement SSE à `onEvenement(nom, donnees)`.
// fetch est utilisé à la place d'axios : le navigateur ne permet pas de lire un flux avec axios.
export async function envoyerMessages(messages, { onEvenement, signal }) {
  const reponse = await fetch(`${API_URL}/agent/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })

  if (!reponse.ok) {
    const corps = await reponse.json().catch(() => null)
    throw new ErreurHttp(corps?.erreur ?? `Erreur ${reponse.status}`, reponse.status)
  }

  const lecteur = reponse.body.getReader()
  const decodeur = new TextDecoder()
  let tampon = ''

  while (true) {
    const { done, value } = await lecteur.read()
    if (done) break

    tampon += decodeur.decode(value, { stream: true })
    // Un événement se termine par une ligne vide ; le dernier morceau peut être incomplet.
    const blocs = tampon.split('\n\n')
    tampon = blocs.pop()

    for (const bloc of blocs) {
      const evenement = lireBloc(bloc)
      if (evenement) onEvenement(evenement.nom, evenement.donnees)
    }
  }
}
