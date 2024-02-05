import {
  selectLabel,
  deselectLabel,
  hideSidebar,
  displaySidebar,
  selectOverviewLabel,
  displayFactsAndInfo,
  hideFactsAndInfo,
  selectContainer,
  selectOverviewContainer,
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
const headerPlanets = document.querySelector(".header__planets");
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
const planetInfoContent = document.querySelector(".planet-info__content");
const contentContainer = document.querySelectorAll(
  ".planet-info__content-container"
);

// EVENT LISTENER CALLBACK FUNCTIONS
function handleHeaderPlanetsClick(e) {
  const target = e.target;
  if (!target.classList.contains("header__planet")) return;

  const headerPlanetName = target.textContent.toLowerCase();
  // Update 'currentPlanet' and 'currentPlanetData' to the planet that was clicked
  updateCurrentPlanet(headerPlanetName);

  // Remove the background color from the container that is currently selected
  for (let container of contentContainer) {
    container.style.background = "initial";
  }

  // Select the overview container and change its background color to the new planet's color
  selectOverviewContainer(contentContainer, currentPlanetData);

  // Update HTML in 'planetInfo'
  updateHTML();
}

function handlePlanetInfoContentClick(e) {
  const target = e.target.closest(".planet-info__content-container");
  if (!target || !target.classList.contains("planet-info__content-container"))
    return;

  updatePlanetInfo(target, contentContainer);

  // Change the background of the selected container and remove the background of the previously selected container
  selectContainer(target, contentContainer, currentPlanetData);
}

// EVENT LISTENERS
headerPlanets.addEventListener("click", handleHeaderPlanetsClick);
planetInfoContent.addEventListener("click", handlePlanetInfoContentClick);

// CODE FOR DESKTOP SITE

// FUNCTION
function addOrRemoveContainerHoverClass(e, eventName) {
  const target = e.target.closest(".planet-info__content-container");
  if (!target) return;

  if (eventName === "mouseover") {
    target.classList.add("content-container--hovered");
  }

  if (eventName === "mouseout") {
    target.classList.remove("content-container--hovered");
  }
}

// EVENT LISTENERS
headerPlanets.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("header__planet")) return;

  const headerPlanetName = e.target.textContent.toLowerCase();
  const headerPlanetData = planets.find(
    (planet) => planet.name.toLowerCase() === headerPlanetName
  );

  e.target.style.borderTop = `0.4rem solid ${headerPlanetData.color}`;
});

planetInfoContent.addEventListener("mouseover", (e) =>
  addOrRemoveContainerHoverClass(e, "mouseover")
);

planetInfoContent.addEventListener("mouseout", (e) =>
  addOrRemoveContainerHoverClass(e, "mouseout")
);
