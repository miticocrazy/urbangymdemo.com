const revealItems = document.querySelectorAll("[data-reveal]");
const counterItems = document.querySelectorAll("[data-count]");
const filterButtons = document.querySelectorAll(".filter-chip");
const classCards = document.querySelectorAll(".class-card");
const proposalForm = document.querySelector("#proposal-form");
const formNote = document.querySelector("#form-note");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterNote = document.querySelector("#newsletter-note");
const currentYear = document.querySelector("#current-year");
const cursorGlow = document.querySelector(".cursor-glow");
const promoCopy = document.querySelector("#promo-copy");
const promoStrip = document.querySelector(".promo-strip");
const floatingToast = document.querySelector("#floating-toast");
const toastClose = document.querySelector("#toast-close");
const toastTag = document.querySelector("#toast-tag");
const toastTitle = document.querySelector("#toast-title");
const toastText = document.querySelector("#toast-text");
const toastLink = document.querySelector("#toast-link");

let cursorTargetX = window.innerWidth / 2;
let cursorTargetY = window.innerHeight / 2;
let cursorCurrentX = cursorTargetX;
let cursorCurrentY = cursorTargetY;
let cursorFrame = 0;
let promoIndex = 0;
let promoRotationPaused = false;
let toastVisible = true;
let toastDismissed = false;

const promoMessages = [
  {
    banner: "Semana Urban Fuel: whey + crema + cierre rápido por WhatsApp para empujar compra inmediata.",
    tag: "Oferta activa",
    title: "Pack Urban Fuel disponible",
    text: "Whey, crema y producto especial listos para cerrar venta por WhatsApp.",
    href: "https://wa.me/34674913842?text=Hola%20Urban%20Gym,%20quiero%20informaci%C3%B3n%20del%20Pack%20Urban%20Fuel",
    cta: "Reservar pack",
  },
  {
    banner: "Reposición activa: Applied Nutrition vuelve a estar visible y lista para convertir visitas en pedidos.",
    tag: "Reposición",
    title: "Applied Nutrition ha vuelto",
    text: "Un producto reconocible que sirve para lanzar alerta y activar compras por urgencia.",
    href: "https://wa.me/34674913842?text=Hola%20Urban%20Gym,%20quiero%20informaci%C3%B3n%20sobre%20Applied%20Nutrition",
    cta: "Consultar stock",
  },
  {
    banner: "Top seller del momento: LifePro y Zoomad para campañas rápidas, packs y novedades con personalidad.",
    tag: "Top seller",
    title: "LifePro y Zoomad empujan la venta",
    text: "Perfectos para promociones semanales, cross-sell y sensación de novedad constante.",
    href: "https://wa.me/34674913842?text=Hola%20Urban%20Gym,%20quiero%20ver%20las%20ofertas%20de%20suplementaci%C3%B3n",
    cta: "Ver ofertas",
  },
];

const animateCursorGlow = () => {
  cursorCurrentX += (cursorTargetX - cursorCurrentX) * 0.14;
  cursorCurrentY += (cursorTargetY - cursorCurrentY) * 0.14;

  if (cursorGlow) {
    cursorGlow.style.transform = `translate3d(${cursorCurrentX - 224}px, ${cursorCurrentY - 224}px, 0)`;
  }

  cursorFrame = window.requestAnimationFrame(animateCursorGlow);
};

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  cursorFrame = window.requestAnimationFrame(animateCursorGlow);

  window.addEventListener("pointermove", (event) => {
    cursorTargetX = event.clientX;
    cursorTargetY = event.clientY;
    cursorGlow.style.opacity = "1";
  });

  window.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });

  window.addEventListener("blur", () => {
    cursorGlow.style.opacity = "0";
  });
} else if (cursorGlow) {
  cursorGlow.remove();
}

const renderPromoMessage = (message) => {
  if (promoCopy) {
    promoCopy.textContent = message.banner;
  }

  if (toastTag) {
    toastTag.textContent = message.tag;
  }

  if (toastTitle) {
    toastTitle.textContent = message.title;
  }

  if (toastText) {
    toastText.textContent = message.text;
  }

  if (toastLink) {
    toastLink.textContent = message.cta;
    toastLink.href = message.href;
  }
};

renderPromoMessage(promoMessages[promoIndex]);

const pausePromoRotation = () => {
  promoRotationPaused = true;
};

const resumePromoRotation = () => {
  promoRotationPaused = false;
};

if (promoStrip) {
  promoStrip.addEventListener("pointerenter", pausePromoRotation);
  promoStrip.addEventListener("pointerleave", resumePromoRotation);
}

if (floatingToast) {
  floatingToast.addEventListener("pointerenter", pausePromoRotation);
  floatingToast.addEventListener("pointerleave", resumePromoRotation);
}

if (toastClose && floatingToast) {
  toastClose.addEventListener("click", () => {
    toastDismissed = true;
    toastVisible = false;
    floatingToast.classList.add("is-hidden");
    floatingToast.setAttribute("aria-hidden", "true");
  });
}

if (floatingToast) {
  window.setInterval(() => {
    if (toastDismissed || promoRotationPaused || document.hidden) {
      return;
    }

    if (toastVisible) {
      floatingToast.classList.add("is-hidden");
      toastVisible = false;
      return;
    }

    floatingToast.classList.add("is-updating");

    window.setTimeout(() => {
      promoIndex = (promoIndex + 1) % promoMessages.length;
      renderPromoMessage(promoMessages[promoIndex]);
      floatingToast.classList.remove("is-hidden");
      floatingToast.classList.remove("is-updating");
      toastVisible = true;
    }, 220);
  }, 30000);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateCounters = () => {
  counterItems.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    let current = 0;
    const duration = 1100;
    const stepTime = Math.max(18, Math.floor(duration / Math.max(target, 1)));

    const tick = () => {
      current += Math.max(1, Math.ceil(target / 24));

      if (current >= target) {
        counter.textContent = `${target}${target === 100 ? "%" : ""}`;
        return;
      }

      counter.textContent = `${current}${target === 100 ? "%" : ""}`;
      window.setTimeout(tick, stepTime);
    };

    tick();
  });
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.35 }
);

if (counterItems[0]) {
  counterObserver.observe(counterItems[0]);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((chip) => chip.classList.remove("is-active"));
    button.classList.add("is-active");

    classCards.forEach((card) => {
      const category = card.dataset.category;
      const isVisible = selected === "all" || category === selected;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

if (proposalForm && formNote) {
  proposalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(proposalForm);
    const name = (formData.get("name") || "").toString().trim();

    formNote.textContent = `Gracias${name ? `, ${name}` : ""}. Hemos recibido tu mensaje. Si lo prefieres, también puedes escribirnos por WhatsApp y te responderemos más rápido.`;
    formNote.classList.add("is-success");
    proposalForm.reset();
  });
}

if (newsletterForm && newsletterNote) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = (formData.get("email") || "").toString().trim();

    newsletterNote.textContent = `Perfecto${email ? `. ${email}` : ""} ya queda listo para recibir avisos de ofertas, reposiciones y novedades de Urban Gym.`;
    newsletterNote.classList.add("is-success");
    newsletterForm.reset();
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
