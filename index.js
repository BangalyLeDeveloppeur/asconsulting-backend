import express from "express";
import cors from "cors";

import serviceRoutes from "./routes/serviceRoute.js";
import slideRoutes from "./routes/slideRoutes.js";
import temoignageRoute from "./routes/temoignageRoute.js";
import contactRoute from "./routes/formeRoute.js";
import adminRoute from "./routes/adminRoute.js";

const app = express();
const PORT = 5000;

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Preflight
app.options("*", cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fichiers statiques
app.use("/uploads", express.static("uploads"));

// routes auth admin
app.use("/api/admin", adminRoute);

// route publique
app.use("/api/contacts", contactRoute);
app.use("/api/services", serviceRoutes);
app.use("/api/slide", slideRoutes);
app.use("/api/temoignages", temoignageRoute);

// gestion erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur !" });
});

// lancer serveur
app.listen(PORT, () => {
  console.log(`🚀 API dispo sur http://localhost:${PORT}`);
});
