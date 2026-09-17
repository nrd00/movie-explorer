import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../Services/tmdb";
import MovieCard from "../Components/MovieCard";
import Loader from "../Components/Loader";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query);

        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search results for "{query}"</h1>

      {movies.length === 0 ? (
        <p className="text-center">No movies found.</p>
      ) : (
        <div className="flex gap-8 flex-wrap justify-center">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
