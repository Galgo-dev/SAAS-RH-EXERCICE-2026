import OutilAppele from './OutilAppele.jsx'
import './MessageChat.css'

// L'agent répond en Markdown : seul le **gras** est mis en forme, le reste reste du texte brut.
function formaterTexte(texte) {
  return texte
    .split(/(\*\*[^*]+\*\*)/)
    .map((morceau, index) =>
      morceau.startsWith('**') && morceau.endsWith('**') && morceau.length > 4 ? (
        <strong key={index}>{morceau.slice(2, -2)}</strong>
      ) : (
        morceau
      ),
    )
}

function MessageChat({ message, enAttente }) {
  const auteur = message.role === 'user' ? 'Vous' : 'Agent'
  const aucuneReponse = !message.contenu && message.outils.length === 0 && !message.erreur

  return (
    <article className={`message-chat message-chat--${message.role}`}>
      <p className="message-chat__auteur">{auteur}</p>

      {message.outils.map((outil) => (
        <OutilAppele key={outil.id} outil={outil} />
      ))}

      {message.contenu && <p className="message-chat__texte">{formaterTexte(message.contenu)}</p>}
      {enAttente && aucuneReponse && <p className="message-chat__attente">L'agent réfléchit…</p>}

      {message.erreur && (
        <p role="alert" className="message-erreur">
          {message.erreur}
        </p>
      )}
    </article>
  )
}

export default MessageChat
