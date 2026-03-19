import nodemailer from "nodemailer";
import { addForme, getAllContact } from "../models/formModel.js";

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fonction pour envoyer l'email
const envoyerEmail = async ({
  type_personne,
  nom,
  prenom,
  telephone,
  email,
  message,
  nom_entreprise,
  secteur_activite,
  siege_entreprise,
}) => {
  const isPhysique = type_personne === "physique";

  const contenuEmail = isPhysique
    ? `
        <h2>Nouveau Contact - Personne Physique</h2>
        <p><b>Nom :</b> ${nom} ${prenom}</p>
        <p><b>Téléphone :</b> ${telephone}</p>
        <p><b>Email :</b> ${email}</p>
        <hr/>
        <p><b>Message :</b></p>
        <p>${message}</p>
      `
    : `
        <h2>Nouveau Contact - Personne Morale</h2>
        <p><b>Entreprise :</b> ${nom_entreprise}</p>
        <p><b>Secteur d'activité :</b> ${secteur_activite}</p>
        <p><b>Siège :</b> ${siege_entreprise}</p>
        <p><b>Téléphone :</b> ${telephone}</p>
        <p><b>Email :</b> ${email}</p>
        <hr/>
        <p><b>Message :</b></p>
        <p>${message}</p>
      `;

  await transporter.sendMail({
    from: `"AS Consulting Site Web" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Nouveau message - ${isPhysique ? nom + " " + prenom : nom_entreprise}`,
    html: contenuEmail,
  });
};

// Pour créer un nouveau contact
export const uploadForm = (req, res) => {
  const {
    telephone,
    email,
    message,
    nom,
    prenom,
    nom_entreprise,
    secteur_activite,
    siege_entreprise,
    type_personne,
  } = req.body;

  console.log("Données reçues:", req.body);

  if (type_personne === "physique") {
    if (!nom || !prenom) {
      return res.status(400).json({
        error:
          "Les champs nom et prénom sont requis pour une personne physique",
      });
    }
  } else if (type_personne === "morale") {
    if (!nom_entreprise) {
      return res.status(400).json({
        error: "Le nom de l'entreprise est requis pour une personne morale",
      });
    }
  }

  addForme(
    nom || null,
    prenom || null,
    telephone,
    email,
    message,
    nom_entreprise || null,
    secteur_activite || null,
    siege_entreprise || null,
    async (err, result) => {
      if (err) {
        console.error("Erreur BD:", err);
        return res.status(500).json({ error: err.message });
      }

      try {
        await envoyerEmail({
          type_personne,
          nom,
          prenom,
          telephone,
          email,
          message,
          nom_entreprise,
          secteur_activite,
          siege_entreprise,
        });
        console.log("✅ Email envoyé avec succès");
      } catch (emailError) {
        console.error("⚠️ Erreur envoi email:", emailError);
      }

      res.status(201).json({
        success: true,
        id: result.insertId,
        message: "✅ Message envoyé avec succès",
        type_personne,
      });
    },
  );
};

// Pour récupérer tous les contacts
export const fetchForm = (req, res) => {
  getAllContact((err, results) => {
    if (err) {
      console.error("Erreur BD:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
