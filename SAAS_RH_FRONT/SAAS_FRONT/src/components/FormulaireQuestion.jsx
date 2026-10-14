import { useState } from 'react'
import './FormulaireQuestion.css'

const LONGUEUR_MAX = 500

const EXEMPLES = [
  'Combien de jours de RTT ai-je droit et puis-je les placer sur un CET ?',
  'Combien de jours de télétravail par semaine ?',
  'Quelle est la valeur des tickets restaurant ?',
  "Quelle est la prime de naissance accordée par l'entreprise ?",
]

function FormulaireQuestion({ onSubmit, enCours }) {
  const [question, setQuestion] = useState('')
  const [erreurSaisie, setErreurSaisie] = useState(null)

  function envoyer(event) {
    event.preventDefault()

    if (!question.trim()) {
      setErreurSaisie('Saisissez une question.')
      return
    }
    setErreurSaisie(null)
    onSubmit(question.trim())
  }

  function choisirExemple(exemple) {
    setQuestion(exemple)
    setErreurSaisie(null)
  }

  return (
    <form className="carte" onSubmit={envoyer}>
      <div className="champ">
        <label className="champ__libelle" htmlFor="question-rh">
          Votre question
        </label>
        <textarea
          id="question-rh"
          className="champ__saisie"
          rows={3}
          maxLength={LONGUEUR_MAX}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          disabled={enCours}
          aria-describedby="compteur-question"
        />
        <p id="compteur-question" className="champ__aide">
          {question.length} / {LONGUEUR_MAX} caractères
        </p>
      </div>

      <div className="exemples-question">
        <p className="champ__aide">Exemples de questions :</p>
        <ul className="exemples-question__liste">
          {EXEMPLES.map((exemple) => (
            <li key={exemple}>
              <button
                type="button"
                className="bouton bouton--secondaire exemples-question__bouton"
                onClick={() => choisirExemple(exemple)}
                disabled={enCours}
              >
                {exemple}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {erreurSaisie && (
        <p role="alert" className="message-erreur">
          {erreurSaisie}
        </p>
      )}

      <button type="submit" className="bouton" disabled={enCours}>
        {enCours ? 'Réponse en cours…' : 'Poser la question'}
      </button>
    </form>
  )
}

export default FormulaireQuestion
