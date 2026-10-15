import { useState, memo } from "react";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { useRouter } from "@/hooks/useRouter";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

function CollectionProductCard({
  product,
  viewMode = "grid",
  onTriggerToast,
  onQuickView,
}) {
  const { navigate } = useRouter();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product?.slug || product?.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product?.images || [];
  const primaryImg = images[0]?.src || product?.image;
  const secondaryImg = images[1]?.src || primaryImg;

  const currentDisplayImg = activeImageIndex === 1 && secondaryImg ? secondaryImg : primaryImg;

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowWishlisted = toggleWishlist(product);
    onTriggerToast?.(
      nowWishlisted
        ? `Added "${product.name}" to wishlist`
        : `Removed "${product.name}" from wishlist`
    );
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    addToCart(
      {
        id: product.id || product.slug,
        productId: product.id,
        title: product.name || product.title,
        price: product.price,
        comparePrice: product.comparePrice,
        size: product.options?.Size?.[0] || "",
        color: product.options?.Color?.[0] || "",
        image: primaryImg,
        slug: product.slug,
      },
      1
    );
    onTriggerToast?.(`Added "${product.name}" to your cart`);
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white border border-gray-200 rounded-xs p-4 flex flex-col sm:flex-row items-center gap-5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      >
        {/* Image Box */}
        <div
          className="relative w-full sm:w-48 aspect-square shrink-0 bg-[#f9f7f4] rounded-xs overflow-hidden flex items-center justify-center p-3"
          onMouseEnter={() => setActiveImageIndex(1)}
          onMouseLeave={() => setActiveImageIndex(0)}
        >
          <img
            src={currentDisplayImg}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          {product.showSaleLabel && (
            <span className="absolute top-2.5 left-2.5 bg-[#cb765f] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              SALE
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-amber-500 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
            <span className="text-gray-400 text-xs ml-1">
              ({product.reviews?.count || 5})
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif text-[#1c1b1b] font-normal group-hover:text-[#cb765f] transition-colors mb-1.5">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {product.shortDescription ||
              "Elegantly crafted fine jewelry showcasing exquisite craftsmanship and timeless beauty."}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-4">
            <span className="text-base font-bold text-[#cb765f]">
              Rs. {Number(product.price).toFixed(2)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {Number(product.comparePrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <button
              type="button"
              onClick={handleAddToCartClick}
              className="px-4 py-2 bg-[#1c1b1b] hover:bg-[#cb765f] text-white text-xs font-medium uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="p-2 border border-gray-200 hover:border-[#1c1b1b] rounded-xs text-gray-600 hover:text-[#1c1b1b] transition-colors cursor-pointer"
              title="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleWishlistClick}
              className={`p-2 border border-gray-200 hover:border-[#cb765f] rounded-xs transition-colors cursor-pointer ${
                isWishlisted
                  ? "bg-[#cb765f] border-[#cb765f] text-white"
                  : "text-gray-600 hover:text-[#cb765f]"
              }`}
              title="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-200/80 rounded-xs hover:shadow-xl transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full overflow-hidden"
    >
      {/* =========================================================
          MOBILE & TABLET SPECIAL CARD (< 1024px)
      ========================================================= */}
      <div className="flex lg:hidden flex-col justify-between h-full bg-white">
        {/* Top Image Box */}
        <div className="relative bg-white pt-6 pb-3 px-4 flex items-center justify-center min-h-52 sm:min-h-60 overflow-hidden">
          {/* Discount Badge */}
          {(product.discountPercent > 0 || (product.comparePrice && Number(product.comparePrice) > Number(product.price))) && (
            <span className="absolute top-3 left-3 z-10 bg-discount text-white text-[11px] font-bold px-2 py-0.5 rounded-[1px] leading-tight shadow-2xs">
              {product.discountPercent
                ? `${product.discountPercent}%`
                : `${Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)}%`}
            </span>
          )}

          <div className="w-full h-44 sm:h-52 flex items-center justify-center select-none">
            <img
              src={currentDisplayImg}
              alt={product.name}
              width={600}
              height={600}
              className="max-h-full max-w-full w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Middle Info & 3 Action Buttons */}
        <div className="px-3 sm:px-4 pt-2 pb-3.5 flex flex-col items-center text-center">
          <h3
            className="text-xs sm:text-[13px] md:text-sm font-bold tracking-wider text-[#1c1b1b] uppercase hover:text-[#cb765f] transition-colors line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#cb765f] font-normal mt-1">
            {product.category || "Jewelry"}
          </p>

          {/* 3 Square Action Buttons Row */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-3">
            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlistClick}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs ${
                isWishlisted
                  ? "bg-[#cb765f] text-white border-[#cb765f]"
                  : "bg-white border-gray-200 text-gray-600 hover:text-[#cb765f] hover:border-[#cb765f]"
              }`}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-white stroke-white" : "stroke-[1.6]"
                }`}
              />
            </button>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCartClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border border-gray-200 bg-white text-gray-600 hover:text-white hover:bg-[#cb765f] hover:border-[#cb765f] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.6]" />
            </button>

            {/* Quick View */}
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border border-gray-200 bg-white text-gray-600 hover:text-white hover:bg-[#1c1b1b] hover:border-[#1c1b1b] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4 stroke-[1.6]" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Price & Rating (Centered) */}
        <div className="border-t border-gray-200/80 px-3 py-2.5 sm:py-3 flex flex-col items-center justify-center text-center gap-1 bg-white">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-[13px] md:text-sm text-[#1c1b1b] font-bold tracking-tight">
            {(product.hasFrom || product.variants?.length > 1) && (
              <span className="font-normal text-xs text-gray-500">From</span>
            )}
            <span>Rs. {Number(product.price).toFixed(2)}</span>
            {product.comparePrice && (
              <span className="line-through text-gray-400 font-normal text-xs">
                Rs. {Number(product.comparePrice).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 font-medium">
            <Star className="w-3.5 h-3.5 fill-star text-star" />
            <span>({product.reviews?.count || 0})</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          DESKTOP CARD (>= 1024px)
      ========================================================= */}
      <div className="hidden lg:flex flex-col justify-between h-full p-3 sm:p-4">
        {/* Top badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
          {product.showSaleLabel && (
            <span className="bg-[#cb765f] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-2xs">
              SALE
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#1c1b1b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs shadow-2xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Floating Action Buttons */}
        <div
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 transition-all duration-200 ${
            isWishlisted
              ? "opacity-100 translate-x-0"
              : "opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
          }`}
        >
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
              isWishlisted
                ? "bg-[#cb765f] text-white"
                : "bg-white text-gray-700 hover:bg-[#cb765f] hover:text-white"
            }`}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 ${isWishlisted ? "fill-white" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-8 h-8 rounded-full bg-white text-gray-700 hover:bg-[#1c1b1b] hover:text-white shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-90"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Image Area with hover transition */}
        <div
          className="relative w-full aspect-square bg-[#f9f7f4] rounded-xs overflow-hidden flex items-center justify-center p-4 mb-3.5"
          onMouseEnter={() => setActiveImageIndex(1)}
          onMouseLeave={() => setActiveImageIndex(0)}
        >
          <img
            src={currentDisplayImg}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Star rating */}
            <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-1.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11.5px] font-semibold text-[#1c1b1b]">
                {product.reviews?.average || "5.0"}
              </span>
              <span className="text-gray-400 text-[11px]">
                ({product.reviews?.count || 12})
              </span>
            </div>

            {/* Product Title */}
            <h4 className="text-[13.5px] sm:text-[14px] font-serif text-[#1c1b1b] font-normal group-hover:text-[#cb765f] transition-colors line-clamp-1 mb-1">
              {product.name}
            </h4>

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[13.5px] sm:text-sm font-bold text-[#cb765f]">
                Rs. {Number(product.price).toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-xs text-gray-400 line-through">
                  Rs. {Number(product.comparePrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Add to cart button */}
          <button
            type="button"
            onClick={handleAddToCartClick}
            className="w-full py-2 bg-gray-100 hover:bg-[#1c1b1b] text-gray-800 hover:text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CollectionProductCard);
