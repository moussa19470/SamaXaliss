// src/pages/Register/Register.js
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

const Register = () => `
  <div class="page-register-wrapper">

    <div class="register-form-col">
      <div class="card-logo">SamaXalis</div>
      <div class="card-sub">Rejoignez la plateforme financière étudiante</div>

      <div class="field">
        <label for="fullname">Prénom et Nom</label>
        <input type="text" id="fullname" placeholder="Ex: Moussa Diop" />
      </div>

      <div class="field">
        <label for="email-reg">Email Institutionnel</label>
        <input type="email" id="email-reg" placeholder="nom@ucad.edu.sn ou @ugb.edu.sn" />
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
          <input type="tel" id="phone" placeholder="77 000 00 00" style="flex:1" />
        </div>
      </div>

      <div class="field">
        <label for="pass-reg">Mot de passe</label>
        <div class="pass-wrap">
          <input type="password" id="pass-reg" placeholder="••••••••" />
          <button class="eye-btn" id="toggle-pass-reg" aria-label="Voir le mot de passe">
            ${eyeIcon}
          </button>
        </div>
      </div>

      <button class="btn btn-primary btn-full" id="btn-register" style="margin-bottom:18px">
        Créer mon compte
      </button>

      <p class="login-footer-text">
        Déjà inscrit ? <a href="#" id="link-login">Se connecter</a>
      </p>
    </div>

    <div class="register-img-col">
      <div class="register-img-overlay">
        <div class="quote">
          <h2>Rejoignez la communauté</h2>
          <p>Plus de 50 000 étudiants utilisent déjà SamaXalis pour gérer leurs finances universitaires en toute sécurité.</p>
        </div>
      </div>
    </div>

  </div>
`;

Register.afterRender = () => {
  // Toggle mot de passe
  const toggleBtn = document.getElementById('toggle-pass-reg');
  const passInput = document.getElementById('pass-reg');
  toggleBtn?.addEventListener('click', () => {
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    toggleBtn.style.color = isPass ? 'var(--green-main)' : 'var(--gray-400)';
  });

  // Lien vers Login
  document.getElementById('link-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/login');
  });

  // Bouton inscription (démo)
  document.getElementById('btn-register')?.addEventListener('click', () => {
    const fullname   = document.getElementById('fullname').value.trim();
    const email      = document.getElementById('email-reg').value.trim();
    const universite = document.getElementById('universite').value;
    const phone      = document.getElementById('phone').value.trim();
    const pass       = document.getElementById('pass-reg').value.trim();

    if (!fullname || !email || !universite || !phone || !pass) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    alert(`Compte créé pour ${fullname} ! (démo)`);
    navigate('/login');
  });
};

export default Register;
