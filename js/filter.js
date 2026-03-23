export function filterShows(shows, query) {
  return shows.filter(show =>
    show.city.toLowerCase().includes(query.toLowerCase())
  );
}