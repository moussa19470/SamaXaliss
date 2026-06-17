// src/router.js

const routes = {
  '/':         'Home',
  '/login':    'Login',
  '/register': 'Register',
};

const render = async (path) => {
  const app = document.getElementById('app');
  if (!app) return;

  const pageName = routes[path];
  let pageModule;

  try {
    if (!pageName) {
      pageModule = await import('./pages/NotFound/NotFound.js');
    } else {
      pageModule = await import(`./pages/${pageName}/${pageName}.js`);
    }

    const pageComponent = pageModule.default;

    // Support pages sync ET async (qui retournent une Promise<string>)
    const html = await Promise.resolve(pageComponent());
    app.innerHTML = html;

    // Animation d'entrée
    app.firstElementChild?.classList.add('page-enter');

    // Scroll en haut
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mise à jour navbar
    updateNavbar(path);

    // Callbacks post-rendu
    if (pageComponent.afterRender) {
      pageComponent.afterRender();
    }

  } catch (error) {
    console.error(`Erreur de chargement de la page "${pageName}" :`, error);
    app.innerHTML = '<h1 style="padding:100px 40px">Erreur technique</h1>';
  }
};

const updateNavbar = (path) => {
  const navLoginBtn = document.getElementById('nav-login-btn');
  if (!navLoginBtn) return;
  const hideOn = ['/login', '/register'];
  navLoginBtn.classList.toggle('hidden', hideOn.includes(path));
};

export const navigate = (path) => {
  window.location.hash = path;
};

const handleHashChange = async () => {
  const path = window.location.hash.replace('#', '') || '/';
  await render(path);
};

export const initRouter = () => {
  const navLoginBtn = document.getElementById('nav-login-btn');
  navLoginBtn?.addEventListener('click', () => navigate('/login'));

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
};
