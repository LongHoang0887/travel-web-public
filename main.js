// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close the menu after tapping a link (mobile)
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Mouse-driven 3D tilt on the hero phone mockup
const stage = document.querySelector(".hero-visual");
const phone = document.querySelector(".phone");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (stage && phone && !reduceMotion && finePointer) {
  const MAX = 12; // degrees of tilt
  let frame = null;

  stage.addEventListener("pointermove", (e) => {
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;  // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      phone.style.setProperty("--ry", `${px * MAX * 2 - 14}deg`);
      phone.style.setProperty("--rx", `${-py * MAX + 6}deg`);
    });
  });

  stage.addEventListener("pointerleave", () => {
    phone.style.removeProperty("--rx");
    phone.style.removeProperty("--ry");
  });
}

// Contact form → open the visitor's email app with a prefilled message
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
    const val = (id) => document.getElementById(id).value.trim();
    const name = val("cf-name");
    const subject = `Odyssey enquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${val("cf-email")}\n\n${val("cf-message")}`;
    window.location.href =
      `mailto:bookings@odysseytrip.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Hero phone image slider
const track = document.querySelector(".phone-track");
const dotsWrap = document.querySelector(".phone-dots");
const visual = document.querySelector(".hero-visual");

if (track && dotsWrap) {
  const slides = Array.from(track.children);
  const noAuto = reduceMotion;
  let i = 0;
  let timer = null;

  const dots = slides.map((_, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "phone-dot" + (n === 0 ? " is-active" : "");
    b.setAttribute("aria-label", `Show screen ${n + 1} of ${slides.length}`);
    b.addEventListener("click", () => { go(n); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(${-i * 100}%)`;
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
  }
  function start() {
    if (timer || noAuto || slides.length < 2) return;
    timer = setInterval(() => go(i + 1), 3600);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  if (visual) {
    visual.addEventListener("pointerenter", stop);
    visual.addEventListener("pointerleave", start);
    // Keyboard users: pause while a dot is focused
    visual.addEventListener("focusin", stop);
    visual.addEventListener("focusout", start);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });

  // Pause when the hero scrolls out of view
  if (visual && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start(); else stop();
    }).observe(visual);
  }

  start();
}
