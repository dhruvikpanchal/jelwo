import { useState } from "react";
import { Heart, Eye, ShoppingBag, Star, X } from "lucide-react";
import { useRouter } from "@/hooks/useRouter";
import { products, getProductByHandle } from "../../data/productsData";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

export default function ProductSectionFive({ currentProduct, onTriggerToast }) {
  const { navigate } = useRouter();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Quick view modal states
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalSelectedSize, setModalSelectedSize] = useState("");

  // Filter 4 recommended products (prefer the 4 from user's screenshot: diamond-rings, drop-earrings, floral-gold-bangle, flower-jhumka)
  const recommendedHandles = [
    "diamond-rings",
    "drop-earrings",
    "floral-gold-bangle",
    "flower-jhumka",
  ];

  const recommendedItems = recommendedHandles
    .map((handle) => getProductByHandle(handle))
    .filter(Boolean);

  // Fallback if needed
  const displayProducts =
    recommendedItems.length === 4
      ? recommendedItems
      : products.filter((p) => p.slug !== currentProduct?.slug).slice(0, 4);

  const handleToggleWishlist = (item) => {
    const nowWishlisted = toggleWishlist(item);
    onTriggerToast?.(
      nowWishlisted
        ? `Added "${item.name}" to wishlist`
        : `Removed "${item.name}" from wishlist`
    );
  };

  const handleAddToCart = (item) => {
    addToCart(
      {
        id: item.id || item.slug,
        productId: item.id,
        title: item.name || item.title,
        price: item.price,
        comparePrice: item.comparePrice,
        size: item.options?.Size?.[0] || "",
        color: item.options?.Color?.[0] || "",
        image: item.images?.[0]?.src || item.image,
        slug: item.slug,
      },
      1
    );
    onTriggerToast?.(`Added "${item.name}" to cart`);
  };

  const openQuickView = (item) => {
    setQuickViewProduct(item);
    setModalQuantity(1);
    setModalSelectedSize(item.options?.Size?.[0] || "");
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <section className="w-full bg-cream-light py-14 sm:py-20 md:py-24 font-sans border-t border-gray-200/80 select-text">
      <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#cb765f] text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-2 block">
              YOU MIGHT ALSO LIKE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#1c1b1b] font-normal tracking-tight">
              Recommended product
            </h2>
          </div>
        </Reveal>

        {/* 4 Products Grid matching Screenshot */}
        <Stagger staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {displayProducts.map((item) => {
            const isWishlisted = isInWishlist(item.slug || item.id);
            const mainImg = item.images?.[0]?.src || item.featuredImage;
            const discountLabel = item.discount || (item.discountPercent ? `${item.discountPercent}%` : null);

            // Price formatted string matching Screenshot
            const priceText = item.priceFormatted || `Rs. ${item.price?.toFixed(2) || "10.00"}`;
            const comparePriceText = item.comparePriceFormatted || (item.comparePrice ? `Rs. ${item.comparePrice.toFixed(2)}` : null);
            const showFrom = item.variants?.length > 1;

            return (
              <StaggerItem key={item.id} className="h-full">
                <div
                  className="group bg-white rounded-[1px] border border-gray-200/80 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full"
                >
                  {/* =========================================================
                      MOBILE & TABLET SPECIAL CARD (< 1024px)
                  ========================================================= */}
                  <div className="flex lg:hidden flex-col justify-between h-full bg-white">
                    {/* Top Image Box */}
                    <div className="relative bg-white pt-6 pb-3 px-4 flex items-center justify-center min-h-56 sm:min-h-64 overflow-hidden">
                      {discountLabel && (
                        <span className="absolute top-3 left-3 z-10 bg-discount text-white text-[11px] font-bold px-2 py-0.5 rounded-[1px] leading-tight shadow-2xs">
                          {discountLabel}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate(`/products/${item.slug}`)}
                        className="w-full h-48 sm:h-56 flex items-center justify-center cursor-pointer select-none"
                      >
                        <img
                          src={mainImg}
                          alt={item.name}
                          width={600}
                          height={675}
                          className="max-h-full max-w-full w-auto object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    </div>

                    {/* Middle Info & 3 Action Buttons */}
                    <div className="px-3 sm:px-4 pt-2 pb-3.5 flex flex-col items-center text-center">
                      <button
                        type="button"
                        onClick={() => navigate(`/products/${item.slug}`)}
                        className="text-xs sm:text-[13px] md:text-sm font-bold tracking-wider text-[#1c1b1b] uppercase hover:text-[#cb765f] transition-colors line-clamp-2 cursor-pointer text-center"
                        title={item.name}
                      >
                        {item.name}
                      </button>
                      <p className="text-xs text-[#cb765f] font-normal mt-1">
                        Jewelry
                      </p>

                      {/* 3 Square Action Buttons Row */}
                      <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-3">
                        {/* Wishlist */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleWishlist(item);
                          }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border border-gray-200 bg-white text-gray-600 hover:text-white hover:bg-[#cb765f] hover:border-[#cb765f] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
                          title="Add to Cart"
                          aria-label="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4 stroke-[1.6]" />
                        </button>

                        {/* Quick View */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openQuickView(item);
                          }}
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
                        {showFrom && !item.name.toLowerCase().includes("bangle") && !item.name.toLowerCase().includes("jhumka") && (
                          <span className="font-normal text-xs text-gray-500">From</span>
                        )}
                        <span>{priceText}</span>
                        {comparePriceText && (
                          <span className="line-through text-gray-400 font-normal text-xs">
                            {comparePriceText}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 font-medium">
                        <Star className="w-3.5 h-3.5 fill-star text-star" />
                        <span>({item.reviews?.average > 0 ? item.reviews.average.toFixed(1) : "0"})</span>
                      </div>
                    </div>
                  </div>

                  {/* =========================================================
                      DESKTOP CARD (>= 1024px)
                  ========================================================= */}
                  <div className="hidden lg:flex flex-col justify-between h-full">
                    {/* Top Image Box */}
                    <div className="relative bg-white pt-8 pb-6 px-4 flex items-center justify-center min-h-65 sm:min-h-72.5 overflow-hidden">
                      {/* Discount Badge on top-left (e.g. 66%, 64%) */}
                      {discountLabel && (
                        <span className="absolute top-3.5 left-3.5 z-10 bg-discount text-white text-[11px] font-semibold px-2 py-0.5 rounded-[1px] tracking-wider leading-none shadow-2xs">
                          {discountLabel}
                        </span>
                      )}

                      {/* Top Right Action Icons (Wishlist & Quick View) */}
                      <div
                        className={`absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20 flex items-center gap-1.5 transition-all duration-300 ${
                          isWishlisted
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleWishlist(item);
                          }}
                          className={`w-8 h-8 rounded-[1px] bg-white/95 backdrop-blur-xs border border-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:border-[#cb765f] active:scale-90 ${
                            isWishlisted
                              ? "text-[#cb765f] border-[#cb765f] bg-[#cb765f]/10"
                              : "text-gray-500 hover:text-[#cb765f]"
                          }`}
                          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                          aria-label="Wishlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isWishlisted ? "fill-[#cb765f] stroke-[#cb765f]" : "stroke-[1.6]"
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openQuickView(item);
                          }}
                          className="w-8 h-8 rounded-[1px] bg-white/95 backdrop-blur-xs border border-gray-200 text-gray-500 hover:text-[#cb765f] hover:border-[#cb765f] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-90"
                          title="Quick View"
                          aria-label="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[1.6]" />
                        </button>
                      </div>

                      {/* Centered Product Image with smooth 3D hover rotation */}
                      <button
                        type="button"
                        onClick={() => navigate(`/products/${item.slug}`)}
                        className="w-full h-52 sm:h-56 flex items-center justify-center cursor-pointer select-none"
                      >
                        <img
                          src={mainImg}
                          alt={item.name}
                          width={600}
                          height={675}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-6"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    </div>

                    {/* Middle Info Row: Title, Category & Add to Cart Button */}
                    <div className="px-4 sm:px-5 pt-3.5 pb-2.5 flex items-start justify-between gap-2 bg-white">
                      <div className="flex-1 min-w-0 pr-1">
                        <button
                          type="button"
                          onClick={() => navigate(`/products/${item.slug}`)}
                          className="text-xs sm:text-[13.5px] font-bold tracking-wider text-[#1c1b1b] uppercase group-hover:text-[#cb765f] transition-colors truncate block text-left w-full cursor-pointer"
                          title={item.name}
                        >
                          {item.name}
                        </button>
                        <p className="text-xs text-[#cb765f] font-normal mt-0.5">
                          Jewelry
                        </p>
                      </div>

                      {/* Add to Cart Square Button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="w-8 h-8 shrink-0 bg-white border border-gray-200 text-gray-500 hover:text-white hover:bg-[#cb765f] hover:border-[#cb765f] flex items-center justify-center rounded-[1px] transition-all duration-200 cursor-pointer shadow-2xs"
                        title="Add to Cart"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[1.7]" />
                      </button>
                    </div>

                    {/* Bottom Row: Price & Star Rating */}
                    <div className="px-4 sm:px-5 pb-4 pt-1.5 flex items-center justify-between border-t border-gray-100 bg-white text-xs text-gray-600">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-semibold text-[#1c1b1b]">
                          {showFrom && !item.name.toLowerCase().includes("bangle") && !item.name.toLowerCase().includes("jhumka")
                            ? `From ${priceText}`
                            : priceText}
                        </span>
                        {comparePriceText && (
                          <span className="text-gray-400 line-through text-[11px]">
                            {comparePriceText}
                          </span>
                        )}
                      </div>

                      {/* Rating display e.g. ★ (0) or ★ (4.0) */}
                      <div className="flex items-center gap-1 text-[#e59819] text-[11px] font-medium">
                        <Star className="w-3 h-3 fill-[#e59819] text-[#e59819]" />
                        <span className="text-gray-500">
                          ({item.reviews?.average > 0 ? item.reviews.average.toFixed(1) : "0"})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>

      {/* ------------------------------------------------------------- */}
      {/* Interactive Quick View Modal */}
      {/* ------------------------------------------------------------- */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xs shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Product Image */}
              <div className="bg-cream-light p-6 rounded-xs flex items-center justify-center border border-gray-100">
                <img
                  src={quickViewProduct.images?.[0]?.src || quickViewProduct.featuredImage}
                  alt={quickViewProduct.name}
                  width={600}
                  height={675}
                  className="max-h-64 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Product Quick Details */}
              <div className="space-y-4 text-left">
                <h3 className="font-serif text-2xl text-[#1c1b1b]">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-lg text-[#1c1b1b]">
                    {quickViewProduct.priceFormatted || `Rs. ${quickViewProduct.price?.toFixed(2)}`}
                  </span>
                  {quickViewProduct.comparePrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {quickViewProduct.comparePriceFormatted || `Rs. ${quickViewProduct.comparePrice?.toFixed(2)}`}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {quickViewProduct.description?.text ||
                    "Care for fiber: 30% more recycled polyester. Environmentally friendly fine craftsmanship."}
                </p>

                {/* Size options if available */}
                {quickViewProduct.options?.Size?.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                      Size: {modalSelectedSize}
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {quickViewProduct.options.Size.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setModalSelectedSize(sz)}
                          className={`px-3 py-1.5 text-xs font-medium border rounded-[1px] transition-colors cursor-pointer ${
                            modalSelectedSize === sz
                              ? "bg-[#1c1b1b] text-white border-[#1c1b1b]"
                              : "border-gray-300 text-gray-700 hover:border-black"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-gray-300 rounded-[1px]">
                    <button
                      type="button"
                      onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold">{modalQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setModalQuantity((q) => q + 1)}
                      className="px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      closeQuickView();
                    }}
                    className="flex-1 py-2.5 bg-[#cb765f] hover:bg-[#1c1b1b] text-white font-bold text-xs uppercase tracking-wider rounded-[1px] transition-colors cursor-pointer text-center"
                  >
                    Add to Cart
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      closeQuickView();
                      navigate(`/products/${quickViewProduct.slug}`);
                    }}
                    className="text-xs text-[#cb765f] underline hover:text-black font-medium"
                  >
                    View Full Product Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
