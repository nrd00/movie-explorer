const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US&page=1`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const getMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const discoverMovies = async (filters = {}) => {
  const params = new URLSearchParams();

  params.append("include_adult", "false");
  params.append("include_video", "false");
  params.append("language", "en-US");

  if (filters.genre) {
    params.append("with_genres", filters.genre);
  }

  if (filters.year) {
    params.append("primary_release_year", filters.year);
  }

  if (filters.rating) {
    params.append("vote_average.gte", filters.rating);
  }

  if (filters.votes) {
    params.append("vote_count.gte", filters.votes);
  }

  params.append("sort_by", filters.sortBy || "popularity.desc");

  params.append("page", filters.page || 1);

  const response = await fetch(
    `${BASE_URL}/discover/movie?${params.toString()}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const getMovieGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?language=en`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
};

const tmdbApi = {
  getPopularMovies,
  getMovieDetails,
  getMoviesByGenre,
  discoverMovies,
  getMovieGenres,
  searchMovies,
};

export default tmdbApi;
