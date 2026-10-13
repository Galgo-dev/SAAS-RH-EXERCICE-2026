import express from "express";
import interviewsRouter from "./routes/interviews.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ statut: "ok" });
});

app.use("/api/interviews", interviewsRouter);

app.use((req, res) => {
  res.status(404).json({ erreur: "Route introuvable" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erreur: "Erreur interne du serveur" });
});

export default app;
