import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadPhoto, getPhotos } from "../controllers/slideController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 📂 Configuration stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// 📌 Filtre fichiers (images uniquement)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées"));
  }
};

// Limite taille fichier
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// 📌 Routes

router.get("/", getPhotos);

// 🔐 Admin seulement (upload)
router.post("/", verifyToken, upload.single("image"), uploadPhoto);

export default router;
