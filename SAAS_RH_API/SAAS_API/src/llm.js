import OpenAI from "openai";
import { pipeline } from "@huggingface/transformers";

export const MODELE = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Point d'entrée unique des appels LLM (Groq, API compatible OpenAI).
// `params` : messages, temperature, tools, stream, response_format...
export function appelerLLM(params) {
  return client.chat.completions.create({ model: MODELE, ...params });
}

// Groq ne propose pas d'embeddings : le modèle multilingue tourne en local.
// Le modèle e5 attend le préfixe "query: " pour une question et "passage: " pour un document.
const MODELE_EMBEDDING = "Xenova/multilingual-e5-small";
let extracteur;

export async function creerEmbedding(texte, type = "passage") {
  extracteur ??= pipeline("feature-extraction", MODELE_EMBEDDING);
  const sortie = await (await extracteur)(`${type}: ${texte}`, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(sortie.data);
}
