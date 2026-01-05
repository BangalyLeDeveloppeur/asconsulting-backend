import { addService, getAllService } from "../models/serviceModel.js";

export const uploadService = (req, res) => {
  const { titre, description } = req.body;

  addService(titre, description, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      id: result.insertId,
      message: "✅ Offre enregistrée",
      titre,
      description,
    });
  });
};

export const fetchService = (req, res) => {
  getAllService((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
