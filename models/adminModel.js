import db from "../config/db.js";

//Chercher un admin par email 
export const findAdminByEmail = (email, callback) => {
  const sql = "SELECT * FROM administrateurs WHERE email = ?";
  db.query(sql, [email], callback);
};

//Insérer un nouvel admin
export const addAdmin = (email, password, role, callback) => {
  const sql = "INSERT INTO administrateurs (email, password, role) VALUES (?, ?, ?)";
  db.query(sql, [email, password, role], callback);
};
