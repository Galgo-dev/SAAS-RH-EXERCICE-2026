import FormulaireCv from '../components/FormulaireCv.jsx'
import ResultatCv from '../components/ResultatCv.jsx'
import useAnalyseCv from '../hooks/useAnalyseCv.js'

function ParsingPage() {
  const { resultat, erreur, enCours, analyser } = useAnalyseCv()

  return (
    <>
      <h1>Analyse de CV</h1>
      <p>
        Le CV est comparé à l'offre « Lead Developer Python / IA » (5 ans d'expérience minimum) et
        reçoit un score d'adéquation de 0 à 100.
      </p>

      <FormulaireCv onSubmit={analyser} enCours={enCours} />

      <div aria-live="polite">
        {erreur && (
          <p role="alert" className="message-erreur">
            {erreur}
          </p>
        )}
        {resultat && <ResultatCv analyse={resultat} />}
      </div>
    </>
  )
}

export default ParsingPage
