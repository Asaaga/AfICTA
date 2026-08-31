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
    const videoId = card.getAttribute("data-video-id");
    const titleEl = card.querySelector(".video-title");
    const authorEl = card.querySelector(".video-author");

    if (videoId) {
      // Fetch metadata dynamically via YouTube oEmbed API
      const oEmbedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;

      fetch(oEmbedUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.title && titleEl) {
            titleEl.textContent = data.title;
          }
          if (data.author_name && authorEl) {
            authorEl.textContent = `By ${data.author_name}`;
          }
        })
        .catch((err) => {
          console.error("Error fetching YouTube info:", err);
        });
    }

    // Click listener to switch video in the main player
    card.addEventListener("click", function () {
      if (videoId && mainPlayer) {
        mainPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        videoCards.forEach((c) => c.classList.remove("active-video"));
        this.classList.add("active-video");
      }
    });
  });
});
