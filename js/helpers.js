// HELPERS
function selectLabel(target, currentPlanetData) {
  // Do nothing if the label is already selected
  if (target.classList.contains("label--selected")) return;

  makeLabelWhite(target);

  // Add border-bottom to label container
  const labelContainer = target.closest(".planet-facts__label-container");
  labelContainer.style.borderBottom = `0.4rem solid ${currentPlanetData.color}`;
}

function deselectLabelContainer(labelContainer) {
  labelContainer.classList.remove("container--selected");
  labelContainer.style.borderBottom = "0.4rem solid transparent";
}

function deselectLabel(label) {
  makeLabelWhite50Percent(label);

  // Make the border-bottom of the label container that was not selected transparent
  const labelContainer = label.closest(".planet-facts__label-container");
  deselectLabelContainer(labelContainer);
}

function makeLabelWhite(label) {
  label.classList.remove("label--not-selected");
  label.classList.add("label--selected");
}

function makeLabelWhite50Percent(label) {
  label.classList.remove("label--selected");
  label.classList.add("label--not-selected");
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
  planetFactsLabelContainer,
  currentPlanetData,
  planetFactsLabel
) {
  for (let i = 0; i < contentContainer.length; i++) {
    if (target === contentContainer[i]) {
      planetFactsLabelContainer[
        i
      ].style.borderBottom = `0.4rem solid ${currentPlanetData.color}`;

      makeLabelWhite(planetFactsLabel[i]);
    } else {
      deselectLabelContainer(planetFactsLabelContainer[i]);
      makeLabelWhite50Percent(planetFactsLabel[i]);
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

function selectOverviewLabel(planetFactsLabel, currentPlanetData) {
  // Give the overview label the "label--selected" class
  const overviewLabel = planetFactsLabel[0];
  overviewLabel.classList.remove("label--not-selected");
  overviewLabel.classList.add("label--selected");

  // Change border-bottom color of the overview label container to the planet's border color
  const overviewLabelContainer = document.querySelector(
    ".planet-facts__label-container"
  );
  overviewLabelContainer.style.borderBottom = `0.4rem solid ${currentPlanetData.color}`;
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

function selectOverviewContainer(contentContainer, currentPlanetData) {
  const overviewContainer = contentContainer[0];
  overviewContainer.classList.remove("content-container--selected");
  overviewContainer.style.background = currentPlanetData.color;
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
  if (viewportWidth < 1104) return true;
}

function handleHeaderPlanetsMouseover(e, planets) {
  if (!e.target.classList.contains("header__planet")) return;

  // If the viewport width is less than 1104px, then do nothing
  if (isViewportWidthBelowThreshold()) return;

  // Find the data for the 'header__planet' that was hovered
  const headerPlanetName = e.target.textContent.toLowerCase();
  const headerPlanetData = planets.find(
    (planet) => planet.name.toLowerCase() === headerPlanetName
  );

  // Change the border-top color of the 'header__planet' to that planet's color
  e.target.style.borderTop = `0.4rem solid ${headerPlanetData.color}`;
}

function handleHeaderPlanetsMouseout(e) {
  if (!e.target.classList.contains("header__planet")) return;

  // If the viewport width is less than 1104px, then do nothing
  if (isViewportWidthBelowThreshold()) return;

  // Change the border-top color of the 'header__planet' that was just hovered back to transparent
  e.target.style.borderTop = "0.4rem solid transparent";
}

export {
  selectLabel,
  deselectLabel,
  removeElement,
  insertPlanetSurfaceImage,
  selectLabelAndLabelContainer,
  hideSidebar,
  displaySidebar,
  selectOverviewLabel,
  displayFactsAndInfo,
  hideFactsAndInfo,
  selectContainer,
  changeContentContainerBackground,
  selectOverviewContainer,
  addOrRemoveContainerHoverClass,
  handleHeaderPlanetsMouseover,
  handleHeaderPlanetsMouseout,
};
