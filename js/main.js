(function () {
  function initBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;

    function toggleButton() {
      button.classList.toggle("is-visible", window.scrollY > 500);
    }

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();
  }

  function initFullscreenToggle() {
    const button = document.getElementById("fullscreenToggle");
    if (!button) return;

    function updateButtonLabel() {
      const isFullscreen = !!document.fullscreenElement;
      button.textContent = isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia";
      button.setAttribute(
        "aria-label",
        isFullscreen ? "Sair da tela cheia" : "Ativar tela cheia"
      );
    }

    async function toggleFullscreen() {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (error) {
        alert("Não foi possível ativar a tela cheia automaticamente. Use F11 no navegador.");
      }
    }

    button.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", updateButtonLabel);
    updateButtonLabel();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBackToTop();
    initFullscreenToggle();
  });
})();