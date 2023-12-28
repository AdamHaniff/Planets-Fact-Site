import "core-js/stable";
import "regenerator-runtime/runtime";
import planets from "./data";

// VARIABLES
let currentPlanet = "mercury";
let currentPlanetData = planets[0];
let currentLabelTextContent = "overview";
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

function hideSidebar(headerMenuIcon, sidebar) {
  headerMenuIcon.classList.remove("header__menu-icon--clicked");
  sidebar.classList.remove("sidebar--open");
}

function displaySidebar() {
  headerMenuIcon.classList.add("header__menu-icon--clicked");
  hideFactsAndInfo();
  sidebar.classList.add("sidebar--open");
}

// FUNCTIONS
function updatePlanetInfo(target) {
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

  if (targetTextContent === "surface") {
    planetImage.src = currentPlanetData.images.geology;
    planetDetails.innerHTML = currentPlanetData.geology.content;
    sourceLink.href = currentPlanetData.geology.source;
    sourceWindow.href = currentPlanetData.geology.source;
  }
}

function selectOverviewLabel() {
  // Give the overview label the "label--selected" class
  const overviewLabel = planetFactsLabel[0];
  overviewLabel.classList.remove("label--not-selected");
  overviewLabel.classList.add("label--selected");

  // Change border-bottom color of the overview label container to the planet's border color
  const overviewLabelContainer = document.querySelector(
    ".planet-facts__label-container"
  );
  overviewLabelContainer.style.borderBottom = `0.4rem solid ${currentPlanetData.borderColor}`;
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

function displayFactsAndInfo() {
  planetFacts.classList.remove("hidden");
  planetInfo.classList.remove("hidden");
}

function hideFactsAndInfo() {
  planetFacts.classList.add("hidden");
  planetInfo.classList.add("hidden");
}

function updateCurrentPlanet(sidebarPlanetName) {
  currentPlanet = sidebarPlanetName;
  currentPlanetData = planets.find(
    (planet) => planet.name.toLowerCase() === currentPlanet
  );
  currentLabelTextContent = "overview";
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handlePlanetFactsLabelClick(e) {
  const target = e.target;
  if (!target.classList.contains("planet-facts__label")) return;

  for (let label of planetFactsLabel) {
    if (label === target) {
      selectLabel(target);
    } else {
      deselectLabel(label);
    }
  }

  updatePlanetInfo(target);
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
    displayFactsAndInfo();

    return;
  }

  // Change color of 'headerMenuIcon', hide 'planetFacts' and 'planetInfo', and display 'sidebar'
  displaySidebar();
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
  selectOverviewLabel();

  // Update HTML in 'planetInfo'
  updateHTML();

  // Display 'planetFacts' and 'planetInfo'
  displayFactsAndInfo();
}

// EVENT LISTENERS
planetFacts.addEventListener("click", handlePlanetFactsLabelClick);
headerMenuBtn.addEventListener("click", handleHeaderMenuBtnClick);
sidebar.addEventListener("click", handleSidebarPlanetClick);
