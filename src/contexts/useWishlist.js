import { useContext } from "react";
import { WishlistContext } from "./WishlistContext";

const useWishlist = () => {
  return useContext(WishlistContext);
};

export default useWishlist;
