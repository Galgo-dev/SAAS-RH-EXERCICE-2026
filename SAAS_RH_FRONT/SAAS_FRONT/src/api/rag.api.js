import axiosClient from './axiosClient.js'

// Pose une question sur les politiques RH : renvoie { reponse, sources }.
export async function poserQuestion(question) {
  const { data } = await axiosClient.post('/rag/ask', { question })
  return data
}
