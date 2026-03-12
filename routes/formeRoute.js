import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  uploadForm,
  fetchForm,
} from "../controllers/formController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configuration multer pour les fichiers (si vous en avez besoin plus tard)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// MIDDLEWARE IMPORTANT : Pour parser le JSON
router.use(express.json()); // ← AJOUTEZ CECI
router.use(express.urlencoded({ extended: true })); // ← AJOUTEZ CECI

// Routes - une seule route pour gérer tous les formats
router.post("/", (req, res, next) => {
  // Vérifier le Content-Type
  const contentType = req.headers['content-type'];
  
  if (contentType && contentType.includes('multipart/form-data')) {
    // Si c'est un formulaire multipart, utiliser multer
    upload.none()(req, res, (err) => {
      if (err) return next(err);
      uploadForm(req, res);
    });
  } else {
    // Si c'est du JSON ou autre, passer directement
    uploadForm(req, res);
  }
});

router.get("/", fetchForm);

export default router;