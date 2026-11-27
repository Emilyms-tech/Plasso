
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#order-form");
  const confirmation = document.querySelector("#confirmation");

  if (!form) return;

  const requiredFields = [
    "nome",
    "email",
    "contato",
    "produto",
    "ideia"
  ];

  function showError(field, message) {
    const error = document.querySelector(`#${field.id}-erro`);

    if (error) error.textContent = message;

    field.setAttribute("aria-invalid", String(Boolean(message)));
  }

  function validateField(field) {
    const value = field.value.trim();

    if (field.required && !value) {
      showError(field, "Este campo é obrigatório.");
      return false;
    }

    if (field.type === "email" && value) {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!validEmail) {
        showError(field, "Digite um e-mail válido.");
        return false;
      }
    }

    showError(field, "");
    return true;
  }

  requiredFields.forEach((id) => {
    const field = document.getElementById(id);

    if (!field) return;

    field.addEventListener("blur", () => validateField(field));

    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });

    field.addEventListener("change", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    let firstInvalid = null;

    requiredFields.forEach((id) => {
      const field = document.getElementById(id);

      if (!field) return;

      if (!validateField(field)) {
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!valid) {
      firstInvalid?.focus();
      return;
    }

    form.hidden = true;

    if (confirmation) {
      confirmation.hidden = false;
      confirmation.focus();
    }
  });
});
