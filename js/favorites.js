const STORAGE_KEY = "events-dashboard-favorites";

export function getFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not read favorites:", error);
    return [];
  }
}

export function isFavorite(showId, favorites = getFavorites()) {
  return favorites.includes(showId);
}

export function toggleFavorite(showId) {
  const favorites = getFavorites();
  const next = favorites.includes(showId)
    ? favorites.filter((id) => id !== showId)
    : [...favorites, showId];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearFavorites() {
  localStorage.removeItem(STORAGE_KEY);
}
