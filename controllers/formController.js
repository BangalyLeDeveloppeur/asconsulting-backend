import { addForme, getAllContact } from "../models/formModel.js";

// Pour créer un nouveau contact (personne physique ou morale)
export const uploadForm = (req, res) => {
  const { 
    // Champs communs
    telephone, 
    email, 
    message,
    
    // Champs personne physique
    nom,
    prenom,
    
    // Champs personne morale
    nom_entreprise, 
    secteur_activite, 
    siege_entreprise,
    
    // Type de personne (à envoyer depuis le frontend)
    type_personne 
  } = req.body;

  console.log("Données reçues:", req.body); // Pour le débogage

  // Validation selon le type
  if (type_personne === "physique") {
    if (!nom || !prenom) {
      return res.status(400).json({ 
        error: "Les champs nom et prénom sont requis pour une personne physique" 
      });
    }
  } else if (type_personne === "morale") {
    if (!nom_entreprise) {
      return res.status(400).json({ 
        error: "Le nom de l'entreprise est requis pour une personne morale" 
      });
    }
  }

  // Insertion en base de données
  addForme(
    nom || null,              // Si personne morale, nom = null
    prenom || null,           // Si personne morale, prenom = null
    telephone,
    email,
    message,
    nom_entreprise || null,   // Si personne physique, nom_entreprise = null
    secteur_activite || null, // Si personne physique, secteur_activite = null
    siege_entreprise || null, // Si personne physique, siege_entreprise = null
    (err, result) => {
      if (err) {
        console.error("Erreur BD:", err);
        return res.status(500).json({ error: err.message });
      }
      
      res.status(201).json({
        success: true,
        id: result.insertId,
        message: "✅ Message envoyé avec succès",
        type_personne
      });
    }
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

// Pour récupérer un contact spécifique (optionnel)
export const getContactById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM contacts WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Contact non trouvé" });
    }
    res.json(result[0]);
  });
};