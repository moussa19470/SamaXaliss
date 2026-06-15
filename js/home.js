/* ═══════════════════════════════════════════════════════════════
   home.js — HTML de la page d'accueil SamaXalis
   ═══════════════════════════════════════════════════════════════ */

function renderHome() {
  return `
    <div id="page-home">

      <section class="hero">
        <div class="hero-badge">Déjà 5 000+ étudiants inscrits</div>
        <h1>L'entraide financière entre <em>étudiants</em> au Sénégal.</h1>
        <p>
          Une plateforme solidaire pour s'entraider en FCFA entre étudiants de l'UCAD,
          UGB, et autres universités avant la tombée de la bourse. Sans frais, sans intérêt.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="showPage('register')">Créer mon compte</button>
          <button class="btn btn-outline">Comment ça marche ?</button>
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
}