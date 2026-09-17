import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../Services/tmdb";
import WishButton from "./WishButton";
import Loader from "./Loader";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Left side dark gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="w-full px-6 py-20 md:px-12 lg:px-20">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-12 flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
            >
              <span>←</span>
              <span>Browse</span>
            </button>

            {/* Movie information */}
            <div className="max-w-xl">
              {/* Title */}
              <h1 className="text-4xl font-black uppercase leading-tight tracking-wide sm:text-5xl md:text-6xl">
                {movie.title}
              </h1>

              {/* Movie meta */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span>{movie.release_date?.slice(0, 4)}</span>

                <span>•</span>

                <span>
                  {movie.runtime
                    ? `${Math.floor(movie.runtime / 60)}h ${
                        movie.runtime % 60
                      }m`
                    : "N/A"}
                </span>

                <span>•</span>

                <span>{movie.adult ? "18+" : "13+"}</span>
              </div>

              {/* Rating */}
              <div className="mt-5">
                <div className="flex items-center gap-1">
                  <span className="text-lg text-yellow-400">★</span>
                  <span className="text-lg font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="ml-1 text-sm text-gray-400">/ 10</span>
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  {movie.vote_count.toLocaleString()} ratings
                </p>
              </div>

              {/* Overview */}
              <p className="mt-6 line-clamp-4 text-sm leading-6 text-gray-300 md:text-base">
                {movie.overview}
              </p>

              {/* Genres */}
              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-gray-200 backdrop-blur-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  <span>▶</span>
                  Play Now
                </button>

                <button
                  type="button"
                  className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                >
                  Trailer
                </button>

                {movie && <WishButton mode="light" movie={movie} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
