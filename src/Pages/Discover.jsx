import { useEffect, useState } from "react";
import { discoverMovies, getMovieGenres } from "../Services/tmdb";

import MovieCard from "../Components/MovieCard";
import Loader from "../Components/Loader";

function Discover() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [votes, setVotes] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  // Get movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await discoverMovies({
          genre,
          year,
          rating,
          votes,
          sortBy,
          page,
        });

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre, year, rating, votes, sortBy, page]);

  const resetFilters = () => {
    setGenre("");
    setYear("");
    setRating("");
    setVotes("");
    setSortBy("popularity.desc");
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 pt-3">Discover Movies</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Genre */}
        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Genres</option>

          {genres.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-3"
        >
          <option value="popularity.desc">Popularity</option>

          <option value="vote_average.desc">Rating</option>

          <option value="primary_release_date.desc">Newest</option>

          <option value="primary_release_date.asc">Oldest</option>

          <option value="vote_count.desc">Most Voted</option>
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Years</option>

          {Array.from({ length: 30 }, (_, index) => {
            const year = new Date().getFullYear() - index;

            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        {/* Rating */}
        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">Any Rating</option>
          <option value="9">9+</option>
          <option value="8">8+</option>
          <option value="7">7+</option>
          <option value="6">6+</option>
          <option value="5">5+</option>
        </select>

        {/* Votes */}
        <select
          value={votes}
          onChange={(e) => {
            setVotes(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">Any Vote Count</option>
          <option value="100">100+</option>
          <option value="500">500+</option>
          <option value="1000">1,000+</option>
          <option value="5000">5,000+</option>
          <option value="10000">10,000+</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="mb-8 px-5 py-2 rounded-lg bg-red-500 text-white"
      >
        Reset Filters
      </button>

      {/* Results */}
      {loading && <Loader />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center">No movies found.</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40"
            >
              Previous
            </button>

            <span>
              Page {page} of {Math.min(totalPages, 500)}
            </span>

            <button
              disabled={page >= totalPages || page >= 500}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Discover;
