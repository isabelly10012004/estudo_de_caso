(function () {
  function getTopOffset() {
    const topbar = document.querySelector(".topbar-shell");
    if (!topbar) return 44;

    const rect = topbar.getBoundingClientRect();
    return rect.height - 18;
  }

  function scrollToTarget(target) {
    const offset = getTopOffset();
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const finalTop = Math.max(targetTop - offset, 0);

    window.scrollTo({
      top: finalTop,
      behavior: "smooth"
    });
  }

  function initSmoothNav() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        scrollToTarget(target);
      });
    });
  }

  function initActiveSectionObserver() {
    const sections = Array.from(document.querySelectorAll("main .section"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const fill = document.getElementById("readingProgressFill");
    const body = document.body;

    if (!sections.length) return;

    const sectionMap = {
      hero: "hero",
      sobre: "sobre",
      estrategia: "estrategia",
      resposta: "resposta",
      prioridades: "prioridades",
      organizacao: "organizacao",
      ia: "ia",
      conclusao: "conclusao"
    };

    const mapNavById = (id) =>
      navLinks.find((link) => link.getAttribute("href") === `#${id}`);

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry = null;

        entries.forEach((entry) => {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        });

        if (bestEntry && bestEntry.isIntersecting) {
          const id = bestEntry.target.id;

          navLinks.forEach((link) => link.classList.remove("is-active"));
          const activeLink = mapNavById(id);
          if (activeLink) activeLink.classList.add("is-active");

          body.setAttribute("data-section", sectionMap[id] || "hero");
        }
      },
      {
        threshold: [0.3, 0.5, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (fill) fill.style.width = `${Math.min(progress, 100)}%`;
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSmoothNav();
    initActiveSectionObserver();
  });
})();