import { AGENDA_RECRUTEUR } from "../data/agenda.js";

export function rechercherCreneauxEntretien(date) {
  return AGENDA_RECRUTEUR[date] ?? [];
}

export function reserverEntretien({ candidatNom, date, heure, email }) {
  const creneaux = AGENDA_RECRUTEUR[date];

  if (!creneaux?.includes(heure)) {
    return { statut: "ERREUR", message: "Créneau indisponible." };
  }

  creneaux.splice(creneaux.indexOf(heure), 1);
  return {
    statut: "SUCCES",
    message: `Entretien confirmé pour ${candidatNom} le ${date} à ${heure}. Invitation envoyée à ${email}.`,
  };
}
