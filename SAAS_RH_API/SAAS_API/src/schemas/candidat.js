import { z } from "zod";

export const analyseCvSchema = z.object({
  nom: z.string(),
  email: z.string(),
  competences: z.array(z.string()),
  anneesExperience: z.number().min(0),
  niveauEtudes: z.string(),
  score: z.number().int().min(0).max(100),
  justifications: z.array(z.string()).min(1),
  pointsVigilance: z.array(z.string()),
});
