
document.addEventListener("DOMContentLoaded", () => {
  // Ano automático no rodapé
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navigation");

  if (toggle && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Fechar" : "Menu";
    };

    toggle.addEventListener("click", () => {
      setMenu(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
  }

  // Filtros da galeria de projetos
  const filters = document.querySelectorAll("[data-filter]");
  const works = document.querySelectorAll("[data-cat]");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filters.forEach((item) => {
        item.setAttribute(
          "aria-pressed",
          String(item === button)
        );
      });

      works.forEach((work) => {
        const matches =
          category === "todos" ||
          work.dataset.cat === category;

        work.hidden = !matches;
      });
    });
  });
});
// ===== CARROSSEL DE PRODUTOS =====
const productTrack = document.querySelector('#product-track');
const productSlides = document.querySelectorAll('.carousel-slide');
const productDots = document.querySelectorAll('.carousel-dot');
const productPrev = document.querySelector('#product-prev');
const productNext = document.querySelector('#product-next');

if (productTrack && productSlides.length) {
  let currentProduct = 0;

  function showProduct(index) {
    currentProduct = (index + productSlides.length) % productSlides.length;

    productTrack.style.transform =
      `translateX(-${currentProduct * 100}%)`;

    productDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentProduct);
      dot.setAttribute('aria-current', i === currentProduct ? 'true' : 'false');
    });
  }

  productNext?.addEventListener('click', () => {
    showProduct(currentProduct + 1);
  });

  productPrev?.addEventListener('click', () => {
    showProduct(currentProduct - 1);
  });

  productDots.forEach((dot, i) => {
    dot.addEventListener('click', () => showProduct(i));
  });

  showProduct(0);
}
// ===== MODO CLARO / ESCURO =====
const themeToggle = document.querySelector('#theme-toggle');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);

  if (!themeToggle) return;

  const isDark = theme === 'dark';
  const icon = themeToggle.querySelector('.theme-icon');
  const label = themeToggle.querySelector('.theme-label');

  if (icon) icon.textContent = isDark ? '☀' : '☾';
  if (label) label.textContent = isDark ? 'Claro' : 'Escuro';

  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
  );
}

const savedTheme = localStorage.getItem('plasso-theme') || 'light';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  applyTheme(nextTheme);
  localStorage.setItem('plasso-theme', nextTheme);
});
