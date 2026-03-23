export function renderShows(shows) {
  const container = document.getElementById("shows-container");
  container.innerHTML = shows.map(show => `
    <div class="show-card">
      <h3>${show.city}</h3>
      <p>${show.venue}</p>
      <span>${show.date}</span>
    </div>
  `).join("");
}