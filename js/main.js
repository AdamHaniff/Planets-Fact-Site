import {
  selectLabel,
  deselectLabel,
  removeElement,
  insertPlanetSurfaceImage,
  selectLabelAndLabelContainer,
  updatePlanetFactsLabel,
  hideSidebar,
  displaySidebar,
  displayFactsAndInfo,
  hideFactsAndInfo,
  selectContainer,
  changeContentContainerBackground,
  addOrRemoveContainerHoverClass,
  handleHeaderPlanetsHover,
  changeHeaderPlanetColor,
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
const headerPlanetsContainer = document.querySelector(".header__planets");
const headerPlanet = document.querySelectorAll(".header__planet");
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
const contentContainer = document.querySelectorAll(
  ".planet-info__content-container"
);
const planetSurfaceImageObj = {
  image: undefined,
};

// FUNCTIONS
function updatePlanetInfo(target, labelContainer) {
  for (let index = 0; index < labelContainer.length; index++) {
    const label = labelContainer[index];
    // If the same label is clicked again, then do nothing
    if (target === labelContainer[currentLabelIndex]) break;

    // If a new label is clicked, then update 'currentLabelIndex'
    if (target === label) {
      currentLabelIndex = index;

      if (currentLabelIndex === 0) {
        planetImage.src = currentPlanetData.images.planet;
        removeElement(planetSurfaceImageObj.image);
        planetDetails.innerHTML = currentPlanetData.overview.content;
        sourceLink.href = currentPlanetData.overview.source;
        sourceWindow.href = currentPlanetData.overview.source;

        changeContentContainerBackground(
          contentContainer,
          currentLabelIndex,
          currentPlanetData
        );
      }

      if (currentLabelIndex === 1) {
        planetImage.src = currentPlanetData.images.internal;
        removeElement(planetSurfaceImageObj.image);
        planetDetails.innerHTML = currentPlanetData.structure.content;
        sourceLink.href = currentPlanetData.structure.source;
        sourceWindow.href = currentPlanetData.structure.source;

        changeContentContainerBackground(
          contentContainer,
          currentLabelIndex,
          currentPlanetData
        );
      }

      if (currentLabelIndex === 2) {
        planetImage.src = currentPlanetData.images.planet;
        insertPlanetSurfaceImage(
          currentPlanetData,
          planetImage,
          planetSurfaceImageObj
        );
        planetDetails.innerHTML = currentPlanetData.geology.content;
        sourceLink.href = currentPlanetData.geology.source;
        sourceWindow.href = currentPlanetData.geology.source;

        changeContentContainerBackground(
          contentContainer,
          currentLabelIndex,
          currentPlanetData
        );
      }
    }
  }
}

function updateHTML() {
  planetImage.src = currentPlanetData.images.planet;
  removeElement(planetSurfaceImageObj.image);
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
      if (target.classList.contains("label--selected")) return;
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

  // Select the overview label and change the border-bottom color of the label's container to the planet's color
  selectLabel(planetFactsLabel[0], currentPlanetData);

  // Update HTML in 'planetInfo'
  updateHTML();

  // Display 'planetFacts' and 'planetInfo'
  displayFactsAndInfo(planetFacts, planetInfo);

  // Change the color of the 'header__planet' element that corresponds with the 'sidebar__planet-container' that was clicked
  changeHeaderPlanetColor(
    headerPlanet,
    "sidebar__planet-container",
    currentPlanet,
    currentPlanetData,
    undefined
  );

  // Select the overview content container
  changeContentContainerBackground(
    contentContainer,
    currentLabelIndex,
    currentPlanetData
  );
}

// EVENT LISTENERS
planetFacts.addEventListener("click", handlePlanetFactsLabelClick);
headerMenuBtn.addEventListener("click", handleHeaderMenuBtnClick);
sidebar.addEventListener("click", handleSidebarPlanetClick);

// CODE FOR TABLET SITE

// VARIABLES
const planetInfoContent = document.querySelector(".planet-info__content");

// EVENT LISTENER CALLBACK FUNCTIONS
function handleHeaderPlanetsClick(e) {
  const target = e.target;
  if (!target.classList.contains("header__planet")) return;
  if (target.classList.contains("header__planet--selected")) return;

  const headerPlanetName = target.textContent.toLowerCase();
  // Update 'currentPlanet' and 'currentPlanetData' to the planet that was clicked
  updateCurrentPlanet(headerPlanetName);

  // Change the 'header__planet' color that was clicked to that planet's color
  changeHeaderPlanetColor(
    headerPlanet,
    "header__planet",
    currentPlanet,
    currentPlanetData,
    target
  );

  // Select first 'planetFactsLabel'
  updatePlanetFactsLabel(planetFactsLabel, currentPlanetData);

  // Select the overview container and change its background color to the new planet's color
  changeContentContainerBackground(
    contentContainer,
    currentLabelIndex,
    currentPlanetData
  );

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

  // Select the 'planetFactsLabel' and 'planetFactsLabelContainer' that corresponds with the content container that was selected
  selectLabelAndLabelContainer(
    contentContainer,
    target,
    currentPlanetData,
    planetFactsLabel
  );
}

// TABLET SITE EVENT LISTENERS
headerPlanetsContainer.addEventListener("click", handleHeaderPlanetsClick);
planetInfoContent.addEventListener("click", handlePlanetInfoContentClick);

// DESKTOP SITE EVENT LISTENERS
headerPlanetsContainer.addEventListener("mouseover", (e) =>
  handleHeaderPlanetsHover(e, planets, "mouseover")
);

headerPlanetsContainer.addEventListener("mouseout", (e) =>
  handleHeaderPlanetsHover(e, planets, "mouseout")
);

planetInfoContent.addEventListener("mouseover", (e) =>
  addOrRemoveContainerHoverClass(e, "mouseover")
);

planetInfoContent.addEventListener("mouseout", (e) =>
  addOrRemoveContainerHoverClass(e, "mouseout")
);
