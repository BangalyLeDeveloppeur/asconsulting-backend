import db from "../config/db.js";

export const addPhoto = (image, description, callback) => {
  const sql = "INSERT INTO slide (image, description, titre) VALUES (?, ?,?)";
  db.query(sql, [image, description, titre], callback);
};

export const getPhotos = (callback) => {
  const sql = "SELECT * FROM slide";
  db.query(sql, callback);
};
