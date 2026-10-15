import { useContext } from "react";
import { WishlistContext } from "../context/wishlistCore";

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      wishlist: [],
      wishlistCount: 0,
      isInWishlist: () => false,
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      toggleWishlist: () => false,
      clearWishlist: () => {},
    };
  }
  return context;
}

export default useWishlist;
