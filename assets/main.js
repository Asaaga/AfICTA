// Back to top button
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// Activate nested dropdown submenus on hover (desktop)
document.querySelectorAll(".dropdown-submenu").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    const sub = el.querySelector(".dropdown-menu");
    if (sub && window.innerWidth >= 992) sub.style.display = "block";
  });
  el.addEventListener("mouseleave", () => {
    const sub = el.querySelector(".dropdown-menu");
    if (sub) sub.style.display = "";
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const hash = this.getAttribute("href").split("#")[1];
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target && this.pathname === window.location.pathname) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mainPlayer = document.getElementById("mainVideoPlayer");
  const videoCards = document.querySelectorAll(".video-card-item");

  videoCards.forEach((card) => {
    card.addEventListener("click", function () {
      const videoId = this.getAttribute("data-video-id");
      if (videoId && mainPlayer) {
        // Update main player embed URL and trigger autoplay on selection
        mainPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        // Update active card styling border
        videoCards.forEach((c) => c.classList.remove("active-video"));
        this.classList.add("active-video");
      }
    });
  });
});
