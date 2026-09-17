import useWishlist from "../contexts/useWishlist";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="p-6 container">
      <h1 className="text-2xl font-bold mb-6 pt-3">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((movie) => (
            <div key={movie.id} className="border rounded-lg p-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-lg font-semibold mt-3">{movie.title}</h2>

              <p>Vote: {movie.vote_count}</p>

              <button
                onClick={() => toggleWishlist(movie)}
                className="mt-3 bg-gray-300 text-black px-4 py-2 rounded"
              >
                X Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
