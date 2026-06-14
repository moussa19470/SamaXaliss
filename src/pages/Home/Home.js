// src/pages/Home/Home.js
import { navigate } from '../../router.js';

const Home = () => `
  <div class="page-home-wrapper">

    <section class="hero">
      <div class="hero-badge">Déjà 5 000+ étudiants inscrits</div>
      <h1>L'entraide financière entre <em>étudiants</em> au Sénégal.</h1>
      <p>Une plateforme solidaire pour s'entraider en FCFA entre étudiants de l'UCAD, UGB, et autres universités avant la tombée de la bourse. Sans frais, sans intérêt.</p>
      <div class="hero-actions">
        <button class="btn btn-primary" id="btn-register">Créer mon compte</button>
        <button class="btn btn-outline" id="btn-how">Comment ça marche ?</button>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <div class="feature-icon">%</div>
        <div>
          <h3>0% Intérêt</h3>
          <p>Une entraide purement solidaire entre camarades étudiants.</p>
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🛡</div>
        <div>
          <h3>Sécurisé par l'UCAD</h3>
          <p>Vérification via certificat de scolarité et carte d'étudiant.</p>
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">↻</div>
        <div>
          <h3>Remboursement flexible</h3>
          <p>Échelonnez vos paiements selon votre calendrier de bourse.</p>
        </div>
      </div>
    </section>

    <footer>
      <p>© 2024 SamaXalis. Un projet solidaire.</p>
      <div class="footer-links">
        <a href="#">Conditions d'utilisation</a>
        <a href="#">Confidentialité</a>
        <a href="#">Contact</a>
      </div>
    </footer>

  </div>
`;

Home.afterRender = () => {
  document.getElementById('btn-register')?.addEventListener('click', () => navigate('/register'));
  document.getElementById('btn-how')?.addEventListener('click', () => {
    alert('Fonctionnalité à venir !');
  });
};

export default Home;
