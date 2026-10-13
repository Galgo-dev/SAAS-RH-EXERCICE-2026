import { Router } from "express";
import { z } from "zod";
import { executerAgent } from "../services/agent.js";

const router = Router();

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20)
    .refine((messages) => messages.at(-1)?.role === "user", {
      message: "Le dernier message doit venir de l'utilisateur",
    }),
});

router.post("/chat", async (req, res) => {
  const resultat = chatSchema.safeParse(req.body);

  if (!resultat.success) {
    return res.status(400).json({
      erreur: "Corps invalide : { messages: [{ role, content }] } attendu",
    });
  }

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  const emit = (evenement, donnees) => {
    res.write(`event: ${evenement}\ndata: ${JSON.stringify(donnees)}\n\n`);
  };

  const controller = new AbortController();
  res.on("close", () => controller.abort());

  try {
    await executerAgent(resultat.data.messages, emit, controller.signal);
  } catch (err) {
    console.error(err);
    emit("error", { message: "Erreur interne de l'agent" });
  }

  res.end();
});

export default router;
