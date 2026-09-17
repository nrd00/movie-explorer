import { useEffect, useState } from "react";
import { getPopularMovies, getMoviesByGenre } from "../Services/tmdb";
import MovieCard from "../Components/MovieCard";
import Loader from "../Components/Loader";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = genre
          ? await getMoviesByGenre(genre)
          : await getPopularMovies();

        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-bold pt-6">The Best Moives are here.</h1>
        <div className="container mx-auto py-8 flex">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Movies</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="py-8 flex gap-8 flex-wrap justify-center">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
