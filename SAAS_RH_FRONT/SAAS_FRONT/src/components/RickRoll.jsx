import { useEffect, useRef } from 'react'
import './RickRoll.css'

// Le nom du fichier contient des espaces et des parenthèses : il faut l'encoder dans l'URL.
const MUSIQUE = encodeURI('/Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster).mp3')

function RickRoll({ onRetour }) {
  const lecteur = useRef(null)

  // La musique démarre avec le gif et s'arrête dès que le composant disparaît
  // (retour à la conversation, nouvelle conversation, changement de page).
  useEffect(() => {
    const audio = lecteur.current
    // Si le navigateur refuse la lecture automatique, les contrôles permettent de la lancer.
    audio.play().catch(() => {})

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <section className="rickroll" aria-label="Surprise">
      <img
        className="rickroll__gif"
        src="/rickroll.gif"
        alt="Rick Astley en train de danser : vous venez d'être rickrollé"
      />
      <p className="rickroll__texte">Vous venez d'être rickrollé !</p>
      <audio ref={lecteur} className="rickroll__lecteur" src={MUSIQUE} controls />
      <button type="button" className="bouton bouton--secondaire" onClick={onRetour}>
        Retour à la conversation
      </button>
    </section>
  )
}

export default RickRoll
