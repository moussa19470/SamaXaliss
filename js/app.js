/* ═══════════════════════════════════════════════════════════════
   app.js — SamaXalis Router + UI Logic
   Injecte le HTML de chaque page dans #app et gère la navigation
   ═══════════════════════════════════════════════════════════════ */

const app = document.getElementById('app');

/* ─── ROUTER ─────────────────────────────────────────────────── */

const ROUTES = {
  home:     { render: renderHome,     bind: null              },
  login:    { render: renderLogin,    bind: bindLoginEvents    },
  register: { render: renderRegister, bind: bindRegisterEvents },
};

function showPage(name) {
  const route = ROUTES[name];
  if (!route) return console.warn(`[Router] Page inconnue : ${name}`);

  // Injecter le HTML dans #app
  app.innerHTML = route.render();

  // Animation d'entrée
  const pageEl = app.firstElementChild;
  if (pageEl) {
    pageEl.classList.add('page-enter');
  }

  // Binder les événements de la page
  if (route.bind) route.bind();

  // Mettre à jour la navbar
  _updateNavbar(name);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */

function _updateNavbar(currentPage) {
  const user    = SamaXalisService.getSessionUser();
  const isAuth  = !!user;

  const loginBtn  = document.getElementById('nav-login-btn');
  const logoutBtn = document.getElementById('nav-logout-btn');
  const userName  = document.getElementById('nav-user-name');

  if (loginBtn)  loginBtn.classList.toggle('hidden',  isAuth || currentPage !== 'home');
  if (logoutBtn) logoutBtn.classList.toggle('hidden', !isAuth);
  if (userName) {
    userName.textContent = isAuth ? user.fullname.split(' ')[0] : '';
    userName.classList.toggle('hidden', !isAuth);
  }
}

/* ─── HELPERS UI ─────────────────────────────────────────────── */

function togglePass(inputId, btn) {
  const input  = document.getElementById(inputId);
  const isPass = input.type === 'password';
  input.type   = isPass ? 'text' : 'password';
  btn.style.color = isPass ? 'var(--green-main)' : 'var(--gray-400)';
}

function showError(containerId, message) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 5000);
}

function setLoading(btnId, loading, label) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled    = loading;
  btn.textContent = loading ? 'Chargement...' : (label || btn.dataset.label);
}

/* ─── CONNEXION ──────────────────────────────────────────────── */

async function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('email-login').value.trim();
  const password = document.getElementById('pass-login').value;

  if (!email || !password) {
    showError('login-error', 'Veuillez remplir tous les champs.');
    return;
  }

  setLoading('btn-login', true);
  try {
    const { user } = await SamaXalisService.login(email, password);
    console.log('[Auth] Connecté :', user);
    // TODO: showPage('dashboard') quand le dashboard sera prêt
    alert(`Bienvenue ${user.fullname} ! 🎉`);
    showPage('home');
  } catch (err) {
    showError('login-error', err.message);
  } finally {
    setLoading('btn-login', false, 'Se connecter');
  }
}

/* ─── INSCRIPTION ────────────────────────────────────────────── */

async function handleRegister(e) {
  e.preventDefault();
  const data = {
    fullname:    document.getElementById('fullname').value.trim(),
    email:       document.getElementById('email-reg').value.trim(),
    universite:  document.getElementById('universite').value,
    phone:       '+221 ' + document.getElementById('phone').value.trim(),
    wave_orange: document.getElementById('phone').value.replace(/\s/g, ''),
    password:    document.getElementById('pass-reg').value,
  };

  if (!data.fullname || !data.email || !data.universite || !data.password) {
    showError('register-error', 'Veuillez remplir tous les champs obligatoires.');
    return;
  }
  if (data.password.length < 6) {
    showError('register-error', 'Le mot de passe doit comporter au moins 6 caractères.');
    return;
  }

  setLoading('btn-register', true);
  try {
    const { user } = await SamaXalisService.register(data);
    console.log('[Auth] Inscrit :', user);
    alert(`Compte créé avec succès ! Bienvenue ${user.fullname} 🎉`);
    showPage('home');
  } catch (err) {
    showError('register-error', err.message);
  } finally {
    setLoading('btn-register', false, 'Créer mon compte');
  }
}

/* ─── DÉCONNEXION ────────────────────────────────────────────── */

function handleLogout() {
  SamaXalisService.logout();
  showPage('home');
}

/* ─── INIT ───────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});