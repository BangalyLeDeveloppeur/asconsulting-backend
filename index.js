import "dotenv/config";
import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoute.js";
import slideRoutes from "./routes/slideRoutes.js";
import temoignageRoute from "./routes/temoignageRoute.js";
import contactRoute from "./routes/formeRoute.js";
import adminRoute from "./routes/adminRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://asconsulting-guinea.com",
      "https://www.asconsulting-guinea.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/services", serviceRoutes);
app.use("/api/slide", slideRoutes);
app.use("/api/temoignages", temoignageRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur !" });
});

app.listen(PORT, () => {
  console.log(`🚀 API disponible sur http://localhost:${PORT}`);
});