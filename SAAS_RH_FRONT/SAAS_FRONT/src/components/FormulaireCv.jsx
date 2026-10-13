import { useState } from 'react'

const TAILLE_MAX_OCTETS = 5 * 1024 * 1024

function FormulaireCv({ onSubmit, enCours }) {
  const [texte, setTexte] = useState('')
  const [fichier, setFichier] = useState(null)
  const [cleFichier, setCleFichier] = useState(0)
  const [erreurSaisie, setErreurSaisie] = useState(null)

  function choisirFichier(event) {
    const choix = event.target.files[0] ?? null
    setErreurSaisie(null)

    if (choix && choix.type !== 'application/pdf') {
      setErreurSaisie('Le fichier doit être un PDF.')
      setCleFichier((cle) => cle + 1)
      return
    }
    if (choix && choix.size > TAILLE_MAX_OCTETS) {
      setErreurSaisie('Le fichier dépasse 5 Mo.')
      setCleFichier((cle) => cle + 1)
      return
    }
    setFichier(choix)
  }

  function retirerFichier() {
    setFichier(null)
    setCleFichier((cle) => cle + 1)
  }

  function envoyer(event) {
    event.preventDefault()

    if (!fichier && !texte.trim()) {
      setErreurSaisie('Saisissez le texte du CV ou choisissez un fichier PDF.')
      return
    }
    setErreurSaisie(null)
    onSubmit(fichier ? { fichier } : { texte })
  }

  return (
    <form className="carte" onSubmit={envoyer}>
      <div className="champ">
        <label className="champ__libelle" htmlFor="texte-cv">
          Texte du CV
        </label>
        <textarea
          id="texte-cv"
          className="champ__saisie"
          rows={10}
          value={texte}
          onChange={(event) => setTexte(event.target.value)}
          disabled={Boolean(fichier) || enCours}
          aria-describedby="aide-texte-cv"
        />
        <p id="aide-texte-cv" className="champ__aide">
          {fichier
            ? 'Un fichier PDF est sélectionné : il sera analysé à la place du texte.'
            : 'Collez le contenu du CV, ou choisissez un fichier PDF ci-dessous.'}
        </p>
      </div>

      <div className="champ">
        <label className="champ__libelle" htmlFor="fichier-cv">
          Fichier PDF (5 Mo maximum)
        </label>
        <input
          key={cleFichier}
          id="fichier-cv"
          className="champ__saisie"
          type="file"
          accept="application/pdf"
          onChange={choisirFichier}
          disabled={enCours}
        />
        {fichier && (
          <button type="button" className="bouton bouton--secondaire" onClick={retirerFichier} disabled={enCours}>
            Retirer le fichier
          </button>
        )}
      </div>

      {erreurSaisie && (
        <p role="alert" className="message-erreur">
          {erreurSaisie}
        </p>
      )}

      <button type="submit" className="bouton" disabled={enCours}>
        {enCours ? 'Analyse en cours…' : 'Analyser le CV'}
      </button>
    </form>
  )
}

export default FormulaireCv
