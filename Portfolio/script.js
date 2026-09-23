const navbar = document.getElementById("navbar");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const year = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 25);
    let currentSection = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) currentSection = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
}, { passive: true });

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: .12 });

revealElements.forEach(element => observer.observe(element));

window.addEventListener("mousemove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
}, { passive: true });