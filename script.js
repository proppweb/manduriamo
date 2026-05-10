const hero = document.querySelector(".hero");
const topNav = document.querySelector(".top-nav");

function updateHeroNavBlend() {
  if (!hero || !topNav) return;
  const heroBottomDoc = window.scrollY + hero.getBoundingClientRect().bottom;
  topNav.classList.toggle("top-nav--hero-blend", window.scrollY < heroBottomDoc);
}

updateHeroNavBlend();
window.addEventListener("scroll", updateHeroNavBlend, { passive: true });
window.addEventListener("resize", updateHeroNavBlend, { passive: true });
window.addEventListener("hashchange", updateHeroNavBlend);
window.addEventListener("load", updateHeroNavBlend);

const accordionGroups = document.querySelectorAll(".accordion-grid");

document.querySelectorAll(".team-card img").forEach((img) => img.remove());

accordionGroups.forEach((group) => {
  const singleOpenMode = group.classList.contains("one-column");
  const detailsItems = group.querySelectorAll("details");

  detailsItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!singleOpenMode) return;
      if (!item.open) return;

      detailsItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
});

const allImages = document.querySelectorAll("img");

allImages.forEach((img) => {
  if (img.complete) {
    img.classList.add("is-loaded");
    return;
  }

  img.addEventListener("load", () => {
    img.classList.add("is-loaded");
  });

  img.addEventListener("error", () => {
    img.classList.add("is-loaded");
  });
});

const revealTargets = document.querySelectorAll(
  ".section, .card-accordion, .video-card, .footer"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

revealTargets.forEach((el) => el.classList.add("reveal-on-scroll"));

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

const biographyParagraphs = document.querySelectorAll(".team-card .person p");

biographyParagraphs.forEach((paragraph) => {
  if (paragraph.querySelector(".lead-sentence")) return;
  if (paragraph.querySelector("strong")) return;

  const text = paragraph.textContent.trim();
  const firstPeriod = text.indexOf(".");
  if (firstPeriod < 0) return;

  const firstSentence = text.slice(0, firstPeriod + 1).trim();
  const remainingText = text.slice(firstPeriod + 1).trim();

  paragraph.textContent = "";

  const lead = document.createElement("strong");
  lead.className = "lead-sentence";
  lead.textContent = firstSentence;
  paragraph.appendChild(lead);

  if (remainingText) {
    paragraph.appendChild(document.createTextNode(` ${remainingText}`));
  }
});
