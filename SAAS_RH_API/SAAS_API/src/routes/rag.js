import { Router } from "express";
import { z } from "zod";
import { repondreQuestion } from "../services/rag.js";

const router = Router();

const questionSchema = z.object({
  question: z.string().trim().min(1).max(500),
});

router.post("/ask", async (req, res) => {
  const resultat = questionSchema.safeParse(req.body);

  if (!resultat.success) {
    return res
      .status(400)
      .json({ erreur: "Champ question requis (1 à 500 caractères)" });
  }

  res.json(await repondreQuestion(resultat.data.question));
});

export default router;
