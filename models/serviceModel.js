import db from "../config/db.js";

export const addService = (titre, description,callback) => {
  const sql =
    "INSERT INTO services (titre, description, image_url) VALUES (?, ?, ?)";
  db.query(sql, [titre, description], callback);
};

export const getAllService = (callback) => {
  const sql = "SELECT * FROM services";
  db.query(sql, callback);
};
