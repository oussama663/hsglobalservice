const body = document.body;
    const menuButton = document.querySelector(".menu-button");
    const closeButton = document.querySelector(".menu-close");
    const overlay = document.querySelector(".menu-overlay");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav a, .mobile-menu-contact a");

    function setMenu(open) {
      body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      mobileMenu.setAttribute("aria-hidden", String(!open));
      if (open) closeButton.focus();
    }

    menuButton.addEventListener("click", () => setMenu(true));
    closeButton.addEventListener("click", () => {
      setMenu(false);
      menuButton.focus();
    });
    overlay.addEventListener("click", () => setMenu(false));
    mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && body.classList.contains("menu-open")) {
        setMenu(false);
        menuButton.focus();
      }
    });

    const quoteForm = document.querySelector("#quote-form");
    const feedback = document.querySelector(".form-feedback");

    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;

      const data = new FormData(quoteForm);
      const text = [
        "Bonjour HS Global Plomberie,",
        "",
        "Je souhaite demander un devis.",
        `Nom : ${data.get("name")}`,
        `Téléphone : ${data.get("phone")}`,
        `Service : ${data.get("service")}`,
        `Besoin : ${data.get("message")}`
      ].join("\n");

      feedback.textContent = "Votre demande est prête. WhatsApp va s'ouvrir dans un nouvel onglet.";
      feedback.style.display = "block";
      window.open(`https://wa.me/212661791102?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });

    const rotatingText = document.querySelector(".rotating-text");
    const rotatingTrades = [
      "toutes vos installations.",
      "la plomberie.",
      "l'électricité.",
      "la climatisation.",
      "le chauffage.",
      "la piscine."
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tradeIndex = 0;

    if (rotatingText && !reducedMotion) {
      window.setInterval(() => {
        rotatingText.classList.add("is-changing");
        window.setTimeout(() => {
          tradeIndex = (tradeIndex + 1) % rotatingTrades.length;
          rotatingText.textContent = rotatingTrades[tradeIndex];
          rotatingText.classList.remove("is-changing");
        }, 280);
      }, 2400);
    }

    document.querySelector("#current-year").textContent = new Date().getFullYear();

