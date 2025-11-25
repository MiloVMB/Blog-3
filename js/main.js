// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  enableSmoothScroll();
  handleNewsletterForms();
  handleContactForm();
});

/**
 * Highlight the correct nav link based on the current page URL.
 */
function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Remove any existing active class first
    link.classList.remove("active");

    // If href matches current page, add active class
    if (href === path) {
      link.classList.add("active");
    }

    // Special case: GitHub Pages sometimes serves repo root without filename
    if ((path === "" || path === "Blog-3" || path === "Blog-3/") && href === "index.html") {
      link.classList.add("active");
    }
  });
}

/**
 * Smooth scroll for internal anchor links (e.g. href="#section").
 */
function enableSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

/**
 * Handle newsletter forms (footer) with a fake submit + message.
 */
function handleNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const input = form.querySelector('input[type="email"]');
      const email = input ? input.value.trim() : "";

      if (!email || !isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Fake success message (no real backend)
      alert("Thanks for subscribing! 🎉");
      form.reset();
    });
  });
}

/**
 * Handle the main contact form (on contact.html).
 */
function handleContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return; // Only exists on contact page

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = form.querySelector('input[placeholder="Enter your first name"]');
    const lastName = form.querySelector('input[placeholder="Enter your last name"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector("textarea");

    // Basic validation
    if (!firstName.value.trim() || !lastName.value.trim()) {
      alert("Please enter your first and last name.");
      return;
    }

    if (!email.value.trim() || !isValidEmail(email.value.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!message.value.trim()) {
      alert("Please tell us a bit about your needs.");
      return;
    }

    // Fake send (since there is no backend)
    alert("Thanks for reaching out! ✅\nWe'll get back to you shortly.");
    form.reset();
  });
}

/**
 * Simple email validation helper.
 */
function isValidEmail(email) {
  // Small, friendly regex just to catch obvious mistakes
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

