const buttons = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".card");

const ANIM_MS = 250;

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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  });
});
