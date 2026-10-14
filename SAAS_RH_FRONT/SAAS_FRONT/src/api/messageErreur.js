export const MESSAGE_API_INJOIGNABLE = "Impossible de joindre l'API. Vérifiez qu'elle est démarrée."

// Transforme une erreur Axios en message lisible pour l'utilisateur.
export function messageErreur(error) {
  if (error.response) {
    // 502 à 504 : le proxy ou la passerelle ne joint pas l'API.
    if ([502, 503, 504].includes(error.response.status)) return MESSAGE_API_INJOIGNABLE
    return error.response.data?.erreur ?? `Erreur ${error.response.status}`
  }
  if (error.code === 'ECONNABORTED') {
    return 'La requête a pris trop de temps. Réessayez.'
  }
  return MESSAGE_API_INJOIGNABLE
}
