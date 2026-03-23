import { formatDate } from "./utils.js";
import { isFavorite, toggleFavorite } from "./favorites.js";

export function renderShows({ shows, container, favorites, onFavoriteToggle }) {
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  shows.forEach((show) => {
    const article = document.createElement("article");
    article.className = "show-card";

    const favorite = isFavorite(show.id, favorites);

    article.innerHTML = `
      <div class="show-main">
        <p class="date">${formatDate(show.date)}</p>
        <h2>${show.city}</h2>
        <p class="meta">${show.venue}</p>
      </div>

      <div class="badges">
        <span class="badge">Support: ${show.support}</span>
        <span class="badge">${show.price}</span>
      </div>

      <button
        class="favorite-btn ${favorite ? "is-favorite" : ""}"
        type="button"
        aria-pressed="${favorite}"
      >
        ${favorite ? "★ Favorited" : "☆ Save Show"}
      </button>
    `;

    const button = article.querySelector(".favorite-btn");
    button.addEventListener("click", () => {
      toggleFavorite(show.id);
      onFavoriteToggle();
    });

    fragment.appendChild(article);
  });

  container.appendChild(fragment);
}
