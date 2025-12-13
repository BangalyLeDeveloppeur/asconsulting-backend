import db from "../config/db.js";

export const createUser = (nom, prenom, email, message, callback) => {
   console.log("🛢️  Données reçues pour insertion:", { nom, prenom, email, message });
  const sql = "INSERT INTO contacts (nom, prenom, email, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [nom, prenom, email, message], callback);
};
