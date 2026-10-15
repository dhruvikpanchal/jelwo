import { useState, useEffect, useCallback, useMemo } from "react";
import { CartContext } from "./cartCore";
import defaultRingImg from "@/assets/images/products/diamond-rings/jewelry-pro-26.webp";

const CART_STORAGE_KEY = "jelwo_cart_items";
const INSTRUCTIONS_STORAGE_KEY = "jelwo_cart_special_instructions";
const FREE_SHIPPING_THRESHOLD = 100.0;

export function CartProvider({ children }) {
  // 1. Cart Items (strictly user-selected items, default empty)
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out any legacy seed item if present
          return parsed.filter(
            (it) => it.id !== "cart-seed-diamond-rashmi-ring"
          );
        }
      }
      return [];
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
      return [];
    }
  });

  // 2. Drawer open/close state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Special order notes / instructions
  const [specialInstructions, setSpecialInstructionsState] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(INSTRUCTIONS_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  // Persist items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save cart to localStorage:", e);
    }
  }, [items]);

  // Persist special instructions
  const setSpecialInstructions = useCallback((text) => {
    setSpecialInstructionsState(text);
    try {
      localStorage.setItem(INSTRUCTIONS_STORAGE_KEY, text);
    } catch {
      // ignore
    }
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  // Add to cart method
  const addToCart = useCallback((product, quantity = 1, options = {}) => {
    if (!product) return;

    const itemPrice = typeof product.price === "string" ? parseFloat(product.price) || 0 : product.price || 0;
    const comparePrice = typeof product.comparePrice === "string" ? parseFloat(product.comparePrice) || null : product.comparePrice || null;
    const itemSize = options.size || product.size || "";
    const itemColor = options.color || product.color || "";
    const itemTitle = product.title || product.name || "Fine Jewelry Piece";
    const itemImage = product.image || product.images?.[0]?.src || product.images?.[0] || defaultRingImg;
    const itemSlug = product.slug || "";
    const productId = product.id || product.slug || "product";

    // Unique key for the cart line item based on product ID and variant attributes
    const cartItemId = `${productId}-${itemSize || "nosize"}-${itemColor || "nocolor"}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === cartItemId);

      if (existingIndex > -1) {
        const next = [...prevItems];
        const existing = next[existingIndex];
        next[existingIndex] = {
          ...existing,
          quantity: existing.quantity + (quantity > 0 ? quantity : 1),
        };
        return next;
      }

      const newItem = {
        id: cartItemId,
        productId,
        slug: itemSlug,
        title: itemTitle,
        price: itemPrice,
        comparePrice,
        size: itemSize,
        color: itemColor,
        image: itemImage,
        quantity: quantity > 0 ? quantity : 1,
      };

      return [newItem, ...prevItems];
    });

    // Automatically slide open the cart drawer to delight user
    setIsCartOpen(true);
  }, []);

  // Remove item
  const removeFromCart = useCallback((cartItemId) => {
    setItems((prev) => prev.filter((it) => it.id !== cartItemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((cartItemId, newQty) => {
    setItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((it) => it.id !== cartItemId);
      }
      return prev.map((it) => (it.id === cartItemId ? { ...it, quantity: newQty } : it));
    });
  }, []);

  // Clear all
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Subtotal calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 1), 0);
  }, [items]);

  const totalCount = useMemo(() => {
    return items.reduce((sum, it) => sum + (it.quantity || 1), 0);
  }, [items]);

  const shippingDifference = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const shippingProgress = useMemo(() => {
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [subtotal]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const value = useMemo(
    () => ({
      items,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      specialInstructions,
      setSpecialInstructions,
      subtotal,
      totalCount,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      shippingDifference,
      shippingProgress,
      isFreeShipping,
    }),
    [
      items,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      specialInstructions,
      setSpecialInstructions,
      subtotal,
      totalCount,
      shippingDifference,
      shippingProgress,
      isFreeShipping,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
