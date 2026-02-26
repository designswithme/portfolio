const buttons = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".card");

buttons.forEach(button => {
  button.addEventListener("click", () => {

    // remove active state from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {
      if (filter === "all") {
        card.style.display = "block";
      } else {
        card.style.display =
          card.dataset.category === filter ? "block" : "none";
      }
    });

  });
});
