import axios from 'axios'

// Seul fichier qui lit la variable d'environnement : les services et le chat en streaming s'en servent.
export const API_URL = import.meta.env.VITE_API_URL ?? '/api'

// Les appels au LLM peuvent prendre plusieurs secondes.
const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

export default axiosClient
