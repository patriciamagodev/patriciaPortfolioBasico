document.addEventListener('DOMContentLoaded', function() {
    
// --- MENÚ HAMBURGUESA ---
// Selecciona los elementos del DOM para el menú de navegación móvil.
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Agrega un evento de clic al ícono de hamburguesa.
hamburger.addEventListener('click', () => {
    // Alterna la clase 'active' para mostrar/ocultar el menú y animar el ícono.
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// --- CERRAR MENÚ AL HACER CLIC EN UN ENLACE ---
// Selecciona todos los enlaces dentro del menú de navegación.
document.querySelectorAll('.nav-links a').forEach(link => {
    // Agrega un evento de clic a cada enlace.
    link.addEventListener('click', () => {
        // Cierra el menú al quitar la clase 'active'.
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


// --- OCULTAR NAVBAR AL HACER SCROLL HACIA ABAJO ---
let lastScrollTop = 0;
const navbar = document.querySelector('.main-header');
// Agrega un evento de scroll a la ventana.
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Si el scroll es hacia abajo y ha pasado un cierto umbral...
            if (scrollTop > 100) { 
               // ...oculta la barra de navegación moviéndola hacia arriba.
               navbar.style.top = '-80px';
            }
        } else {
            // Si el scroll es hacia arriba, muestra la barra de navegación.
            navbar.style.top = '0';
        }
        // Actualiza la última posición de scroll.
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);


// --- ANIMACIÓN DE SCROLL PARA SECCIONES ---
// Selecciona todas las secciones de la página.
const sections = document.querySelectorAll('section');
// Opciones para el IntersectionObserver.
const observerOptions = {
    root: null, // El viewport es el área de observación.
    rootMargin: '0px',
    threshold: 0.1 // La animación se dispara cuando el 10% de la sección es visible.
};

// Crea un nuevo IntersectionObserver.
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si la sección está entrando en el viewport...
        if (entry.isIntersecting) {
            // ...agrega la clase 'visible' para activar la animación CSS.
            entry.target.classList.add('visible');
            // Deja de observar la sección una vez que ha sido animada.
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Itera sobre cada sección y le asigna el observador.
sections.forEach(section => {
    observer.observe(section);
});


// --- FORMULARIO DE CONTACTO ---
// Selecciona el formulario y el elemento para mostrar mensajes.
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

// Agrega un evento 'submit' al formulario.
contactForm.addEventListener('submit', function(e) {
    // Previene el comportamiento por defecto del formulario (recargar la página).
    e.preventDefault();
        
    // Simulación de envío de formulario.
    // En un proyecto real, aquí iría una llamada a un backend (p. ej. con fetch).
    const formData = new FormData(contactForm);
    const name = formData.get('name');
        
    // Muestra un mensaje de confirmación.
    formMessage.textContent = `¡Gracias por tu mensaje, ${name}! Te responderé pronto.`;
    formMessage.classList.add('visible');
        
// Limpia el formulario.
    contactForm.reset();
        
// Oculta el mensaje de confirmación después de 5 segundos.
    setTimeout(() => {
        formMessage.classList.remove('visible');
    }, 5000);
});

});
