// routes/adminRoute.js
import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Routes publiques
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Route protégée
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Bienvenue sur le dashboard admin, ${req.admin.email}` });
});

// EXPORT PAR DÉFAUT ! 💥
export default router;