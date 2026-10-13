import { Router } from "express";
import { z } from "zod";
import { rechercherCreneauxEntretien } from "../services/agenda.js";

const router = Router();

const querySlotsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD"),
});

router.get("/slots", (req, res) => {
  const resultat = querySlotsSchema.safeParse(req.query);

  if (!resultat.success) {
    return res
      .status(400)
      .json({ erreur: "Paramètre date invalide (format YYYY-MM-DD)" });
  }

  const { date } = resultat.data;
  res.json({ date, creneaux: rechercherCreneauxEntretien(date) });
});

export default router;
