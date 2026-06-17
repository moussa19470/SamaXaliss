// src/pages/Home/Home.js
import { navigate }                          from '../../router.js';
import { getApp, getFeatures, getFooterLinks } from '../../data/db.js';

const Home = async () => {
  const [app, features, footerLinks] = await Promise.all([
    getApp(), getFeatures(), getFooterLinks()
  ]);

  const featuresHTML = features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icone}</div>
      <div>
        <h3>${f.titre}</h3>
        <p>${f.description}</p>
      </div>
    </div>
  `).join('');

  const footerLinksHTML = footerLinks.map(l => `
    <a href="${l.href}">${l.label}</a>
  `).join('');

  return `
    <div class="page-home-wrapper">

      <section class="hero">
        <div class="hero-badge">Déjà ${app.stats.etudiantsInscrits.toLocaleString('fr-FR')}+ étudiants inscrits</div>
        <h1>L'entraide financière entre <em>étudiants</em> au Sénégal.</h1>
        <p>Une plateforme solidaire pour s'entraider en FCFA entre étudiants de l'UCAD, UGB, et autres universités avant la tombée de la bourse. Sans frais, sans intérêt.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" id="btn-register">Créer mon compte</button>
          <button class="btn btn-outline" id="btn-how">Comment ça marche ?</button>
        </div>
      </section>

      <section class="features">
        ${featuresHTML}
      </section>

      <footer>
        <p>© ${app.annee} ${app.nom}. Un projet solidaire.</p>
        <div class="footer-links">
          ${footerLinksHTML}
        </div>
      </footer>

    </div>
  `;
};

Home.afterRender = () => {
  document.getElementById('btn-register')?.addEventListener('click', () => navigate('/register'));
  document.getElementById('btn-how')?.addEventListener('click', () => {
    alert('Fonctionnalité à venir !');
  });
};

export default Home;
