import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadPhoto, getPhotos } from "../controllers/slideController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 📂 Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 📌 Routes
router.post("/", upload.single("image"), uploadPhoto);
router.get("/", getPhotos);

export default router;
