// src/pages/NotFound/NotFound.js
import { navigate } from '../../router.js';

const NotFound = () => `
  <div style="
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
    gap: 16px;
  ">
    <div style="font-size: 72px; font-weight: 800; color: var(--green-light);">404</div>
    <h1 style="font-size: 24px; color: var(--gray-900);">Page introuvable</h1>
    <p style="color: var(--gray-400); font-size: 15px;">La route demandée n'existe pas.</p>
    <button class="btn btn-primary" id="btn-home" style="margin-top: 8px;">
      Retour à l'accueil
    </button>
  </div>
`;

NotFound.afterRender = () => {
  document.getElementById('btn-home')?.addEventListener('click', () => navigate('/'));
};

export default NotFound;
