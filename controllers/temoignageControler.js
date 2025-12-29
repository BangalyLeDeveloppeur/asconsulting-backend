import { addTemoignages, getAllTemoignages } from "../models/temoignageModel.js";

export const uploadTemoignages = (req, res) => {
  const { titre, description } = req.body;

  

  addTemoignages(titre, description,(err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      id: result.insertId,
      message: "✅ Description enregistrée",
      titre,
      description,
    });
  });
};

export const fetchTemoignages = (req, res) => {
  getAllTemoignages((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
