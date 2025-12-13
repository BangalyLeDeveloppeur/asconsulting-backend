import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authAdminController.js";

const router = express.Router();

router.post("/login", loginAdmin);       // Connexion admin
router.post("/register", registerAdmin); // Création admin

export default router;
