import db from "../config/db.js";

export const addForme = (nom, prenom,email, message, callback) => {
  const sql = "INSERT INTO contact (nom, prenom, email, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [nom, prenom, email, message], callback);
};

export const getAllContact = (callback) => {
  const sql = "SELECT * FROM contact";
  db.query(sql, callback);
};
