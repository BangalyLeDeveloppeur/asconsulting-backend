import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { findAdminByEmail, addAdmin } from "../models/adminModel.js";

// 🔐 Enregistrer un nouvel admin
export const registerAdmin = (req, res) => {
  const { email, password, role } = req.body;

  // Vérifie si email déjà utilisé
  findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0)
      return res.status(400).json({ error: "Email déjà utilisé" });

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion
    addAdmin(email, hashedPassword, role || "admin", (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "✅ Administrateur créé avec succès !" });
    });
  });
};

// 🔑 Connexion admin
export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    const admin = results[0];

    // Vérification du mot de passe
    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      "SECRET_KEY", // ⚠️ à mettre dans process.env.JWT_SECRET
      { expiresIn: "2h" }
    );

    res.json({ message: "✅ Connexion réussie", token });
  });
};
