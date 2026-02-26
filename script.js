const buttons = document.querySelectorAll(".tab-btn");
const cards = Array.from(document.querySelectorAll(".card"));

const ANIM_MS = 250;

/* ---------- Filter (your existing logic) ---------- */
function hideCard(card) {
  if (card.classList.contains("is-hidden")) return;

  card.classList.add("is-hiding");
  setTimeout(() => {
    card.classList.add("is-hidden");
  }, ANIM_MS);
}

function showCard(card) {
  card.classList.remove("is-hidden");
  requestAnimationFrame(() => {
    card.classList.remove("is-hiding");
  });
}

/* ---------- Lightbox elements ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentFilter = "all";
let visibleCards = [];
let currentIndex = 0;

function getVisibleCards() {
  // Only cards that match the current filter AND are not hidden
  return cards.filter((card) => {
    const category = card.dataset.category;
    const matchesFilter = currentFilter === "all" || category === currentFilter;
    const notHidden = !card.classList.contains("is-hidden");
    return matchesFilter && notHidden;
  });
}

function openLightbox(index) {
  visibleCards = getVisibleCards();
  if (!visibleCards.length) return;

  currentIndex = Math.max(0, Math.min(index, visibleCards.length - 1));

  const card = visibleCards[currentIndex];
  const fullSrc = card.dataset.full;
  const thumbImg = card.querySelector("img");

  lightboxImg.src = fullSrc;
  lightboxImg.alt = thumbImg ? thumbImg.alt : "Expanded portfolio item";

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

function nextImage() {
  visibleCards = getVisibleCards();
  if (!visibleCards.length) return;

  currentIndex = (currentIndex + 1) % visibleCards.length;
  openLightbox(currentIndex);
}

function prevImage() {
  visibleCards = getVisibleCards();
  if (!visibleCards.length) return;

  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  openLightbox(currentIndex);
}

/* ---------- Tab click (filter + remember currentFilter) ---------- */
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.dataset.filter;

    cards.forEach((card) => {
      const category = card.dataset.category;

      if (currentFilter === "all" || category === currentFilter) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  });
});

/* ---------- Card click opens lightbox ---------- */
cards.forEach((card) => {
  card.addEventListener("click", () => {
    visibleCards = getVisibleCards();
    const index = visibleCards.indexOf(card);
    if (index !== -1) openLightbox(index);
  });
});

/* ---------- Lightbox controls ---------- */
lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextImage);
lightboxPrev.addEventListener("click", prevImage);

// Click the dark background closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard support (Esc / arrows)
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});
