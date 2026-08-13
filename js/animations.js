(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function applyStagger() {
    document.querySelectorAll(".stagger").forEach((item) => {
      item.style.setProperty("--stagger", item.dataset.stagger || "0");
    });
  }

  function revealOnScroll() {
    const targets = document.querySelectorAll(
      ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -6% 0px"
      }
    );

    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyStagger();
    revealOnScroll();
  });
})();