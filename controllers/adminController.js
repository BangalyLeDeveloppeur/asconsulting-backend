// controllers/adminController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAdminByEmail, addAdmin } from "../models/adminModel.js";

// 🔐 Créer un admin sécurisé
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email et mot de passe requis" });

  findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) return res.status(400).json({ error: "Email déjà utilisé" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      addAdmin(email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "✅ Administrateur créé avec mot de passe sécurisé" });
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création" });
    }
  });
};

// 🔑 Connexion admin
export const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email et mot de passe requis" });

  findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET || "secret_temp", { expiresIn: "2h" });

    res.json({ message: "✅ Connexion réussie", token, admin: { id: admin.id, email: admin.email } });
  });
};