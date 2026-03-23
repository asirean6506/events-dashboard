export function saveFavorite(show) {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(show);
  localStorage.setItem("favorites", JSON.stringify(favs));
}