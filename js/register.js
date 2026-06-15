/* ═══════════════════════════════════════════════════════════════
   register.js — HTML de la page d'inscription SamaXalis
   ═══════════════════════════════════════════════════════════════ */

function renderRegister() {
  return `
    <div id="page-register">

      <div class="register-form-col">
        <div class="card-logo">SamaXalis</div>
        <div class="card-sub">Rejoignez la plateforme financière étudiante</div>

        <div id="register-error" class="error-msg hidden"></div>

        <form id="form-register" novalidate>

          <div class="field">
            <label for="fullname">Prénom et Nom</label>
            <input
              type="text"
              id="fullname"
              placeholder="Ex: Moussa Diop"
              autocomplete="name"
            />
          </div>

          <div class="field">
            <label for="email-reg">Email Institutionnel</label>
            <input
              type="email"
              id="email-reg"
              placeholder="nom@ucad.edu.sn ou @ugb.edu.sn"
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label for="universite">Université</label>
            <select id="universite">
              <option value="">Sélectionnez votre établissement</option>
              <option>UCAD — Université Cheikh Anta Diop</option>
              <option>UGB — Université Gaston Berger</option>
              <option>UADB — Université Alioune Diop</option>
              <option>UDA — Université du Sine Saloum</option>
              <option>Autre</option>
            </select>
          </div>

          <div class="field">
            <label for="phone">Numéro Wave / Orange Money</label>
            <div class="phone-row">
              <span class="phone-prefix">+221</span>
              <input
                type="tel"
                id="phone"
                placeholder="77 000 00 00"
              />
            </div>
          </div>

          <div class="field">
            <label for="pass-reg">Mot de passe</label>
            <div class="pass-wrap">
              <input
                type="password"
                id="pass-reg"
                placeholder="Minimum 6 caractères"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="eye-btn"
                onclick="togglePass('pass-reg', this)"
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

          <button
            type="submit"
            id="btn-register"
            class="btn btn-primary btn-full"
            data-label="Créer mon compte"
          >
            Créer mon compte
          </button>

        </form>

        <br />
        <p class="card-footer-text">
          Déjà inscrit ?
          <a href="#" onclick="showPage('login')">Se connecter</a>
        </p>
      </div>

      <div class="register-img-col">
        <div class="register-img-overlay">
          <div class="quote">
            <h2>Rejoignez la communauté</h2>
            <p>
              Plus de 50 000 étudiants utilisent déjà SamaXalis
              pour gérer leurs finances universitaires en toute sécurité.
            </p>
          </div>
        </div>
      </div>

    </div>
  `;
}

/* Binding du formulaire — appelé après injection du HTML dans le DOM */
function bindRegisterEvents() {
  const form = document.getElementById('form-register');
  if (form) form.addEventListener('submit', handleRegister);
}