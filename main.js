import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const planetFacts = document.querySelector(".planet-facts");
const planetFactsLabel = document.querySelectorAll(".planet-facts__label");

planetFacts.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.classList.contains("planet-facts__label")) return;
});
