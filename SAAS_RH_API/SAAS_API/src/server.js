import app from "./app.js";
import { indexerPolitiques } from "./services/rag.js";

const PORT = process.env.PORT ?? 3000;

await indexerPolitiques();

app.listen(PORT, () => {
  console.log(`API RH Copilot démarrée sur http://localhost:${PORT}`);
});
