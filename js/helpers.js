// HELPERS
function selectLabel(target, currentPlanetData) {
  // Do nothing if the label is already selected
  if (target.classList.contains("label--selected")) return;

  // Make label color white
  target.classList.remove("label--not-selected");
  target.classList.add("label--selected");

  // Add border-bottom to label container
  const labelContainer = target.closest(".planet-facts__label-container");
  labelContainer.style.borderBottom = `0.4rem solid ${currentPlanetData.color}`;
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

function handleHeaderPlanetsMouseover(e, planets) {
  if (!e.target.classList.contains("header__planet")) return;

  // If the viewport width is less than 1104px, then do nothing
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 1104) return;

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
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 1104) return;

  // Change the border-top color of the 'header__planet' that was just hovered back to transparent
  e.target.style.borderTop = "0.4rem solid transparent";
}

export {
  selectLabel,
  deselectLabel,
  hideSidebar,
  displaySidebar,
  selectOverviewLabel,
  displayFactsAndInfo,
  hideFactsAndInfo,
  selectContainer,
  selectOverviewContainer,
  addOrRemoveContainerHoverClass,
  handleHeaderPlanetsMouseover,
  handleHeaderPlanetsMouseout,
};
