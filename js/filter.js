export function filterShows(shows, { query, city, favoritesOnly, favorites }) {
  const normalizedQuery = query.toLowerCase();

  return shows.filter((show) => {
    const matchesQuery =
      show.city.toLowerCase().includes(normalizedQuery) ||
      show.venue.toLowerCase().includes(normalizedQuery);

    const matchesCity = city === "all" || show.city === city;
    const matchesFavorites = !favoritesOnly || favorites.includes(show.id);

    return matchesQuery && matchesCity && matchesFavorites;
  });
}

export function sortShows(shows, sortBy) {
  const next = [...shows];

  switch (sortBy) {
    case "date-desc":
      return next.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "city-asc":
      return next.sort((a, b) => a.city.localeCompare(b.city));
    case "date-asc":
    default:
      return next.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}

export function getUniqueCities(shows) {
  return [...new Set(shows.map((show) => show.city))].sort((a, b) =>
    a.localeCompare(b)
  );
}
