import { useState } from 'react'
import { analyserCv } from '../api/candidates.api.js'
import { messageErreur } from '../api/messageErreur.js'

function useAnalyseCv() {
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState(null)
  const [enCours, setEnCours] = useState(false)

  async function analyser(entree) {
    setEnCours(true)
    setErreur(null)
    setResultat(null)
    try {
      setResultat(await analyserCv(entree))
    } catch (error) {
      setErreur(messageErreur(error))
    } finally {
      setEnCours(false)
    }
  }

  return { resultat, erreur, enCours, analyser }
}

export default useAnalyseCv
