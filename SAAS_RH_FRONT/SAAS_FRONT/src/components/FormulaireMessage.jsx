import { useState } from 'react'

const LONGUEUR_MAX = 2000

const EXEMPLE =
  'Trouve-moi un créneau le 2026-10-15 pour réserver un entretien avec Jean Dupont (jean.dupont@email.com)'

function FormulaireMessage({ onSubmit, enCours }) {
  const [texte, setTexte] = useState('')

  function envoyer() {
    if (!texte.trim() || enCours) return
    onSubmit(texte.trim())
    setTexte('')
  }

  function soumettre(event) {
    event.preventDefault()
    envoyer()
  }

  // Entrée envoie le message, Maj+Entrée ajoute un retour à la ligne.
  function toucheAppuyee(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      envoyer()
    }
  }

  return (
    <form className="carte" onSubmit={soumettre}>
      <div className="champ">
        <label className="champ__libelle" htmlFor="message-chat">
          Votre message
        </label>
        <textarea
          id="message-chat"
          className="champ__saisie"
          rows={2}
          maxLength={LONGUEUR_MAX}
          value={texte}
          onChange={(event) => setTexte(event.target.value)}
          onKeyDown={toucheAppuyee}
          disabled={enCours}
          aria-describedby="aide-message-chat"
        />
        <p id="aide-message-chat" className="champ__aide">
          Entrée pour envoyer, Maj+Entrée pour passer à la ligne.
        </p>
      </div>

      <button type="submit" className="bouton" disabled={enCours || !texte.trim()}>
        {enCours ? 'Réponse en cours…' : 'Envoyer'}
      </button>{' '}
      <button
        type="button"
        className="bouton bouton--secondaire"
        onClick={() => setTexte(EXEMPLE)}
        disabled={enCours}
      >
        Utiliser l'exemple de réservation
      </button>
    </form>
  )
}

export default FormulaireMessage
