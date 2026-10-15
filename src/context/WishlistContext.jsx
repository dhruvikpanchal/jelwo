import { useState, useEffect, useCallback, useMemo } from "react";
import { WishlistContext } from "./wishlistCore";
import { products } from "@/data/productsData";

const STORAGE_KEY = "jelwo_wishlist_items";

// Helper to sanitize product object for wishlist storage
const formatWishlistProduct = (item) => {
  if (!item) return null;
  const primaryImg = item.images?.[0]?.src || item.image || "";
  const secondaryImg = item.images?.[1]?.src || primaryImg;

  return {
    id: item.id || `prod-${item.slug || Math.random()}`,
    name: item.name || item.title || "Luxury Jewelry Piece",
    slug: item.slug || "",
    price: typeof item.price === "number" ? item.price : 28,
    comparePrice: item.comparePrice || null,
    stock: typeof item.stock === "number" ? item.stock : 12,
    type: item.type || "Jewelry",
    image: primaryImg,
    secondaryImage: secondaryImg,
    images: item.images || [{ src: primaryImg }],
    options: item.options || [],
    addedAt: Date.now(),
  };
};

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
      // Seed with 2 signature jewelry pieces for a stunning initial experience
      if (products && products.length >= 2) {
        const seedItems = [
          formatWishlistProduct(products[0]),
          formatWishlistProduct(products[3] || products[1]),
        ].filter(Boolean);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems));
        } catch {
          // ignore
        }
        return seedItems;
      }
    } catch (e) {
      console.warn("Failed to read wishlist from localStorage:", e);
    }
    return [];
  });

  // Persist to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
      window.dispatchEvent(
        new CustomEvent("jelwo_wishlist_change", { detail: wishlist })
      );
    } catch (e) {
      console.warn("Failed to save wishlist to localStorage:", e);
    }
  }, [wishlist]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setWishlist(updated);
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isInWishlist = useCallback(
    (idOrSlug) => {
      if (!idOrSlug) return false;
      const target = String(idOrSlug).toLowerCase();
      return wishlist.some(
        (item) =>
          String(item.id).toLowerCase() === target ||
          String(item.slug).toLowerCase() === target
      );
    },
    [wishlist]
  );

  const addToWishlist = useCallback((product) => {
    if (!product) return;
    const formatted = formatWishlistProduct(product);
    if (!formatted) return;

    setWishlist((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === formatted.id ||
          (item.slug && formatted.slug && item.slug === formatted.slug)
      );
      if (exists) return prev;
      return [formatted, ...prev];
    });
  }, []);

  const removeFromWishlist = useCallback((idOrSlug) => {
    if (!idOrSlug) return;
    const target = String(idOrSlug).toLowerCase();
    setWishlist((prev) =>
      prev.filter(
        (item) =>
          String(item.id).toLowerCase() !== target &&
          String(item.slug).toLowerCase() !== target
      )
    );
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      if (!product) return false;
      const idOrSlug = product.slug || product.id;
      if (isInWishlist(idOrSlug)) {
        removeFromWishlist(idOrSlug);
        return false;
      } else {
        addToWishlist(product);
        return true;
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    }),
    [
      wishlist,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
