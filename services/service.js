/* ═══════════════════════════════════════════════════════════════
   service.js — SamaXalis API Service Layer
   Toutes les fonctions de communication avec json-server
   Base URL : http://localhost:3000
   ═══════════════════════════════════════════════════════════════ */

const API_URL = 'http://localhost:3000';

/* ─────────────────────────────────────────────────────────────
   UTILITAIRES INTERNES
   ───────────────────────────────────────────────────────────── */

/**
 * Wrapper fetch générique avec gestion d'erreurs centralisée
 * @param {string} endpoint  - ex: '/users'
 * @param {object} options   - options fetch (method, body, headers...)
 * @returns {Promise<any>}
 */
async function _request(endpoint, options = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Erreur HTTP ${response.status}`);
    }
    // 204 No Content → pas de body
    if (response.status === 204) return null;
    return await response.json();
  } catch (err) {
    console.error(`[SamaXalis API] ${endpoint}:`, err.message);
    throw err;
  }
}

/**
 * Sauvegarde la session utilisateur dans localStorage
 */
function _saveSession(user) {
  localStorage.setItem('sx_user', JSON.stringify(user));
}

/**
 * Récupère l'utilisateur connecté depuis localStorage
 * @returns {object|null}
 */
function getSessionUser() {
  const raw = localStorage.getItem('sx_user');
  return raw ? JSON.parse(raw) : null;
}

/**
 * Supprime la session (déconnexion)
 */
function clearSession() {
  localStorage.removeItem('sx_user');
}


/* ─────────────────────────────────────────────────────────────
   AUTH — Inscription / Connexion / Déconnexion
   ───────────────────────────────────────────────────────────── */

/**
 * Inscription d'un nouvel étudiant
 * @param {{ fullname, email, password, universite, phone, wave_orange }} data
 * @returns {Promise<{user: object}>}
 */
async function register(data) {
  // Vérifier si l'email existe déjà
  const existing = await _request(`/users?email=${encodeURIComponent(data.email)}`);
  if (existing.length > 0) {
    throw new Error('Cet email est déjà utilisé.');
  }

  const newUser = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  const user = await _request('/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
  });

  // Créer un profil vide associé
  await _request('/profils', {
    method: 'POST',
    body: JSON.stringify({
      userId: user.id,
      niveau: '',
      filiere: '',
      anneeAcademique: '',
      bourseActive: false,
      montantBourse: 0,
      scoreFiabilite: 100,
      avatar: null,
      bio: '',
    }),
  });

  _saveSession(user);
  return { user };
}

/**
 * Connexion avec email + mot de passe
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object}>}
 */
async function login(email, password) {
  const results = await _request(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  if (results.length === 0) {
    throw new Error('Email ou mot de passe incorrect.');
  }

  const user = results[0];
  _saveSession(user);
  return { user };
}

/**
 * Déconnexion — efface la session locale
 */
function logout() {
  clearSession();
  window.location.reload();
}


/* ─────────────────────────────────────────────────────────────
   PROFIL ÉTUDIANT
   ───────────────────────────────────────────────────────────── */

/**
 * Récupère le profil complet d'un utilisateur
 * @param {number} userId
 * @returns {Promise<{user: object, profil: object}>}
 */
async function getProfil(userId) {
  const [userArr, profilArr] = await Promise.all([
    _request(`/users/${userId}`),
    _request(`/profils?userId=${userId}`),
  ]);
  return {
    user:   userArr,
    profil: profilArr[0] || null,
  };
}

/**
 * Met à jour les infos de base de l'utilisateur
 * @param {number} userId
 * @param {{ fullname?, phone?, wave_orange? }} data
 * @returns {Promise<object>} user mis à jour
 */
async function updateUser(userId, data) {
  const updated = await _request(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  _saveSession(updated);
  return updated;
}

/**
 * Met à jour le profil académique de l'étudiant
 * @param {number} profilId
 * @param {{ niveau?, filiere?, anneeAcademique?, bourseActive?, montantBourse?, bio? }} data
 * @returns {Promise<object>} profil mis à jour
 */
async function updateProfil(profilId, data) {
  return await _request(`/profils/${profilId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}


/* ─────────────────────────────────────────────────────────────
   PRÊTS
   ───────────────────────────────────────────────────────────── */

/**
 * Récupère tous les prêts d'un utilisateur (emprunteur OU prêteur)
 * @param {number} userId
 * @returns {Promise<{emprunts: object[], prets: object[]}>}
 */
async function getMesPrets(userId) {
  const [emprunts, prets] = await Promise.all([
    _request(`/prets?emprunteurId=${userId}`),
    _request(`/prets?preteurId=${userId}`),
  ]);
  return { emprunts, prets };
}

/**
 * Récupère un prêt par son ID
 * @param {number} pretId
 * @returns {Promise<object>}
 */
async function getPretById(pretId) {
  return await _request(`/prets/${pretId}`);
}

/**
 * Crée une nouvelle demande de prêt
 * @param {{ emprunteurId, preteurId, montant, motif, dateEcheance }} data
 * @returns {Promise<object>} prêt créé
 */
async function demanderPret(data) {
  if (!data.montant || data.montant <= 0) {
    throw new Error('Le montant doit être supérieur à 0 FCFA.');
  }
  if (!data.motif || data.motif.trim().length < 5) {
    throw new Error('Veuillez préciser le motif (minimum 5 caractères).');
  }

  const newPret = {
    ...data,
    statut: 'en_attente',
    dateCreation: new Date().toISOString(),
    dateRemboursement: null,
  };

  return await _request('/prets', {
    method: 'POST',
    body: JSON.stringify(newPret),
  });
}

/**
 * Accepte une demande de prêt (prêteur → en_cours)
 * @param {number} pretId
 * @returns {Promise<object>}
 */
async function accepterPret(pretId) {
  return await _request(`/prets/${pretId}`, {
    method: 'PATCH',
    body: JSON.stringify({ statut: 'en_cours' }),
  });
}

/**
 * Refuse une demande de prêt
 * @param {number} pretId
 * @returns {Promise<object>}
 */
async function refuserPret(pretId) {
  return await _request(`/prets/${pretId}`, {
    method: 'PATCH',
    body: JSON.stringify({ statut: 'refuse' }),
  });
}

/**
 * Marque un prêt comme remboursé
 * @param {number} pretId
 * @returns {Promise<object>}
 */
async function marquerRembourse(pretId) {
  return await _request(`/prets/${pretId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      statut: 'rembourse',
      dateRemboursement: new Date().toISOString(),
    }),
  });
}

/**
 * Supprime une demande de prêt (seulement si statut = en_attente)
 * @param {number} pretId
 * @returns {Promise<null>}
 */
async function supprimerPret(pretId) {
  const pret = await getPretById(pretId);
  if (pret.statut !== 'en_attente') {
    throw new Error('Seules les demandes en attente peuvent être supprimées.');
  }
  return await _request(`/prets/${pretId}`, { method: 'DELETE' });
}

/**
 * Récupère les statistiques de prêts d'un utilisateur
 * @param {number} userId
 * @returns {Promise<object>}
 */
async function getStatsPrets(userId) {
  const { emprunts, prets } = await getMesPrets(userId);
  const tous = [...emprunts, ...prets];

  return {
    totalEmprunte:    emprunts.reduce((s, p) => s + p.montant, 0),
    totalPreté:       prets.reduce((s, p) => s + p.montant, 0),
    enCours:          tous.filter(p => p.statut === 'en_cours').length,
    enAttente:        tous.filter(p => p.statut === 'en_attente').length,
    rembourses:       tous.filter(p => p.statut === 'rembourse').length,
    refuses:          tous.filter(p => p.statut === 'refuse').length,
  };
}


/* ─────────────────────────────────────────────────────────────
   EXPORTS — disponibles globalement dans le navigateur
   ───────────────────────────────────────────────────────────── */

window.SamaXalisService = {
  // Auth
  register,
  login,
  logout,
  getSessionUser,
  clearSession,

  // Profil
  getProfil,
  updateUser,
  updateProfil,

  // Prêts
  getMesPrets,
  getPretById,
  demanderPret,
  accepterPret,
  refuserPret,
  marquerRembourse,
  supprimerPret,
  getStatsPrets,
};