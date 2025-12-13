import express from "express";
import cors from "cors";

import contactsRoutes from "./routes/contactsRoute.js";
import serviceRoutes from "./routes/serviceRoute.js";
import slideRoutes from "./routes/slideRoutes.js";
import adminAuthRoute from "./routes/administrateursRoute.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Fichiers statiques
app.use("/uploads", express.static("uploads"));

// Routes API
app.use("/api/contacts", contactsRoutes);
app.use("/api/administrateur", adminAuthRoute);
app.use("/api/services", serviceRoutes);
app.use("/api/slide", slideRoutes);



// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur !" });
});

// Lancer le serveur
app.listen(PORT, () =>
  console.log(`🚀 API dispo sur http://localhost:${PORT}`)
);
