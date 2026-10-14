import { useEffect, useRef } from 'react'
import './ResultatCv.css'

// Le niveau est aussi écrit en toutes lettres : la couleur seule ne suffit pas.
function niveauScore(score) {
  if (score >= 70) return { libelle: 'Bonne adéquation', classe: 'bon' }
  if (score >= 40) return { libelle: 'Adéquation partielle', classe: 'moyen' }
  return { libelle: 'Faible adéquation', classe: 'faible' }
}

function ResultatCv({ analyse }) {
  const niveau = niveauScore(analyse.score)
  const section = useRef(null)

  // Le composant n'existe que lorsqu'une analyse est terminée : on amène le résultat à l'écran.
  useEffect(() => {
    const sansAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section.current.scrollIntoView({
      behavior: sansAnimation ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <section ref={section} className="carte resultat-cv" aria-labelledby="titre-resultat">
      <header className="resultat-cv__entete">
        <div>
          <h2 id="titre-resultat" className="resultat-cv__nom">
            {analyse.nom || 'Candidat non identifié'}
          </h2>
          <p className="resultat-cv__contact">{analyse.email || 'Email non renseigné'}</p>
        </div>
        <p className={`resultat-cv__score resultat-cv__score--${niveau.classe}`}>
          <span className="resultat-cv__score-valeur">{analyse.score}/100</span>
          <span>{niveau.libelle}</span>
        </p>
      </header>

      <dl className="resultat-cv__infos">
        <div>
          <dt>Expérience</dt>
          <dd>{analyse.anneesExperience} an(s)</dd>
        </div>
        <div>
          <dt>Niveau d'études</dt>
          <dd>{analyse.niveauEtudes || 'Non renseigné'}</dd>
        </div>
      </dl>

      <h3>Compétences</h3>
      {analyse.competences.length > 0 ? (
        <ul className="resultat-cv__competences">
          {analyse.competences.map((competence) => (
            <li key={competence}>{competence}</li>
          ))}
        </ul>
      ) : (
        <p>Aucune compétence identifiée.</p>
      )}

      <h3>Justification du score</h3>
      <ul className="liste-simple">
        {analyse.justifications.map((justification) => (
          <li key={justification}>{justification}</li>
        ))}
      </ul>

      <h3>Points de vigilance</h3>
      {analyse.pointsVigilance.length > 0 ? (
        <ul className="liste-simple">
          {analyse.pointsVigilance.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun point de vigilance.</p>
      )}
    </section>
  )
}

export default ResultatCv
