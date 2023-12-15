import "core-js/stable";
import "regenerator-runtime/runtime";
import planets from "./data";

// VARIABLES
let currentPlanet = "mercury";
let currentPlanetData = planets.find(
  (planet) => planet.name.toLowerCase() === currentPlanet
);
let currentLabelTextContent = "overview";
const planetFacts = document.querySelector(".planet-facts");
const planetFactsLabel = document.querySelectorAll(".planet-facts__label");
const planetImage = document.querySelector(".planet-info__img");
const planetDetails = document.querySelector(".planet-info__details");
const sourceLink = document.querySelector(".source__link");
const sourceWindow = document.querySelector(".source__window");

// HELPER FUNCTIONS
function selectLabel(target) {
  // Do nothing if the label is already selected
  if (target.classList.contains("label--selected")) return;

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

  const targetTextContent = target.textContent.toLowerCase();

  if (targetTextContent === currentLabelTextContent) {
    return;
  } else {
    currentLabelTextContent = targetTextContent;
  }

  if (targetTextContent === "overview") {
    planetImage.src = currentPlanetData.images.planet;
    planetDetails.innerHTML = currentPlanetData.overview.content;
    sourceLink.href = currentPlanetData.overview.source;
    sourceWindow.href = currentPlanetData.overview.source;
  }

  if (targetTextContent === "structure") {
    planetImage.src = currentPlanetData.images.internal;
    planetDetails.innerHTML = currentPlanetData.structure.content;
    sourceLink.href = currentPlanetData.structure.source;
    sourceWindow.href = currentPlanetData.structure.source;
  }
});
