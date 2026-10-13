import { Router } from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { analyserCv, ErreurAnalyseCv } from "../services/candidates.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

async function extraireTextePdf(buffer) {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const { text } = await parser.getText();
    return text;
  } finally {
    await parser.destroy();
  }
}

router.post("/parse", upload.single("cv"), async (req, res) => {
  const { file } = req;
  const offre = req.body?.offre || undefined;

  if (file && file.mimetype !== "application/pdf") {
    return res.status(400).json({ erreur: "Le fichier doit être un PDF" });
  }

  let texteCv;
  try {
    texteCv = file ? await extraireTextePdf(file.buffer) : req.body?.texte;
  } catch {
    return res.status(400).json({ erreur: "PDF illisible" });
  }

  if (typeof texteCv !== "string" || !texteCv.trim()) {
    return res.status(400).json({
      erreur: "Fournir un fichier PDF (champ cv) ou un texte (champ texte)",
    });
  }

  try {
    res.json(await analyserCv(texteCv, offre));
  } catch (err) {
    if (err instanceof ErreurAnalyseCv) {
      return res.status(422).json({ erreur: err.message, details: err.details });
    }
    throw err;
  }
});

export default router;
