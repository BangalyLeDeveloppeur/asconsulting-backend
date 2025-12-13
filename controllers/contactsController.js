import { createUser } from "../models/contactsModel.js";

export const addUser = (req, res) => {
  const { nom, prenom, email, message } = req.body;

  createUser(nom, prenom ,email, message, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, nom, prenom, email, message });
  });
};
