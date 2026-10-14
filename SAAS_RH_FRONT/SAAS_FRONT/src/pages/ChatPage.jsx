import { useEffect, useRef } from 'react'
import FormulaireMessage from '../components/FormulaireMessage.jsx'
import MessageChat from '../components/MessageChat.jsx'
import useChatAgent from '../hooks/useChatAgent.js'
import './ChatPage.css'

function ChatPage() {
  const { messages, enCours, envoyer, reinitialiser } = useChatAgent()
  const liste = useRef(null)

  // Garde le dernier message visible pendant que la réponse arrive.
  useEffect(() => {
    liste.current.scrollTop = liste.current.scrollHeight
  }, [messages])

  return (
    <>
      <h1>Agent de recrutement</h1>
      <p>
        Demandez à l'agent de chercher des créneaux d'entretien puis de réserver. Les outils qu'il
        utilise s'affichent pendant la conversation.
      </p>

      <div className="chat__actions">
        <button
          type="button"
          className="bouton bouton--secondaire"
          onClick={reinitialiser}
          disabled={messages.length === 0}
        >
          Nouvelle conversation
        </button>
      </div>

      <div ref={liste} className="chat__liste carte" role="log" aria-live="polite" aria-label="Conversation">
        {messages.length === 0 && (
          <p className="chat__vide">Aucun message pour le moment. Écrivez à l'agent ci-dessous.</p>
        )}
        {messages.map((message, index) => (
          <MessageChat
            key={message.id}
            message={message}
            enAttente={enCours && index === messages.length - 1}
          />
        ))}
      </div>

      <FormulaireMessage onSubmit={envoyer} enCours={enCours} />
    </>
  )
}

export default ChatPage
