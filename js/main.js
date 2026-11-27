
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
