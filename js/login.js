/* ═══════════════════════════════════════════════════════════════
   login.js — HTML de la page de connexion SamaXalis
   ═══════════════════════════════════════════════════════════════ */

function renderLogin() {
  return `
    <div id="page-login">
      <div class="login-bg"></div>

      <div class="login-card">
        <div class="card-logo">SAMAXALIS</div>
        <div class="card-sub">Accédez à votre espace étudiant</div>

        <div id="login-error" class="error-msg hidden"></div>

        <form id="form-login" novalidate>

          <div class="field">
            <label for="email-login">Email institutionnel</label>
            <input
              type="email"
              id="email-login"
              placeholder="moussa.diop@ucad.edu.sn"
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label for="pass-login">
              Mot de passe
              <a href="#" class="forgot">Oublié ?</a>
            </label>
            <div class="pass-wrap">
              <input
                type="password"
                id="pass-login"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="eye-btn"
                onclick="togglePass('pass-login', this)"
                aria-label="Afficher/masquer le mot de passe"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
                       9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="checkbox-row">
            <input type="checkbox" id="remember" />
            <label for="remember">Se souvenir de moi</label>
          </div>

          <button
            type="submit"
            id="btn-login"
            class="btn btn-primary btn-full"
            data-label="Se connecter"
          >
            Se connecter
          </button>

        </form>

        <div class="login-divider">ou</div>

        <p class="card-footer-text">
          Pas de compte ?
          <a href="#" onclick="showPage('register')">S'inscrire</a>
        </p>
      </div>
    </div>
  `;
}

/* Binding du formulaire — appelé après injection du HTML dans le DOM */
function bindLoginEvents() {
  const form = document.getElementById('form-login');
  if (form) form.addEventListener('submit', handleLogin);
}