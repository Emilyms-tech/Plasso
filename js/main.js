
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MENU DE NAVEGAÇÃO
  // ==========================================

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');

  function setMenu(open) {
    if (!menuToggle || !navigation) return;

    navigation.classList.toggle('is-open', open);

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Fechar' : 'Menu';
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = navigation.classList.contains('is-open');
    setMenu(!isOpen);
  });

  navigation?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenu(false);
    }
  });


  // ==========================================
  // 2. ANO AUTOMÁTICO NO RODAPÉ
  // ==========================================

  const yearElements = document.querySelectorAll('[data-year]');

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  // ==========================================
  // 3. MODO CLARO E ESCURO
  // ==========================================

  const themeButton = document.querySelector('#theme-toggle');

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);

    if (!themeButton) return;

    const icon = themeButton.querySelector('.theme-toggle-icon');
    const label = themeButton.querySelector('.theme-toggle-label');

    const isDark = theme === 'dark';

    if (icon) {
      icon.textContent = isDark ? '☀' : '☾';
    }

    if (label) {
      label.textContent = isDark ? 'Claro' : 'Escuro';
    }

    themeButton.setAttribute(
      'aria-label',
      isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
    );
  }

  let savedTheme = 'light';

  try {
    savedTheme = localStorage.getItem('plasso-theme') || 'light';
  } catch (error) {
    savedTheme = 'light';
  }

  applyTheme(savedTheme);

  themeButton?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');

    const newTheme =
      currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);

    try {
      localStorage.setItem('plasso-theme', newTheme);
    } catch (error) {
      // A alternância continua funcionando sem armazenamento.
    }
  });


  // ==========================================
  // 4. CARROSSEL DE PRODUTOS
  // ==========================================

  document.querySelectorAll('[data-carousel]').forEach(carousel => {

    const slides = Array.from(
      carousel.querySelectorAll('[data-slide]')
    );

    const dots = Array.from(
      carousel.querySelectorAll('[data-carousel-dot]')
    );

    const previousButton = carousel.querySelector(
      '[data-carousel-prev]'
    );

    const nextButton = carousel.querySelector(
      '[data-carousel-next]'
    );

    const counter = carousel.querySelector(
      '[data-carousel-count]'
    );

    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        const active = i === currentSlide;

        slide.hidden = !active;
        slide.classList.toggle('is-active', active);
      });

      dots.forEach((dot, i) => {
        const active = i === currentSlide;

        dot.classList.toggle('is-active', active);

        if (active) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });

      if (counter) {
        counter.textContent =
          `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      }
    }

    previousButton?.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });

    nextButton?.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });

    // Navegação por teclado
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
      }

      if (event.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
      }
    });

    // Navegação por gesto no celular
    let touchStartX = 0;

    carousel.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', event => {
      const touchEndX = event.changedTouches[0].screenX;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 50) {
        showSlide(
          difference > 0
            ? currentSlide + 1
            : currentSlide - 1
        );
      }
    }, { passive: true });

    showSlide(0);
  });


  // ==========================================
  // 5. FILTROS DA GALERIA DE PROJETOS
  // ==========================================

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectItems = document.querySelectorAll('[data-cat]');

  if (filterButtons.length && projectItems.length) {

    filterButtons.forEach(button => {

      button.addEventListener('click', () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {
          const active = item === button;

          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });

        projectItems.forEach(project => {

          const categories = project.dataset.cat
            .split(' ')
            .filter(Boolean);

          const visible =
            selectedFilter === 'todos' ||
            categories.includes(selectedFilter);

          project.hidden = !visible;

        });

      });

    });

  }


  // ==========================================
  // 6. FORMULÁRIO DE ENCOMENDA
  // ==========================================

  const orderForm = document.querySelector('#order-form');

  if (orderForm) {

    orderForm.addEventListener('submit', event => {

      event.preventDefault();

      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      const confirmation = document.querySelector('#confirmation');

      if (confirmation) {
        orderForm.hidden = true;
        confirmation.hidden = false;

        confirmation.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

    });

  }

});
