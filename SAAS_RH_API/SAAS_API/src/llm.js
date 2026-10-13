import OpenAI from "openai";

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
