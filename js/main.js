import "core-js/stable";
import "regenerator-runtime/runtime";
import planets from "./data";

// VARIABLES
let currentPlanet = "mercury";
let currentPlanetData = planets.find(
  (planet) => planet.name.toLowerCase() === currentPlanet
);
const planetFacts = document.querySelector(".planet-facts");
const planetFactsLabel = document.querySelectorAll(".planet-facts__label");

// HELPER FUNCTIONS
function selectLabel(target) {
  // Make label color white
  target.classList.remove("label--not-selected");
  target.classList.add("label--selected");

  // Add border-bottom to label container
  const labelContainer = target.closest(".planet-facts__label-container");
  labelContainer.style.borderBottom = `0.4rem solid ${currentPlanetData.borderColor}`;
}

function deselectLabel(label) {
  // Make label color 'white50Percent'
  label.classList.remove("label--selected");
  label.classList.add("label--not-selected");

  // Remove border-bottom from label that was not selected
  const labelContainer = label.closest(".planet-facts__label-container");
  labelContainer.classList.remove("container--selected");
  labelContainer.style.borderBottom = "initial";
}

planetFacts.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.classList.contains("planet-facts__label")) return;

  for (let label of planetFactsLabel) {
    if (label === target) {
      selectLabel(target);
    } else {
      deselectLabel(label);
    }
  }
});
