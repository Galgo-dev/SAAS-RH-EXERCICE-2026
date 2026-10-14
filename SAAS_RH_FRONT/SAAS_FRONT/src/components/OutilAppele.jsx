import './OutilAppele.css'

const OUTILS = {
  rechercher_creneaux_entretien: {
    libelle: 'Recherche de créneaux',
    champs: { date: 'Date' },
  },
  reserver_entretien: {
    libelle: "Réservation d'entretien",
    champs: { candidat_nom: 'Candidat', date: 'Date', heure: 'Heure', email: 'Email' },
  },
}

// Résume le résultat d'un outil en une phrase ; le statut est écrit en toutes lettres.
function resumerResultat(resultat) {
  if (Array.isArray(resultat)) {
    return resultat.length > 0
      ? { texte: `${resultat.length} créneau(x) disponible(s) : ${resultat.join(', ')}` }
      : { texte: 'Aucun créneau disponible.' }
  }

  const succes = resultat.statut === 'SUCCES'
  return { statut: succes ? 'Succès' : 'Erreur', echec: !succes, texte: resultat.message }
}

function OutilAppele({ outil }) {
  const { libelle, champs } = OUTILS[outil.nom] ?? { libelle: outil.nom, champs: {} }
  const enCours = outil.resultat === null
  const resume = enCours ? null : resumerResultat(outil.resultat)

  return (
    <section
      className={`outil-appele${resume?.echec ? ' outil-appele--echec' : ''}`}
      aria-busy={enCours}
    >
      <p className="outil-appele__titre">
        Outil : {libelle}
        {enCours && <span className="outil-appele__etat"> · en cours…</span>}
        {resume?.statut && <span className="outil-appele__etat"> · {resume.statut}</span>}
      </p>

      <dl className="outil-appele__arguments">
        {Object.entries(champs).map(([cle, etiquette]) =>
          outil.arguments[cle] ? (
            <div key={cle}>
              <dt>{etiquette}</dt>
              <dd>{outil.arguments[cle]}</dd>
            </div>
          ) : null,
        )}
      </dl>

      {resume && <p className="outil-appele__resultat">{resume.texte}</p>}
    </section>
  )
}

export default OutilAppele
