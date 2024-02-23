// HELPERS
function changeLabelContainerBorderColor(labelContainer, color) {
  labelContainer.classList.remove("container--selected");
  labelContainer.style.borderBottom = `0.4rem solid ${color}`;
}

function selectLabel(target, currentPlanetData) {
  makeLabelWhite(target);

  // Change the label container's border-bottom color to the current planet's color
  changeLabelContainerBorderColor(
    target.closest(".planet-facts__label-container"),
    currentPlanetData.color
  );
}

function deselectLabel(label) {
  makeLabelWhite50Percent(label);

  // Make the border-bottom of the label container that was not selected transparent
  changeLabelContainerBorderColor(
    label.closest(".planet-facts__label-container"),
    "transparent"
  );
}

function makeLabelWhite(label) {
  label.classList.remove("label--not-selected");
  label.classList.add("label--selected");
}

function makeLabelWhite50Percent(label) {
  label.classList.remove("label--selected");
  label.classList.add("label--not-selected");
}

function updatePlanetFactsLabel(planetFactsLabel, currentPlanetData) {
  for (let label of planetFactsLabel) {
    if (label.classList.contains("label--selected")) {
      deselectLabel(label);
    }
  }

  // Make the first 'planetFactsLabel' white and change the label container's border-bottom color to that planet's color
  selectLabel(planetFactsLabel[0], currentPlanetData);
}

function removeElement(element) {
  if (element) element.remove();
}

function insertPlanetSurfaceImage(
  currentPlanetData,
  planetImage,
  planetSurfaceImageObj
) {
  const planetSurfaceImageHTML = `<img class='planet-info__surface-img' src=${currentPlanetData.images.geology} alt='Planet image'/>`;

  // Insert 'planetSurfaceImage' right after 'planetImage'
  planetImage.insertAdjacentHTML("afterend", planetSurfaceImageHTML);
  planetSurfaceImageObj.image = document.querySelector(
    ".planet-info__surface-img"
  );
}

function selectLabelAndLabelContainer(
  contentContainer,
  target,
  currentPlanetData,
  planetFactsLabel
) {
  for (let i = 0; i < contentContainer.length; i++) {
    if (target === contentContainer[i]) {
      selectLabel(planetFactsLabel[i], currentPlanetData);
    } else {
      deselectLabel(planetFactsLabel[i]);
    }
  }
}

function hideSidebar(headerMenuIcon, sidebar) {
  headerMenuIcon.classList.remove("header__menu-icon--clicked");
  sidebar.classList.remove("sidebar--open");
}

function displaySidebar(
  headerMenuIcon,
  hideFactsAndInfo,
  sidebar,
  planetFacts,
  planetInfo
) {
  headerMenuIcon.classList.add("header__menu-icon--clicked");
  hideFactsAndInfo(planetFacts, planetInfo);
  sidebar.classList.add("sidebar--open");
}

function displayFactsAndInfo(planetFacts, planetInfo) {
  planetFacts.classList.remove("hidden");
  planetInfo.classList.remove("hidden");
}

function hideFactsAndInfo(planetFacts, planetInfo) {
  planetFacts.classList.add("hidden");
  planetInfo.classList.add("hidden");
}

function selectContainer(target, contentContainer, currentPlanetData) {
  for (let container of contentContainer) {
    if (container === target) {
      // If the target container already has the "content-container--selected" class, then do nothing
      if (target.classList.contains("content-container--selected")) return;

      // Change the background color of the target container
      target.classList.remove("content-container--hovered");
      target.style.background = currentPlanetData.color;
    } else {
      // Remove the "content-container--selected" class from the container if it has it and reset the container's background color to its initial state
      container.classList.remove("content-container--selected");
      container.style.background = "initial";
    }
  }
}

function changeContentContainerBackground(
  contentContainer,
  currentLabelIndex,
  currentPlanetData
) {
  contentContainer[0].classList.remove("content-container--selected");
  // Change each content container's background back to its initial state
  contentContainer.forEach((container) => {
    container.style.background = "initial";
  });
  // Change the background of the content container that corresponds with the label that was selected
  contentContainer[currentLabelIndex].style.background =
    currentPlanetData.color;
}

function addOrRemoveContainerHoverClass(e, eventName) {
  const target = e.target.closest(".planet-info__content-container");
  if (!target) return;

  if (eventName === "mouseover") {
    // Change background color of content container to iron
    target.classList.add("content-container--hovered");
  }

  if (eventName === "mouseout") {
    target.classList.remove("content-container--hovered");
  }
}

function isViewportWidthBelowThreshold() {
  const viewportWidth = window.innerWidth;
  return viewportWidth < 1104 ? true : false;
}

function isTouchDevice() {
  return "ontouchstart" in window ? true : false;
}

function handleHeaderPlanetsHover(e, planets, eventType) {
  if (!e.target.classList.contains("header__planet")) return;

  // If the viewport width is less than 1104px, then do nothing
  if (isViewportWidthBelowThreshold()) return;

  // If the device is a touch device, then do nothing
  if (isTouchDevice()) return;

  if (eventType === "mouseover") {
    // Find the data for the 'header__planet' that was hovered
    const headerPlanetName = e.target.textContent.toLowerCase();
    const headerPlanetData = planets.find(
      (planet) => planet.name.toLowerCase() === headerPlanetName
    );

    // Change the border-top color of the 'header__planet' to that planet's color
    e.target.style.borderTop = `0.4rem solid ${headerPlanetData.color}`;
  }

  if (eventType === "mouseout") {
    // Change the border-top color of the 'header__planet' that was just hovered back to transparent
    e.target.style.borderTop = "0.4rem solid transparent";
  }
}

function changeHeaderPlanetColor(
  headerPlanet,
  elementClicked,
  currentPlanet,
  currentPlanetData,
  target
) {
  for (let element of headerPlanet) {
    // Reset the color of all 'header__planet' elements back to white
    element.classList.remove("header__planet--selected");
    element.style.color = "#fff";

    // Change the color of the 'header__planet' element that corresponds with the 'sidebar__planet-container' that was clicked
    if (elementClicked === "sidebar__planet-container") {
      if (element.textContent.toLowerCase() === currentPlanet) {
        element.style.color = currentPlanetData.color;
      }
    }
  }

  // Change the color of the 'header__planet' element that was clicked to that planet's color
  if (elementClicked === "header__planet") {
    target.style.color = currentPlanetData.color;
  }
}

export {
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
};
