import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "asconsulting",
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connecté à MySQL");
});

export default db;
