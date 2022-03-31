export const sortResults = (draft, method: string) => {
  if (method === "Popularity") {
    return draft.searchResults.results.sort(
      (a, b) => b.score.detail.popularity - a.score.detail.popularity
    );
  } else if (method === "Quality") {
    return draft.searchResults.results.sort(
      (a, b) => b.score.detail.quality - a.score.detail.quality
    );
  } else if (method === "Maintenance") {
    return draft.searchResults.results.sort(
      (a, b) => b.score.detail.maintenance - a.score.detail.maintenance
    );
  } else {
    return draft.searchResults.results.sort(
      (a, b) => b.searchScore - a.searchScore
    );
  }
};
