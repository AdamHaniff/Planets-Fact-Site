import {
  selectLabel,
  deselectLabel,
  hideSidebar,
  displaySidebar,
  selectOverviewLabel,
  displayFactsAndInfo,
  hideFactsAndInfo,
} from "./helpers";
import "core-js/stable";
import "regenerator-runtime/runtime";
import planets from "./data";

// VARIABLES
let currentPlanet = "mercury";
let currentPlanetData = planets[0];
let currentLabelIndex = 0;
const headerMenuBtn = document.querySelector(".header__menu-btn");
const headerMenuIcon = document.querySelector(".header__menu-icon");
const planetFacts = document.querySelector(".planet-facts");
const planetInfo = document.querySelector(".planet-info");
const planetFactsLabel = document.querySelectorAll(".planet-facts__label");
const planetImage = document.querySelector(".planet-info__img");
const planetName = document.querySelector(".planet-info__name");
const planetDetails = document.querySelector(".planet-info__details");
const sourceLink = document.querySelector(".source__link");
const sourceWindow = document.querySelector(".source__window");
const planetDataValue = document.querySelectorAll(".planet-info__data-value");
const sidebar = document.querySelector(".sidebar");

// FUNCTIONS
function updatePlanetInfo(target, labelContainer) {
  for (let index = 0; index < labelContainer.length; index++) {
    const label = labelContainer[index];
    // If the same label is clicked again, then do nothing
    if (target === labelContainer[currentLabelIndex]) break;

    // If a new label is clicked, then update 'currentLabelIndex'
    if (target === label) currentLabelIndex = index;

    if (currentLabelIndex === 0) {
      planetImage.src = currentPlanetData.images.planet;
      planetDetails.innerHTML = currentPlanetData.overview.content;
      sourceLink.href = currentPlanetData.overview.source;
      sourceWindow.href = currentPlanetData.overview.source;
    }

    if (currentLabelIndex === 1) {
      planetImage.src = currentPlanetData.images.internal;
      planetDetails.innerHTML = currentPlanetData.structure.content;
      sourceLink.href = currentPlanetData.structure.source;
      sourceWindow.href = currentPlanetData.structure.source;
    }

    if (currentLabelIndex === 2) {
      planetImage.src = currentPlanetData.images.geology;
      planetDetails.innerHTML = currentPlanetData.geology.content;
      sourceLink.href = currentPlanetData.geology.source;
      sourceWindow.href = currentPlanetData.geology.source;
    }
  }
}

function updateHTML() {
  planetImage.src = currentPlanetData.images.planet;
  planetName.textContent = currentPlanetData.name;
  planetDetails.textContent = currentPlanetData.overview.content;
  sourceLink.href = currentPlanetData.overview.source;
  sourceWindow.href = currentPlanetData.overview.source;

  const values = [
    currentPlanetData.rotation,
    currentPlanetData.revolution,
    currentPlanetData.radius,
    currentPlanetData.temperature,
  ];

  planetDataValue.forEach((el, i) => {
    el.textContent = values[i];
  });
}

function updateCurrentPlanet(planetName) {
  currentPlanet = planetName;
  currentPlanetData = planets.find(
    (planet) => planet.name.toLowerCase() === currentPlanet
  );
  currentLabelIndex = 0;
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handlePlanetFactsLabelClick(e) {
  const target = e.target;
  if (!target.classList.contains("planet-facts__label")) return;

  for (let label of planetFactsLabel) {
    if (label === target) {
      selectLabel(target, currentPlanetData);
    } else {
      deselectLabel(label);
    }
  }

  updatePlanetInfo(target, planetFactsLabel);
}

function handleHeaderMenuBtnClick(e) {
  const target = e.target.closest(".header__menu-btn");
  if (!target) return;

  // Check if the 'sidebar' is already open
  const isSidebarOpen = sidebar.classList.contains("sidebar--open");
  if (isSidebarOpen) {
    // Change color of 'headerMenuIcon' and hide the 'sidebar'
    hideSidebar(headerMenuIcon, sidebar);

    // Display 'planetFacts' and 'planetInfo'
    displayFactsAndInfo(planetFacts, planetInfo);

    return;
  }

  // Change color of 'headerMenuIcon', hide 'planetFacts' and 'planetInfo', and display 'sidebar'
  displaySidebar(
    headerMenuIcon,
    hideFactsAndInfo,
    sidebar,
    planetFacts,
    planetInfo
  );
}

function handleSidebarPlanetClick(e) {
  const sidebarPlanetContainer = e.target.closest(".sidebar__planet-container");
  if (!sidebarPlanetContainer) return;

  const sidebarPlanetName = sidebarPlanetContainer
    .querySelector(".sidebar__planet-name")
    .textContent.toLowerCase();

  // Update 'currentPlanet' and 'currentPlanetData' to the planet that was clicked
  updateCurrentPlanet(sidebarPlanetName);

  // Change color of 'headerMenuIcon' and hide the 'sidebar'
  hideSidebar(headerMenuIcon, sidebar);

  // Deselect the label that is currently selected and remove the border-bottom from that label's container
  for (let label of planetFactsLabel) {
    if (label.classList.contains("label--selected")) {
      deselectLabel(label);
    }
  }

  // Select the overview label and change the border-bottom color of the label's container to the planet's border color
  selectOverviewLabel(planetFactsLabel, currentPlanetData);

  // Update HTML in 'planetInfo'
  updateHTML();

  // Display 'planetFacts' and 'planetInfo'
  displayFactsAndInfo(planetFacts, planetInfo);
}

// EVENT LISTENERS
planetFacts.addEventListener("click", handlePlanetFactsLabelClick);
headerMenuBtn.addEventListener("click", handleHeaderMenuBtnClick);
sidebar.addEventListener("click", handleSidebarPlanetClick);

// CODE FOR TABLET SITE

// VARIABLES
const headerPlanets = document.querySelector(".header__planets");
const planetInfoContent = document.querySelector(".planet-info__content");
const contentContainer = document.querySelectorAll(
  ".planet-info__content-container"
);

// EVENT LISTENER CALLBACK FUNCTIONS
function handlePlanetInfoContentClick(e) {
  const target = e.target.closest(".planet-info__content-container");
  if (!target || !target.classList.contains("planet-info__content-container"))
    return;

  updatePlanetInfo(target, contentContainer);

  for (let container of contentContainer) {
    if (container === target) {
      // If the target container already has the "content-container--selected" class, then do nothing
      if (target.classList.contains("content-container--selected")) return;

      // Change the background color of the target container
      target.style.background = currentPlanetData.color;
    } else {
      // Remove the "content-container--selected" class from the container if it has it and reset the container's background color to its initial state
      container.classList.remove("content-container--selected");
      container.style.background = "initial";
    }
  }
}

// EVENT LISTENERS
headerPlanets.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.classList.contains("header__planet")) return;

  const headerPlanetName = target.textContent.toLowerCase();
  // Update 'currentPlanet' and 'currentPlanetData' to the planet that was clicked
  updateCurrentPlanet(headerPlanetName);

  // Update HTML in 'planetInfo'
  updateHTML();
});

planetInfoContent.addEventListener("click", handlePlanetInfoContentClick);
