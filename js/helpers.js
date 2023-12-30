function selectLabel(target, currentPlanetData) {
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

function displaySidebar(headerMenuIcon, hideFactsAndInfo, sidebar) {
  headerMenuIcon.classList.add("header__menu-icon--clicked");
  hideFactsAndInfo();
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
  overviewLabelContainer.style.borderBottom = `0.4rem solid ${currentPlanetData.borderColor}`;
}

export {
  selectLabel,
  deselectLabel,
  hideSidebar,
  displaySidebar,
  selectOverviewLabel,
};
