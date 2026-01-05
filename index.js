import express from "express";
import cors from "cors";

import serviceRoutes from "./routes/serviceRoute.js";
import slideRoutes from "./routes/slideRoutes.js";
import temoignageRoute from "./routes/temoignageRoute.js";
import contactRoute from "./routes/formeRoute.js";

const app = express();
const PORT = 5000;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques
app.use("/uploads", express.static("uploads"));

// Routes API
app.use("/api/services", serviceRoutes);
app.use("/api/slide", slideRoutes);
app.use("/api/temoignages", temoignageRoute);
app.use("/api/contact", contactRoute);

// Gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur !" });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 API dispo sur http://localhost:${PORT}`);
});
