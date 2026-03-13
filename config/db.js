import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "asconsulting",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL :", err.message);
    return;
  }
  console.log("✅ Connecté à MySQL");
});
// Tout en bas du fichier, avant export default db
setTimeout(() => {
  console.log("⏱️ Vérification MySQL :", db.state);
}, 2000);
export default db;