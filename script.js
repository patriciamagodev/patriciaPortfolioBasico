// ========== ANIMACIÓN AL HACER SCROLL ==========
const secciones = document.querySelectorAll("section");

const mostrarSeccion = () => {
  const triggerBottom = window.innerHeight * 0.85;
  secciones.forEach((seccion) => {
    const seccionTop = seccion.getBoundingClientRect().top;
    if (seccionTop < triggerBottom) {
      seccion.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", mostrarSeccion);
window.addEventListener("load", mostrarSeccion);

// ========== MENÚ HAMBURGUESA ==========
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// ========== FORMULARIO DE CONTACTO (Web3Forms) ==========
const form = document.querySelector("#contact-form");
const message = document.querySelector(".form-message");
const loader = document.querySelector("#btn-loader");

if (form && message && loader) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    loader.style.display = "inline-block";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      const data = await res.json();

      if (data.success) {
        message.textContent = "¡Mensaje enviado con éxito!";
        message.classList.add("visible");
        form.reset();
      } else {
        message.textContent = "Hubo un error. Intenta nuevamente.";
        message.classList.add("visible");
      }
    } catch (error) {
      message.textContent = "Error de conexión. Intenta más tarde.";
      message.classList.add("visible");
    } finally {
      loader.style.display = "none";
      setTimeout(() => message.classList.remove("visible"), 5000);
    }
  });
}
