import { HeartPlus } from "lucide-react";
import useWishlist from "../contexts/useWishlist";

const WishButton = ({ mode, movie }) => {
  console.log("1. movie:", movie);
  console.log("2. movie?.id:", movie?.id);

  const wishlistData = useWishlist();

  console.log("3. wishlistData:", wishlistData);

  const { toggleWishlist, isInWishlist } = wishlistData;

  console.log("4. isInWishlist:", isInWishlist);

  const wishlisted = isInWishlist(movie.id);

  console.log("5. wishlisted:", wishlisted);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleWishlist(movie)}
        className={`rounded-full px-4 py-2 cursor-pointer transition duration-200 hover:bg-white/20 hover:text-red-500 ${
          mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <HeartPlus
          size={22}
          className={`${wishlisted ? "text-red-500 " : " "}`}
        />
      </button>
    </>
  );
};

export default WishButton;
