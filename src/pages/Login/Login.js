// src/pages/Login/Login.js
import { navigate } from '../../router.js';

const eyeIcon = `
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
         9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
`;

const Login = () => `
  <div class="page-login-wrapper">
    <div class="login-bg"></div>

    <div class="login-card">
      <div class="card-logo">SAMAXALIS</div>
      <div class="card-sub">Accédez à votre espace étudiant</div>

      <div class="field">
        <label for="email-login">Email institutionnel</label>
        <input type="email" id="email-login" placeholder="moussa.diop@ucad.edu.sn" />
      </div>

      <div class="field">
        <label for="pass-login">
          Mot de passe
          <a href="#" class="forgot">Oublié ?</a>
        </label>
        <div class="pass-wrap">
          <input type="password" id="pass-login" placeholder="••••••••" />
          <button class="eye-btn" id="toggle-pass-login" aria-label="Voir le mot de passe">
            ${eyeIcon}
          </button>
        </div>
      </div>

      <div class="checkbox-row">
        <input type="checkbox" id="remember" />
        <label for="remember">Se souvenir de moi</label>
      </div>

      <button class="btn btn-primary btn-full" id="btn-login" style="margin-bottom:18px">
        Se connecter
      </button>

      <div class="login-divider">ou</div>

      <p class="login-footer-text">
        Pas de compte ? <a href="#" id="link-register">S'inscrire</a>
      </p>
    </div>
  </div>
`;

Login.afterRender = () => {
  // Toggle mot de passe
  const toggleBtn = document.getElementById('toggle-pass-login');
  const passInput = document.getElementById('pass-login');
  toggleBtn?.addEventListener('click', () => {
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    toggleBtn.style.color = isPass ? 'var(--green-main)' : 'var(--gray-400)';
  });

  // Lien vers Register
  document.getElementById('link-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/register');
  });

  // Bouton connexion (démo)
  document.getElementById('btn-login')?.addEventListener('click', () => {
    const email = document.getElementById('email-login').value.trim();
    const pass  = document.getElementById('pass-login').value.trim();
    if (!email || !pass) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    alert(`Connexion en cours pour ${email} (démo)`);
  });
};

export default Login;
