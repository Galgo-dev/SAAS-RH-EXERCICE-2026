import axiosClient from './axiosClient.js'

// Analyse un CV : fichier PDF (multipart) ou texte brut (JSON).
export async function analyserCv({ texte, fichier }) {
  if (fichier) {
    const formulaire = new FormData()
    formulaire.append('cv', fichier)
    const { data } = await axiosClient.post('/candidates/parse', formulaire)
    return data
  }

  const { data } = await axiosClient.post('/candidates/parse', { texte })
  return data
}
