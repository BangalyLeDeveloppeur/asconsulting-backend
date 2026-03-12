import db from "../config/db.js";

export const addForme = (nom, prenom, telephone ,email, message, nom_entreprise, secteur_activite, siege_entreprise, callback) => {
  const sql = "INSERT INTO contacts (nom, prenom, telephone, email, message,nom_entreprise,secteur_activite, siege_entreprise) VALUES (?, ?, ?, ?,?,?,?,?)";
  db.query(sql, [nom, prenom, telephone, email, message, nom_entreprise, secteur_activite, siege_entreprise], callback);
};

export const getAllContact = (callback) => {
  const sql = "SELECT * FROM contacts";
  db.query(sql, callback);
};
