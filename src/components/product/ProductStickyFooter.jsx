import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";

/**
 * ProductStickyFooter Component
 * Displays a sticky bottom bar with product image, title, variant select dropdown, quantity stepper, and "ADD TO CART" button.
 * Only appears after scrolling past Section 1, and hides when reaching near the page end (Footer).
 */
export default function ProductStickyFooter({ product, onTriggerToast }) {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [userSelectedVariantId, setUserSelectedVariantId] = useState(null);

  // Derive current active variant without triggering cascading renders in an effect
  const selectedVariantId =
    userSelectedVariantId && product?.variants?.some((v) => v.id === userSelectedVariantId)
      ? userSelectedVariantId
      : product?.variants?.[0]?.id || null;

  const currentVariant =
    product?.variants?.find((v) => v.id === selectedVariantId) ||
    product?.variants?.[0] ||
    null;

  const mainImg = product?.images?.[0]?.src || product?.featuredImage;

  // Scroll listener to show after Section 1 and hide near footer / page end
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling past section 1 (~620px)
      const passedSectionOne = scrollY > 620;

      // Hide when near bottom footer (~380px before page end)
      const nearPageEnd = documentHeight - (scrollY + windowHeight) < 380;

      if (passedSectionOne && !nearPageEnd) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(
      {
        id: currentVariant?.id || product?.id,
        productId: product?.id,
        title: product?.name || product?.title,
        price: currentVariant?.price ?? product?.price,
        comparePrice: currentVariant?.comparePrice ?? product?.comparePrice,
        size: currentVariant?.size || "",
        color: currentVariant?.color || "",
        image: currentVariant?.image || mainImg,
        slug: product?.slug,
      },
      quantity,
      {
        size: currentVariant?.size || "",
        color: currentVariant?.color || "",
      }
    );
    const variantTitle = currentVariant?.title ? ` - ${currentVariant.title}` : "";
    onTriggerToast?.(
      `Added ${quantity} × "${product?.name}${variantTitle}" to your cart!`
    );
  };

  if (!product) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/90 shadow-[0_-6px_25px_rgba(0,0,0,0.08)] py-3 px-4 sm:px-6 lg:px-10 transition-transform duration-300 ease-in-out font-sans ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        {/* Left Side: Product Thumbnail + Title */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-[1px] border border-gray-100 flex items-center justify-center p-1 shrink-0">
            <img
              src={mainImg}
              alt={product.name}
              width={1066}
              height={1200}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="font-serif text-sm sm:text-base text-[#1c1b1b] font-normal truncate max-w-50 sm:max-w-xs md:max-w-md">
            {product.name}
          </span>
        </div>

        {/* Right Side: Variant Select + Stepper + ADD TO CART */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Variant Selector Dropdown */}
          {product.variants?.length > 0 && (
            <div className="relative inline-block shrink min-w-0 max-w-32.5 sm:max-w-none">
              <select
                id="sticky-product-variant-select"
                name="sticky_variant"
                aria-label="Select product variant"
                value={selectedVariantId || ""}
                onChange={(e) => setUserSelectedVariantId(Number(e.target.value))}
                className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 text-[11px] sm:text-[13px] text-gray-800 font-normal py-2 sm:py-2.5 pl-2.5 sm:pl-3.5 pr-6 sm:pr-8 rounded-[1px] focus:outline-none focus:border-[#1c1b1b] cursor-pointer transition-colors truncate"
              >
                {product.variants.map((v) => {
                  const priceStr = v.priceFormatted || `Rs. ${v.price?.toFixed(2)}`;
                  const titleStr = v.title || `${v.size || ""} ${v.color || ""}`.trim();
                  return (
                    <option key={v.id} value={v.id}>
                      {titleStr ? `${titleStr} - ${priceStr}` : priceStr}
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center border border-gray-300 rounded-[1px] bg-white h-9 sm:h-9.5 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 sm:w-8 h-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 cursor-pointer select-none transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 sm:w-8 text-center text-xs sm:text-[13px] font-semibold text-[#1c1b1b] select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 sm:w-8 h-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 cursor-pointer select-none transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* ADD TO CART Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 sm:flex-none px-3.5 sm:px-7 h-9 sm:h-9.5 bg-[#1c1b1b] hover:bg-[#cb765f] text-white font-bold text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.14em] uppercase rounded-[1px] transition-colors duration-300 cursor-pointer shadow-xs whitespace-nowrap active:scale-98 flex items-center justify-center"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
