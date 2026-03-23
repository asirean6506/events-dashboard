import { shows } from "./data/shows.js";
import { renderShows } from "./js/render.js";
import { filterShows } from "./js/filter.js";

const search = document.getElementById("search");

search.addEventListener("input", () => {
  const filtered = filterShows(shows, search.value);
  renderShows(filtered);
});

renderShows(shows);
