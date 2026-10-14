import FormulaireQuestion from '../components/FormulaireQuestion.jsx'
import ReponseRag from '../components/ReponseRag.jsx'
import useAssistantRh from '../hooks/useAssistantRh.js'

function AssistantPage() {
  const { resultat, erreur, enCours, poser } = useAssistantRh()

  return (
    <>
      <h1>Assistant RH</h1>
      <p>
        Posez une question sur les politiques internes (congés, télétravail, formation,
        rémunération). L'assistant ne répond qu'à partir des documents internes : si le point n'y
        figure pas, il l'indique.
      </p>

      <FormulaireQuestion onSubmit={poser} enCours={enCours} />

      <div aria-live="polite">
        {erreur && (
          <p role="alert" className="message-erreur">
            {erreur}
          </p>
        )}
        {resultat && <ReponseRag reponse={resultat.reponse} sources={resultat.sources} />}
      </div>
    </>
  )
}

export default AssistantPage
