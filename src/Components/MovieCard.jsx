import WishButton from "./WishButton";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="card w-48 bg-base-100 shadow-xl">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-72 w-full object-cover"
        />
      </figure>

      <div className="card-body p-3">
        <h2 className="card-title text-sm">{movie.title}</h2>

        <p className="text-sm text-gray-500">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
      <div className="flex justify-between gap-3 px-4 py-3">
        <button
          type="button"
          className="rounded-lg bg-[#DB5123] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#ec4913] focus:outline-none focus:ring-2 focus:bg-[#db4715] focus:ring-offset-2 cursor-pointer"
          onClick={handleViewDetails}
        >
          View
        </button>

        <WishButton mode={"light"} movie={movie} />
      </div>
    </div>
  );
}

export default MovieCard;
