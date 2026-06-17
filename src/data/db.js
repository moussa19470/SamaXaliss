// src/data/db.js
// ─────────────────────────────────────────────────────────────
// Couche d'accès aux données.
// data.json est chargé une seule fois au démarrage.
// Toutes les mutations (inscription) se font en mémoire (runtime).
// ─────────────────────────────────────────────────────────────

let _db = null; // cache en mémoire

// ── Chargement initial ────────────────────────────────────────
export const loadDB = async () => {
  if (_db) return _db;
  const response = await fetch('./src/data/data.json');
  if (!response.ok) throw new Error('Impossible de charger data.json');
  _db = await response.json();
  return _db;
};

// ── Accès en lecture ──────────────────────────────────────────
export const getApp         = async () => (await loadDB()).app;
export const getUniversites = async () => (await loadDB()).universites;
export const getUtilisateurs= async () => (await loadDB()).utilisateurs;
export const getFeatures    = async () => (await loadDB()).features;
export const getFooterLinks = async () => (await loadDB()).footerLinks;

// ── Authentification ──────────────────────────────────────────
export const loginUser = async (email, motDePasse) => {
  const db = await loadDB();
  const user = db.utilisateurs.find(
    u => u.email === email && u.motDePasse === motDePasse
  );
  return user || null;
};

// ── Inscription (en mémoire) ──────────────────────────────────
export const registerUser = async ({ nom, email, motDePasse, universite, telephone }) => {
  const db = await loadDB();

  // Vérifier doublon email
  const existe = db.utilisateurs.find(u => u.email === email);
  if (existe) throw new Error('Cet email est déjà utilisé.');

  const nouvelUtilisateur = {
    id:         db.utilisateurs.length + 1,
    nom,
    email,
    motDePasse,
    universite,
    telephone,
    role: 'etudiant',
  };

  // Ajout en mémoire (pas de localStorage, pas de fichier — runtime uniquement)
  db.utilisateurs.push(nouvelUtilisateur);

  return nouvelUtilisateur;
};
