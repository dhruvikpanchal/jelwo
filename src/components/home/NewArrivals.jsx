import { useState } from "react";
import { Heart, Eye, ShoppingBag, Star, X, Check } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

import { mockNewArrivals } from "@/data/home/newArrivals";
const productsData = mockNewArrivals;

const tabs = [
  { id: "new", label: "NEW PRODUCT" },
  { id: "trending", label: "TRENDING PRODUCT" },
  { id: "bestseller", label: "BEST SELLER" },
];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("new");
  const { isInWishlist, toggleWishlist: globalToggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [modalThumbIndex, setModalThumbIndex] = useState(0);
  const [modalSize, setModalSize] = useState("20");
  const [modalColor, setModalColor] = useState("Gold");
  const [modalQuantity, setModalQuantity] = useState(1);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const toggleWishlist = (product) => {
    const item = {
      id: product.id,
      name: product.title,
      slug: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: product.price,
      comparePrice: product.comparePrice,
      image: product.image,
    };
    const nowWishlisted = globalToggleWishlist(item);
    triggerToast(
      nowWishlisted
        ? `Added "${product.title}" to wishlist`
        : `Removed "${product.title}" from wishlist`
    );
  };

  const handleAddToCart = (product) => {
    addToCart(
      {
        id: product.id,
        productId: product.id,
        title: product.title,
        price: parseFloat(product.price) || 0,
        comparePrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
        size: modalSize || "20",
        color: modalColor || "Gold",
        image: product.image,
        slug: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      },
      1,
      { size: modalSize || "20", color: modalColor || "Gold" }
    );
    triggerToast(`Added "${product.title}" to cart`);
  };

  const currentProducts = productsData[activeTab] || productsData.new;

  return (
    <section className="w-full bg-[#fbf9f5] section-spacing font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white px-5 py-3 rounded-xs shadow-xl flex items-center gap-3 animate-fade-in border border-border-strong/30">
          <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

      <div className="site-container">
        {/* Section Header */}
        <Reveal direction="up" distance={20}>
          <div className="text-center mb-8 sm:mb-11">
            <span className="text-brand-terracotta text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-2 block">
              NEW ARRIVALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-ink font-normal tracking-tight">
              Great selection
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-5 sm:mt-8">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-[12px] font-semibold tracking-widest sm:tracking-[0.15em] uppercase transition-all duration-300 rounded-[1px] cursor-pointer ${
                      isActive
                        ? "bg-brand-terracotta text-white shadow-xs"
                        : "bg-surface text-ink-muted hover:text-ink hover:bg-cream-card border border-border-soft/60"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 4 Products Responsive Grid */}
        <Stagger
          key={activeTab}
          staggerDelay={0.06}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 xl:gap-8"
        >
          {currentProducts.map((product) => {
            const isWishlisted =
              isInWishlist(product.id) ||
              isInWishlist(product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

            return (
              <StaggerItem
                key={`${activeTab}-${product.id}`}
                direction="up"
                distance={20}
                className="h-full"
              >
                <div className="group bg-surface rounded-xs border border-border-soft hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full">
                  {/* =========================================================
                      MOBILE & TABLET SPECIAL CARD (< 1024px)
                  ========================================================= */}
                  <div className="flex lg:hidden flex-col justify-between h-full bg-white">
                    {/* Top Image Box */}
                    <div className="relative bg-white pt-6 pb-3 px-4 flex items-center justify-center min-h-56 sm:min-h-64 overflow-hidden">
                      {product.discount && (
                        <span className="absolute top-3 left-3 z-10 bg-discount text-white text-[11px] font-bold px-2 py-0.5 rounded-[1px] leading-tight shadow-2xs">
                          {product.discount}
                        </span>
                      )}
                      <a
                        href={`/products/${product.title.toLowerCase().includes("rashmi") ? "diamond-rings" : product.title.toLowerCase().includes("pearl") ? "simple-pearl-earrings" : product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="w-full h-48 sm:h-56 flex items-center justify-center cursor-pointer select-none"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          width={600}
                          height={600}
                          className="max-h-full max-w-full w-auto object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </div>

                    {/* Middle Info & 3 Action Buttons */}
                    <div className="px-3 sm:px-4 pt-2 pb-3.5 flex flex-col items-center text-center">
                      <a
                        href={`/products/${product.title.toLowerCase().includes("rashmi") ? "diamond-rings" : product.title.toLowerCase().includes("pearl") ? "simple-pearl-earrings" : product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="text-xs sm:text-[13px] md:text-sm font-bold tracking-wider text-ink uppercase hover:text-brand-terracotta transition-colors line-clamp-2 block"
                        title={product.title}
                      >
                        {product.title}
                      </a>
                      <p className="text-xs text-brand-terracotta font-normal mt-1">
                        {product.category || "Jewelry"}
                      </p>

                      {/* 3 Square Action Buttons Row */}
                      <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-3">
                        {/* Wishlist */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs ${
                            isWishlisted
                              ? "bg-brand text-white border-brand"
                              : "bg-white border-border-soft text-ink-muted hover:text-brand hover:border-brand"
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
                            handleAddToCart(product);
                          }}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border border-border-soft bg-white text-ink-muted hover:text-white hover:bg-brand-terracotta hover:border-brand-terracotta flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
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
                            setQuickViewProduct(product);
                          }}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-[1px] border border-border-soft bg-white text-ink-muted hover:text-white hover:bg-ink hover:border-ink flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
                          title="Quick View"
                          aria-label="Quick View"
                        >
                          <Eye className="w-4 h-4 stroke-[1.6]" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Price & Rating (Centered) */}
                    <div className="border-t border-border-subtle/80 px-3 py-2.5 sm:py-3 flex flex-col items-center justify-center text-center gap-1 bg-white">
                      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-[13px] md:text-sm text-ink font-bold tracking-tight">
                        {product.hasFrom && (
                          <span className="font-normal text-xs text-ink-muted">From</span>
                        )}
                        <span>Rs. {product.price}</span>
                        {product.originalPrice && (
                          <span className="line-through text-ink-soft text-xs font-normal">
                            Rs. {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-1 text-xs text-ink-muted font-medium">
                        <Star className="w-3.5 h-3.5 fill-star text-star" />
                        <span>({product.rating})</span>
                      </div>
                    </div>
                  </div>

                  {/* =========================================================
                      DESKTOP CARD (>= 1024px)
                  ========================================================= */}
                  <div className="hidden lg:flex flex-col justify-between h-full">
                    {/* Top Image Box */}
                    <div className="relative bg-white pt-6 pb-4 sm:pt-8 sm:pb-6 px-3 sm:px-6 flex items-center justify-center min-h-60 sm:min-h-82.5 md:min-h-87.5 lg:min-h-90 xl:min-h-97.5 overflow-hidden">
                      {/* Discount Badge */}
                      {product.discount && (
                        <span className="absolute top-4 left-4 z-10 bg-discount text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-[1px] tracking-wider leading-none shadow-2xs">
                          {product.discount}
                        </span>
                      )}

                      {/* Top Right Actions (Wishlist & Quick View) */}
                      <div
                        className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
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
                            toggleWishlist(product);
                          }}
                          className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-[1px] bg-surface/95 backdrop-blur-xs border border-border-soft flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:border-brand active:scale-90 ${
                            isWishlisted
                              ? "text-brand border-brand bg-brand-light/30"
                              : "text-ink-muted hover:text-brand"
                          }`}
                          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                          aria-label="Wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isWishlisted ? "fill-brand stroke-brand" : "stroke-[1.6]"
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-[1px] bg-surface/95 backdrop-blur-xs border border-border-soft text-ink-muted hover:text-brand hover:border-brand flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-90"
                          title="Quick View"
                          aria-label="Quick View"
                        >
                          <Eye className="w-4 h-4 stroke-[1.6]" />
                        </button>
                      </div>

                      {/* Centered Large Product Image with 3D Circular In-Place Rotation on Hover */}
                      <a
                        href={`/products/${product.title.toLowerCase().includes("rashmi") ? "diamond-rings" : product.title.toLowerCase().includes("pearl") ? "simple-pearl-earrings" : product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="w-full h-60 sm:h-68 md:h-72 lg:h-76 xl:h-84 flex items-center justify-center select-none"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          width={600}
                          height={600}
                          className="max-h-full max-w-full w-auto object-contain transition-transform duration-600 ease-out transform origin-center group-hover:rotate-24"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </div>

                    {/* Middle Info Area: Title, Category & Cart Button */}
                    <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 flex items-start justify-between gap-3 bg-surface">
                      <div className="flex-1 min-w-0 pr-1">
                        <a
                          href={`/products/${product.title.toLowerCase().includes("rashmi") ? "diamond-rings" : product.title.toLowerCase().includes("pearl") ? "simple-pearl-earrings" : product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-wider text-ink uppercase group-hover:text-brand-terracotta transition-colors truncate block"
                          title={product.title}
                        >
                          {product.title}
                        </a>
                        <p className="text-xs sm:text-[13px] text-brand-terracotta font-normal mt-0.5 sm:mt-1">
                          {product.category}
                        </p>
                      </div>

                      {/* Add to Cart Icon Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-surface border border-border-soft text-ink-muted hover:text-white hover:bg-brand-terracotta hover:border-brand-terracotta flex items-center justify-center rounded-[1px] transition-all duration-200 cursor-pointer shadow-2xs"
                        title="Add to Cart"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[1.7]" />
                      </button>
                    </div>

                    {/* Bottom Row: Price & Rating */}
                    <div className="border-t border-border-subtle/80 px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between bg-surface">
                      <div className="flex items-baseline gap-1 text-[13px] sm:text-[14px] lg:text-[15px] text-ink font-bold tracking-tight">
                        {product.hasFrom && (
                          <span className="font-normal text-xs sm:text-[13px] text-ink-muted mr-0.5">
                            From
                          </span>
                        )}
                        <span>Rs. {product.price}</span>
                        {product.originalPrice && (
                          <span className="line-through text-ink-soft text-xs sm:text-[13px] font-normal ml-1.5 sm:ml-2">
                            Rs. {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-xs sm:text-[13px] text-ink-muted font-medium">
                        <Star className="w-3.5 h-3.5 fill-star text-star" />
                        <span>({product.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Bottom Call to Action: VIEW ALL */}
      <Reveal direction="up" delay={0.1}>
        <div className="text-center mt-12 sm:mt-14">
          <a
            href="/products"
            className="inline-flex items-center justify-center px-9 sm:px-11 py-3.5 sm:py-4 bg-brand-terracotta hover:bg-ink text-white font-sans text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase rounded-[1px] transition-colors duration-300 shadow-sm cursor-pointer"
          >
            VIEW ALL
          </a>
        </div>
      </Reveal>
    </div>

      {/* Quick View Modal matching exact reference layout */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-surface rounded-xs max-w-4xl w-full p-6 sm:p-9 shadow-2xl relative border border-border-soft my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setQuickViewProduct(null);
                setModalThumbIndex(0);
                setModalQuantity(1);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-ink-muted hover:text-ink transition-colors cursor-pointer p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[1.8]" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-10 items-start">
              {/* Left Column: Image & Thumbnail Strip */}
              <div className="flex flex-col items-center">
                {/* Main Product Preview */}
                <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-white p-4">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    width={800}
                    height={800}
                    style={{
                      transform:
                        modalThumbIndex === 0
                          ? "rotate(0deg)"
                          : modalThumbIndex === 1
                          ? "rotate(25deg)"
                          : modalThumbIndex === 2
                          ? "rotate(60deg) scale(0.95)"
                          : modalThumbIndex === 3
                          ? "rotate(-45deg)"
                          : "rotate(90deg) scale(0.9)",
                    }}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* 5 Thumbnails Strip */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 w-full">
                  {[0, 1, 2, 3, 4].map((idx) => {
                    const isSelected = modalThumbIndex === idx;
                    const thumbRotate =
                      idx === 0
                        ? "rotate(0deg)"
                        : idx === 1
                        ? "rotate(25deg)"
                        : idx === 2
                        ? "rotate(60deg) scale(0.95)"
                        : idx === 3
                        ? "rotate(-45deg)"
                        : "rotate(90deg) scale(0.9)";

                    return (
                      <button
                        key={idx}
                        onClick={() => setModalThumbIndex(idx)}
                        className={`w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-white flex items-center justify-center transition-all cursor-pointer rounded-[1px] ${
                          isSelected
                            ? "border border-ink shadow-xs"
                            : "border border-border-soft hover:border-ink-muted opacity-75 hover:opacity-100"
                        }`}
                        title={`View angle ${idx + 1}`}
                      >
                        <img
                          src={quickViewProduct.image}
                          alt=""
                          width={80}
                          height={80}
                          style={{ transform: thumbRotate }}
                          className="max-h-full max-w-full object-contain pointer-events-none"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Details, Selectors & CTAs */}
              <div className="flex flex-col text-left">
                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-[28px] text-ink font-normal leading-snug">
                  {quickViewProduct.title.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                </h3>

                {/* 5 Gold Star Ratings */}
                <div className="flex items-center gap-1 mt-2 text-star">
                  <Star className="w-3.5 h-3.5 fill-star text-star" />
                  <Star className="w-3.5 h-3.5 fill-star text-star" />
                  <Star className="w-3.5 h-3.5 fill-star text-star" />
                  <Star className="w-3.5 h-3.5 fill-star text-star" />
                  <Star className="w-3.5 h-3.5 fill-star text-star" />
                </div>

                {/* Price */}
                <div className="mt-3">
                  <span className="text-2xl sm:text-[28px] font-bold text-brand-terracotta tracking-tight">
                    Rs. {quickViewProduct.price}
                  </span>
                </div>

                {/* Tax Note */}
                <p className="text-[11px] sm:text-xs text-ink-muted mt-0.5">
                  Tax included. Shipping calculated at checkout.
                </p>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mt-3.5 pb-4 border-b border-border-soft">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="text-xs sm:text-[13px] text-ink font-medium">
                    15 in stock
                  </span>
                </div>

                {/* Material / Fiber description */}
                <p className="text-xs sm:text-[13px] text-ink-muted leading-relaxed mt-4">
                  Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.
                </p>

                {/* Size Selector */}
                <div className="mt-5">
                  <span className="text-xs sm:text-[13px] text-ink font-medium block mb-2">
                    Size: <span className="font-normal text-ink-muted">{modalSize}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {["20", "21", "22"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setModalSize(size)}
                        className={`w-10 h-10 text-xs sm:text-[13px] flex items-center justify-center transition-all cursor-pointer rounded-[1px] ${
                          modalSize === size
                            ? "border border-ink font-bold text-ink bg-white shadow-2xs"
                            : "border border-border-soft text-ink-muted hover:border-ink hover:text-ink bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="mt-4">
                  <span className="text-xs sm:text-[13px] text-ink font-medium block mb-2">
                    Color: <span className="font-normal text-ink-muted">{modalColor}</span>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {[
                      { name: "Gold", hex: "#d4af37" },
                      { name: "Rose Gold", hex: "#cb765f" },
                      { name: "Bronze", hex: "#8c4a2a" },
                    ].map((col) => (
                      <button
                        key={col.name}
                        onClick={() => setModalColor(col.name)}
                        style={{ backgroundColor: col.hex }}
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                          modalColor === col.name
                            ? "ring-2 ring-offset-2 ring-ink scale-110"
                            : "opacity-85 hover:opacity-100"
                        }`}
                        title={col.name}
                        aria-label={col.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mt-5">
                  <div className="inline-flex items-center border border-border-soft bg-white rounded-[1px]">
                    <button
                      onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer text-base"
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <span className="w-10 text-center text-xs sm:text-sm font-semibold text-ink select-none">
                      {modalQuantity}
                    </span>
                    <button
                      onClick={() => setModalQuantity((q) => q + 1)}
                      className="w-9 h-9 flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer text-base"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons: ADD TO CART & BUY IT NOW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3.5 px-4 bg-white border border-ink text-ink hover:bg-ink hover:text-white text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase transition-colors rounded-[1px] cursor-pointer text-center"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={() => {
                      triggerToast(`Proceeding to checkout with "${quickViewProduct.title}" (Qty: ${modalQuantity})`);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3.5 px-4 bg-[#222222] hover:bg-brand text-white text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase transition-colors rounded-[1px] cursor-pointer text-center"
                  >
                    BUY IT NOW
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
