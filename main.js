import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const planetFacts = document.querySelector(".planet-facts");
const planetFactsLabel = document.querySelectorAll(".planet-facts__label");

planetFacts.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.classList.contains("planet-facts__label")) return;

  for (let label of planetFactsLabel) {
    if (label === target) {
      // Make label color white
      target.classList.remove("label--not-selected");
      target.classList.add("label--selected");

      // Add border-bottom to label container
      const labelContainer = target.closest(".planet-facts__label-container");

      labelContainer.classList.add("container--selected");
    } else {
      // Make label color 'white50Percent'
      label.classList.remove("label--selected");
      label.classList.add("label--not-selected");

      // Remove border-bottom from labels that were not selected
      const labelContainer = label.closest(".planet-facts__label-container");

      labelContainer.classList.remove("container--selected");
    }
  }
});
