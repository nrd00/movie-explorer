import { useState } from "react";
import { WishlistContext } from "./WishlistContext";

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (movie) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);

      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }

      return [...prev, movie];
    });
  };

  const isInWishlist = (id) => {
    console.log("wishlist:", wishlist);
    console.log("checking id:", id);

    return wishlist.some((item) => {
      console.log("wishlist item:", item);
      return item.id === id;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
