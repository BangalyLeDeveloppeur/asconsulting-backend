import db from "../config/db.js";

export const addTemoignages = (titre, description, callback) => {
  const sql = "INSERT INTO temoignages (titre, description) VALUES (?, ?)";
  db.query(sql, [titre, description], callback);
};

export const getAllTemoignages = (callback) => {
  const sql = "SELECT * FROM temoignages";
  db.query(sql, callback);
};
