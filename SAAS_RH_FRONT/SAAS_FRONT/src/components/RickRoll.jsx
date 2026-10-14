import './RickRoll.css'

function RickRoll({ onRetour }) {
  return (
    <section className="rickroll" aria-label="Surprise">
      <img
        className="rickroll__gif"
        src="/rickroll.gif"
        alt="Rick Astley en train de danser : vous venez d'être rickrollé"
      />
      <p className="rickroll__texte">Vous venez d'être rickrollé !</p>
      <button type="button" className="bouton bouton--secondaire" onClick={onRetour}>
        Retour à la conversation
      </button>
    </section>
  )
}

export default RickRoll
