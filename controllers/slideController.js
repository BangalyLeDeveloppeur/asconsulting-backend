import db from "../config/db.js";

//Enregistrer une photo + description en base
export const uploadPhoto = (req, res) => {
  const { titre, description } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "Aucune image envoyée" });
  }
  const imagePath = `/uploads/${req.file.filename}`;
  const sql = "INSERT INTO slide (image, titre, description) VALUES (?, ?, ?)";
  db.query(sql, [imagePath, titre, description], (err, result) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.status(201).json({
      message: "✅ Photo enregistrée",
      id: result.insertId,
      image: imagePath,
      description,
      titre,
    });
  });
};

export const getPhotos = (req, res) => {
  db.query("SELECT * FROM slide", (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.json(results);
  });
};
