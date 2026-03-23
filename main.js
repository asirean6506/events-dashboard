import { shows } from "./data/shows.js";
import { renderShows } from "./js/render.js";
import { filterShows, sortShows, getUniqueCities } from "./js/filter.js";
import { getFavorites, clearFavorites } from "./js/favorites.js";

const elements = {
  search: document.getElementById("search"),
  cityFilter: document.getElementById("cityFilter"),
  sortBy: document.getElementById("sortBy"),
  favoritesOnly: document.getElementById("favoritesOnly"),
  clearFavorites: document.getElementById("clearFavorites"),
  resultsText: document.getElementById("resultsText"),
  showsContainer: document.getElementById("showsContainer"),
  emptyState: document.getElementById("emptyState"),
  toggleButtons: document.querySelectorAll(".toggle-btn")
};

const state = {
  query: "",
  city: "all",
  sort: "date-asc",
  favoritesOnly: false,
  view: "grid"
};

populateCityFilter();
bindEvents();
update();

function populateCityFilter() {
  const cities = getUniqueCities(shows);
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    elements.cityFilter.appendChild(option);
  });
}

function bindEvents() {
  elements.search.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    update();
  });

  elements.cityFilter.addEventListener("change", (event) => {
    state.city = event.target.value;
    update();
  });

  elements.sortBy.addEventListener("change", (event) => {
    state.sort = event.target.value;
    update();
  });

  elements.favoritesOnly.addEventListener("change", (event) => {
    state.favoritesOnly = event.target.checked;
    update();
  });

  elements.clearFavorites.addEventListener("click", () => {
    clearFavorites();
    update();
  });

  elements.toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      elements.toggleButtons.forEach((btn) =>
        btn.classList.toggle("is-active", btn === button)
      );
      elements.showsContainer.classList.toggle("is-list", state.view === "list");
    });
  });
}

function update() {
  const favorites = getFavorites();

  let nextShows = filterShows(shows, {
    query: state.query,
    city: state.city,
    favoritesOnly: state.favoritesOnly,
    favorites
  });

  nextShows = sortShows(nextShows, state.sort);

  renderShows({
    shows: nextShows,
    container: elements.showsContainer,
    favorites,
    view: state.view,
    onFavoriteToggle: update
  });

  elements.showsContainer.classList.toggle("is-list", state.view === "list");
  elements.resultsText.textContent = `${nextShows.length} show${nextShows.length === 1 ? "" : "s"} found`;
  elements.emptyState.classList.toggle("hidden", nextShows.length > 0);
}
