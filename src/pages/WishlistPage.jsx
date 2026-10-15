import { useState, useMemo, lazy, Suspense, useEffect } from "react";
import PageBanner from "@/components/common/PageBanner";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "@/hooks/useRouter";
import { useCart } from "@/hooks/useCart";
import { products as allProducts } from "@/data/productsData";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";
import {
  Heart,
  ShoppingBag,
  Trash2,
  Eye,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";

// Lazy-loaded modal to avoid bundle bloat
const QuickViewModal = lazy(() => import("@/components/product/QuickViewModal"));

export default function WishlistPage({ onNavigateHome }) {
  const { wishlist, removeFromWishlist, clearWishlist, addToWishlist, isInWishlist } = useWishlist();
  const { navigate } = useRouter();
  const { addToCart } = useCart();

  const [sortBy, setSortBy] = useState("recent"); // "recent" | "price-asc" | "price-desc" | "name"
  const [toastMessage, setToastMessage] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  // Sort wishlist items
  const sortedWishlist = useMemo(() => {
    const list = [...wishlist];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
      case "price-desc":
        return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
      case "name":
        return list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "recent":
      default:
        return list.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    }
  }, [wishlist, sortBy]);

  // Recommended products for empty state or footer upsell
  const recommendedProducts = useMemo(() => {
    return allProducts.slice(0, 4);
  }, []);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(
      {
        id: item.id || item.slug,
        productId: item.id,
        title: item.name || item.title,
        price: item.price,
        comparePrice: item.comparePrice,
        size: item.options?.find?.((o) => o.name === "Size")?.values?.[0] || "",
        color: item.options?.find?.((o) => o.name === "Color")?.values?.[0] || "",
        image: item.image || item.images?.[0]?.src,
        slug: item.slug,
      },
      1
    );
    showToast(`Added "${item.name}" to shopping bag!`);
  };

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      addToCart(
        {
          id: item.id || item.slug,
          productId: item.id,
          title: item.name || item.title,
          price: item.price,
          comparePrice: item.comparePrice,
          size: item.options?.find?.((o) => o.name === "Size")?.values?.[0] || "",
          color: item.options?.find?.((o) => o.name === "Color")?.values?.[0] || "",
          image: item.image || item.images?.[0]?.src,
          slug: item.slug,
        },
        1
      );
    });
    showToast(`All ${wishlist.length} saved pieces added to your shopping bag!`);
  };

  const handleRemove = (e, idOrSlug, name) => {
    e.stopPropagation();
    removeFromWishlist(idOrSlug);
    showToast(`Removed "${name}" from wishlist`);
  };

  const handleClearAll = () => {
    clearWishlist();
    setShowClearConfirm(false);
    showToast("Wishlist has been cleared");
  };

  const openQuickView = (e, prod) => {
    e.stopPropagation();
    setQuickViewProduct(prod);
    setQuickViewSize(prod.options?.find((o) => o.name === "Size")?.values?.[0] || "");
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#1c1b1b] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b1b] text-white px-5 py-3.5 rounded-xs shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 border border-white/10 max-w-sm">
          <div className="w-6 h-6 rounded-full bg-[#ca7b64] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            {toastMessage}
          </span>
          <button
            type="button"
            onClick={() => setToastMessage("")}
            className="text-gray-400 hover:text-white font-bold ml-auto cursor-pointer"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Reusable Top Banner Section */}
      <PageBanner
        title="Wishlist"
        breadcrumb="WISHLIST"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Wishlist Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
        {wishlist.length > 0 ? (
          <div>
            {/* Top Toolbar / Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#e5e5e5]">
              {/* Left Title & Count */}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1b1b] font-normal tracking-tight">
                    My Saved Jewelry
                  </h2>
                  <span className="px-3 py-0.5 text-xs font-semibold bg-[#faf7f2] text-[#ca7b64] border border-[#e5e5e5] rounded-xs">
                    {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#717171] mt-1 font-normal">
                  Handpicked favorites saved for your bespoke styling and special occasions.
                </p>
              </div>

              {/* Right Action Buttons & Sorting */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Sort Dropdown */}
                <div className="relative inline-flex items-center">
                  <span className="text-xs text-[#717171] mr-2 hidden sm:inline">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-[#faf7f2] hover:bg-[#f5eee6] border border-[#e5e5e5] text-xs font-medium text-[#1c1b1b] pl-3 pr-8 py-2 rounded-xs outline-none focus:border-[#ca7b64] cursor-pointer transition-colors"
                      aria-label="Sort wishlist items"
                    >
                      <option value="recent">Recently Added</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Product Name (A-Z)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Add All to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#ca7b64] hover:bg-[#1c1b1b] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-2xs group"
                >
                  <ShoppingBag className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span>Add All to Bag</span>
                </button>

                {/* Clear Wishlist Button with Confirm Modal / State */}
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 border border-[#e5e5e5] hover:border-red-400 text-xs font-semibold text-[#717171] hover:text-red-600 bg-white hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                  title="Remove all saved items"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Clear All Confirmation Dialog */}
            {showClearConfirm && (
              <div className="mb-8 p-4 sm:p-5 bg-[#faf7f2] border border-[#e5e5e5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#1c1b1b]">
                      Are you sure you want to clear your wishlist?
                    </h4>
                    <p className="text-xs text-[#717171]">
                      This will remove all {wishlist.length} saved jewelry pieces from this device.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-3.5 py-1.5 border border-[#e5e5e5] bg-white text-xs font-medium text-[#1c1b1b] hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Yes, Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist Grid */}
            <Stagger staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {sortedWishlist.map((item) => {
                const itemImg = item.image || item.images?.[0]?.src || "";
                const hasDiscount = item.comparePrice && item.comparePrice > item.price;
                const discountPercent = hasDiscount
                  ? Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
                  : 0;

                return (
                  <StaggerItem key={item.id} direction="up" distance={20}>
                    <div className="group bg-white border border-[#e8e4df] hover:border-[#ca7b64]/50 rounded-xs flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative overflow-hidden h-full">
                    {/* Top Badges & Delete Button */}
                    <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                      {/* Sale Badge / Stock Badge */}
                      <div className="flex flex-col gap-1 pointer-events-auto">
                        {hasDiscount && (
                          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#ca7b64] text-white rounded-xs shadow-2xs">
                            -{discountPercent}%
                          </span>
                        )}
                        <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-white/95 text-emerald-700 border border-emerald-300 backdrop-blur-xs rounded-xs shadow-2xs">
                          In Stock
                        </span>
                      </div>

                      {/* Remove from Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => handleRemove(e, item.id || item.slug, item.name)}
                        className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 hover:bg-red-600 hover:text-white text-[#717171] border border-[#e5e5e5] shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer group/btn"
                        title="Remove from Wishlist"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>

                    {/* Product Image Area */}
                    <div
                      onClick={() => navigate(`/products/${item.slug}`)}
                      className="relative w-full aspect-square bg-[#faf7f2] overflow-hidden cursor-pointer flex items-center justify-center p-6"
                    >
                      <img
                        src={itemImg}
                        alt={item.name}
                        width={600}
                        height={600}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Quick View Hover Button */}
                      <button
                        type="button"
                        onClick={(e) => openQuickView(e, item)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 px-3.5 py-1.5 bg-white/95 hover:bg-[#ca7b64] hover:text-white text-[#1c1b1b] text-xs font-semibold tracking-wider uppercase rounded-xs shadow-md border border-gray-200 flex items-center gap-1.5 cursor-pointer backdrop-blur-xs active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Product Details & Actions */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        {/* Subtitle / Category */}
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#999999] block mb-1">
                          {item.type || "Fine Jewelry"}
                        </span>

                        {/* Title */}
                        <h3 className="font-serif text-base sm:text-lg text-[#1c1b1b] group-hover:text-[#ca7b64] transition-colors leading-snug font-normal line-clamp-1 mb-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/products/${item.slug}`)}
                            className="text-left hover:underline cursor-pointer"
                          >
                            {item.name}
                          </button>
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-serif text-base sm:text-lg font-medium text-[#1c1b1b]">
                            ₹{Number(item.price).toLocaleString("en-IN")}.00
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-[#999999] line-through font-normal">
                              ₹{Number(item.comparePrice).toLocaleString("en-IN")}.00
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-2 border-t border-[#f0ece6] flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, item)}
                          className="flex-1 py-2.5 bg-[#ca7b64] hover:bg-[#1c1b1b] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/products/${item.slug}`)}
                          className="px-3 py-2.5 border border-[#e5e5e5] hover:border-[#ca7b64] text-[#1c1b1b] hover:text-[#ca7b64] text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                          title="View product details"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
            </Stagger>

            {/* Bottom Continued Shopping & Luxury Value Props */}
            <Reveal direction="up" delay={0.06}>
              <div className="mt-14 pt-10 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1b1b] hover:text-[#ca7b64] transition-colors cursor-pointer group"
                >
                  <span>Continue Shopping Collections</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-6 text-xs text-[#717171]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#ca7b64]" /> Certified Authenticity
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#ca7b64]" /> Free Insured Delivery
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-[#ca7b64]" /> 30-Day Returns
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          /* =========================================================
              EMPTY WISHLIST STATE
          ========================================================= */
          <div className="py-8 sm:py-12">
            <Reveal direction="up" duration={0.6}>
              <div className="max-w-xl mx-auto text-center py-12 sm:py-16 px-6 bg-[#faf7f2] border border-[#e8e4df] rounded-xs shadow-2xs">
                {/* Ornate Heart Icon Badge */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white border border-[#ca7b64]/30 text-[#ca7b64] mx-auto flex items-center justify-center mb-6 shadow-sm ring-8 ring-[#ca7b64]/5">
                  <Heart className="w-9 h-9 stroke-[1.4] fill-[#ca7b64]/10" />
                </div>

                {/* Empty Headline */}
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1b1b] font-normal tracking-tight mb-3">
                  Your Wishlist is Empty
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#717171] leading-relaxed max-w-md mx-auto mb-8 font-normal">
                  You haven&apos;t saved any jewelry pieces yet. Explore our handcrafted collections of rings, necklaces, bracelets, and earrings to curate your personal favorites.
                </p>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ca7b64] hover:bg-[#1c1b1b] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors duration-300 cursor-pointer shadow-md group"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>

            {/* Curated Recommendations for Empty State */}
            <div className="mt-16 sm:mt-20">
              <Reveal direction="up" delay={0.05}>
                <div className="text-center mb-8 sm:mb-10">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#ca7b64] uppercase block mb-1">
                    CURATED FOR YOU
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1b1b] font-normal">
                    Trending Jewelry You Might Love
                  </h3>
                </div>
              </Reveal>

              <Stagger staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {recommendedProducts.map((prod) => {
                  const prodImg = prod.images?.[0]?.src || prod.image || "";
                  const wishlisted = isInWishlist(prod.slug || prod.id);

                  return (
                    <StaggerItem key={prod.id} direction="up" distance={20}>
                      <div className="group bg-white border border-[#e8e4df] hover:border-[#ca7b64]/40 rounded-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md relative overflow-hidden h-full">
                      {/* Top Wishlist Toggle Button */}
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          type="button"
                          onClick={() => {
                            addToWishlist(prod);
                            showToast(`Saved "${prod.name}" to your wishlist!`);
                          }}
                          className={`w-8 h-8 rounded-full border shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            wishlisted
                              ? "bg-[#ca7b64] text-white border-[#ca7b64]"
                              : "bg-white/90 text-[#717171] hover:text-[#ca7b64] border-gray-200 hover:bg-white"
                          }`}
                          title={wishlisted ? "Already in Wishlist" : "Save to Wishlist"}
                          aria-label="Toggle Wishlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              wishlisted ? "fill-white stroke-white" : "stroke-[1.6]"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Image Preview */}
                      <div
                        onClick={() => navigate(`/products/${prod.slug}`)}
                        className="relative w-full aspect-square bg-[#faf7f2] overflow-hidden cursor-pointer flex items-center justify-center p-6"
                      >
                        <img
                          src={prodImg}
                          alt={prod.name}
                          width={600}
                          height={600}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Info & CTA */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#999999] block mb-1">
                            {prod.type || "Fine Jewelry"}
                          </span>
                          <h4 className="font-serif text-sm sm:text-base text-[#1c1b1b] group-hover:text-[#ca7b64] transition-colors line-clamp-1 mb-2 font-normal">
                            <button
                              type="button"
                              onClick={() => navigate(`/products/${prod.slug}`)}
                              className="text-left hover:underline cursor-pointer"
                            >
                              {prod.name}
                            </button>
                          </h4>
                          <span className="font-serif text-base font-medium text-[#1c1b1b]">
                            ₹{Number(prod.price).toLocaleString("en-IN")}.00
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#f0ece6] flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              addToWishlist(prod);
                              showToast(`Saved "${prod.name}" to your wishlist!`);
                            }}
                            className="flex-1 py-2 bg-[#faf7f2] hover:bg-[#ca7b64] text-[#1c1b1b] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
                          >
                            {wishlisted ? "In Wishlist" : "Save Item"}
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/products/${prod.slug}`)}
                            className="px-3 py-2 border border-[#e5e5e5] text-xs text-[#717171] hover:text-[#1c1b1b] rounded-xs transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
              </Stagger>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal (Deferred) */}
      {quickViewProduct && (
        <Suspense fallback={null}>
          <QuickViewModal
            product={quickViewProduct}
            size={quickViewSize}
            onSizeChange={setQuickViewSize}
            onAddToCart={() => {
              addToCart(
                {
                  id: quickViewProduct.id || quickViewProduct.slug,
                  productId: quickViewProduct.id,
                  title: quickViewProduct.name || quickViewProduct.title,
                  price: quickViewProduct.price,
                  comparePrice: quickViewProduct.comparePrice,
                  size: quickViewSize || "",
                  color: "",
                  image: quickViewProduct.image || quickViewProduct.images?.[0]?.src,
                  slug: quickViewProduct.slug,
                },
                1,
                { size: quickViewSize }
              );
              showToast(`Added "${quickViewProduct.name}" to bag!`);
              closeQuickView();
            }}
            onViewDetails={() => {
              closeQuickView();
              navigate(`/products/${quickViewProduct.slug}`);
            }}
            onClose={closeQuickView}
          />
        </Suspense>
      )}
    </div>
  );
}
