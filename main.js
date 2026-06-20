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
