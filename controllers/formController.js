import { addForme, getAllContact } from "../models/formModel.js";

export const uploadForm = (req, res) => {
  const { nom, prenom, email, message } = req.body;

  addForme(nom, prenom, email, message, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      id: result.insertId,
      message: "✅ Offre enregistrée",
      nom,
      prenom,
      email,
      message,
    });
  });
};

export const fetchForm = (req, res) => {
  getAllContact((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
