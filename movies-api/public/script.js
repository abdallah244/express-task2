// Navbar effect
const navbar = document.getElementById("navbar");
const onScroll = () => {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll);
onScroll();

// Reveal on scroll (boxes + side slides)
const observed = document.querySelectorAll(".box, .scroll-left, .scroll-right");
const reveal = () => {
  const trigger = window.innerHeight * 0.85;
  observed.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      setTimeout(() => el.classList.add("visible"), i * 120); // delay لكل عنصر
    }
  });
};

// Debounce scroll events
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(reveal, 50);
});
window.addEventListener("load", reveal);

// Parallax background with mouse
const parallax = document.querySelector(".parallax-bg");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  parallax.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});

// Copy buttons with feedback
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;
  const text = btn.getAttribute("data-copy");

  navigator.clipboard.writeText(text).then(() => {
    const old = btn.textContent;
    btn.textContent = "✅ Copied!";
    btn.style.background = "rgba(255, 200, 0, 0.3)";
    setTimeout(() => {
      btn.textContent = old;
      btn.style.background = "";
    }, 1400);
  });
});
