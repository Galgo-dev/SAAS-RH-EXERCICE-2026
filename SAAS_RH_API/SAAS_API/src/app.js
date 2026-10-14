import express from "express";
import agentRouter from "./routes/agent.js";
import candidatesRouter from "./routes/candidates.js";
import interviewsRouter from "./routes/interviews.js";
import ragRouter from "./routes/rag.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ statut: "ok" });
});

app.use("/api/agent", agentRouter);
app.use("/api/candidates", candidatesRouter);
app.use("/api/interviews", interviewsRouter);
app.use("/api/rag", ragRouter);

app.use((req, res) => {
  res.status(404).json({ erreur: "Route introuvable" });
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erreur: "Corps de requête JSON invalide" });
  }
  if (err.name === "MulterError") {
    return res.status(400).json({ erreur: `Fichier refusé : ${err.message}` });
  }
  // 429 renvoyé par le LLM : quota de tokens ou de requêtes atteint.
  if (err.status === 429) {
    return res.status(429).json({ erreur: "Quota du modèle atteint", code: "QUOTA_LLM" });
  }
  console.error(err);
  res.status(500).json({ erreur: "Erreur interne du serveur" });
});

export default app;
