const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const setMenu = open => {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Fechar' : 'Menu';
};
toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
