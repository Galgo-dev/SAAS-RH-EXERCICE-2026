import './ReponseRag.css'

function ReponseRag({ reponse, sources }) {
  return (
    <section className="carte reponse-rag" aria-labelledby="titre-reponse">
      <h2 id="titre-reponse">Réponse</h2>
      <p className="reponse-rag__texte">{reponse}</p>

      <h3>Sources</h3>
      {sources.length > 0 ? (
        <ul className="reponse-rag__sources">
          {sources.map((source) => (
            <li key={source.id} className="reponse-rag__source">
              <p className="reponse-rag__source-titre">{source.titre}</p>
              <blockquote className="reponse-rag__extrait">{source.extrait}</blockquote>
            </li>
          ))}
        </ul>
      ) : (
        <p className="reponse-rag__aucune-source">
          Aucune source : la politique interne ne précise pas ce point.
        </p>
      )}
    </section>
  )
}

export default ReponseRag
