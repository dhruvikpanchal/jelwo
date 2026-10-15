import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Truck, Trash2, ChevronDown, ChevronLeft, ChevronRight, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "@/hooks/useRouter";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

// Assets for recommendations matching screenshot
import proRashmiRing from "@/assets/images/products/diamond-rings/jewelry-pro-26.webp";
import proRoseGoldRing from "@/assets/images/home-newArrivals/jewelry-pro-56.webp";
import proPearlEarring from "@/assets/images/home-newArrivals/jewelry-pro-6.webp";
import proNosePin from "@/assets/images/home-newArrivals/jewelry-pro-36.webp";

const RECOMMENDATIONS = [
  {
    id: "rec-rose-gold-rings",
    slug: "rose-gold-rings",
    title: "ROSE GOLD RINGS",
    price: 22.0,
    comparePrice: 40.0,
    size: "28",
    color: "Gold",
    image: proRoseGoldRing,
  },
  {
    id: "rec-simple-pearl-earrings",
    slug: "simple-pearl-earrings",
    title: "SIMPLE PEARL EARRINGS",
    price: 24.0,
    comparePrice: 45.0,
    size: "Standard",
    color: "Gold",
    image: proPearlEarring,
  },
  {
    id: "rec-diamond-rashmi-ring",
    slug: "diamond-rings",
    title: "IAMOND RASHMI RING",
    price: 12.0,
    comparePrice: null,
    size: "20",
    color: "Gold",
    image: proRashmiRing,
  },
  {
    id: "rec-flower-nose-pin",
    slug: "flower-nose-pin",
    title: "FLOWER NOSE PIN",
    price: 12.0,
    comparePrice: null,
    size: "One Size",
    color: "Gold",
    image: proNosePin,
  },
];

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingDifference,
    shippingProgress,
    isFreeShipping,
    specialInstructions,
    setSpecialInstructions,
    addToCart,
  } = useCart();

  const { navigate } = useRouter();

  // Special instructions accordion open/close
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // Recommendations carousel index
  const [recIndex, setRecIndex] = useState(0);

  // Feedback indicator for adding recommended item
  const [addingRecId, setAddingRecId] = useState(null);

  // Checkout toast / alert state
  const [checkoutNotification, setCheckoutNotification] = useState("");

  const drawerRef = useRef(null);

  // Filter recommendations to avoid showing items already in cart
  const availableRecommendations = useMemo(() => {
    return RECOMMENDATIONS.filter(
      (rec) => !items.some((item) => item.slug === rec.slug || item.title === rec.title)
    ).concat(RECOMMENDATIONS); // fallback loop
  }, [items]);

  const currentRec = availableRecommendations[recIndex % availableRecommendations.length];

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          closeCart();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isCartOpen, closeCart]);

  const handlePrevRec = () => {
    setRecIndex((prev) => (prev > 0 ? prev - 1 : availableRecommendations.length - 1));
  };

  const handleNextRec = () => {
    setRecIndex((prev) => (prev + 1) % availableRecommendations.length);
  };

  const handleAddRecommendation = (rec) => {
    setAddingRecId(rec.id);
    addToCart(rec, 1, { size: rec.size, color: rec.color });
    setTimeout(() => {
      setAddingRecId(null);
    }, 600);
  };

  const handleViewCart = () => {
    closeCart();
    navigate("/cart");
  };

  const handleCheckout = () => {
    setCheckoutNotification("Redirecting to secure Shopify checkout...");
    setTimeout(() => {
      setCheckoutNotification("");
      closeCart();
      navigate("/shop");
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-10000 overflow-hidden select-text font-sans">
          {/* 1. Backdrop Overlay with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeCart}
            aria-label="Close cart overlay"
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          {/* 2. Slide-out Drawer Container anchored firmly to Right Side */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pointer-events-none">
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: [0.22, 1, 0.36, 1], // Fluid luxury ease curve
                duration: 0.38,
              }}
              className="pointer-events-auto w-screen max-w-full sm:max-w-110 md:max-w-117.5 lg:max-w-122.5 bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#eae7e1]"
            >
              {/* TOP PROMOTIONAL BANNER */}
              <div className="bg-cream-light border-b border-[#eee9e0] py-2.5 px-4 text-center shrink-0">
                <p className="text-[12px] sm:text-[13px] text-[#333333] tracking-wide">
                  New customers save 10% with code{" "}
                  <span className="font-bold text-[#1c1b1b] tracking-wider">
                    WELCOME10
                  </span>
                </p>
              </div>

              {/* DRAWER HEADER */}
              <div className="px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-della text-[20px] sm:text-[22px] font-normal text-[#1c1b1b] tracking-tight">
                    My shopping cart
                  </h2>
                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label="Close cart"
                    className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 stroke-[1.75]" />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="mt-3">
                  <p className="text-xs sm:text-[13px] text-gray-700 font-normal">
                    {isFreeShipping ? (
                      <span className="text-[#3b7a57] font-medium flex items-center gap-1.5">
                        <span>✨</span> Congratulations! You have unlocked Free Shipping!
                      </span>
                    ) : (
                      <>
                        Spend{" "}
                        <span className="font-semibold text-[#1c1b1b]">
                          Rs. {shippingDifference.toFixed(2)}
                        </span>{" "}
                        more and get free shipping!
                      </>
                    )}
                  </p>

                  {/* Progress Track & Animated Truck Badge */}
                  <div className="relative mt-2.5 mb-1.5 h-1.5 w-full bg-[#ece7e1] rounded-full overflow-visible">
                    <div
                      className="h-full bg-[#ca7b64] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${shippingProgress}%` }}
                    />
                    {/* Floating circular truck icon on the bar */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6.5 h-6.5 rounded-full bg-[#ca7b64] text-white flex items-center justify-center shadow-md transition-all duration-500 ease-out"
                      style={{
                        left: `${Math.min(96, Math.max(4, shippingProgress))}%`,
                      }}
                      title={`${shippingProgress}% towards free shipping`}
                    >
                      <Truck className="w-3.5 h-3.5 fill-white stroke-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SCROLLABLE MAIN CONTENT (ITEMS + UPSELL + SPECIAL INSTRUCTIONS) */}
              <div className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-gray-100 scrollbar-thin">
                {items.length === 0 ? (
                  /* Empty Cart View */
                  <Reveal direction="up" distance={16} className="py-16 px-4 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#faf7f4] flex items-center justify-center mb-4 text-[#ca7b64]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="font-della text-lg font-normal text-[#1c1b1b] mb-1.5">
                      Your shopping bag is empty
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-65 mb-6">
                      Explore our handcrafted fine jewelry collections and find something extraordinary.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        closeCart();
                        navigate("/collections");
                      }}
                      className="px-6 py-3 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer rounded-none flex items-center gap-2"
                    >
                      <span>Explore Collections</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Reveal>
                ) : (
                  /* List of Cart Items */
                  <Stagger staggerDelay={0.05} className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <StaggerItem key={item.id} direction="up" distance={12}>
                        <div className="py-4 flex gap-4 items-start group">
                          {/* Square Thumbnail */}
                          <div className="w-20 h-20 sm:w-22 sm:h-22 bg-white border border-gray-200 rounded-xs flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              width={88}
                              height={88}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h4
                              onClick={() => {
                                closeCart();
                                if (item.slug) navigate(`/products/${item.slug}`);
                              }}
                              className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#1c1b1b] hover:text-[#ca7b64] transition-colors truncate cursor-pointer"
                              title={item.title}
                            >
                              {item.title}
                            </h4>

                            {/* Price */}
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-semibold text-[#1c1b1b]">
                                Rs. {Number(item.price).toFixed(2)}
                              </span>
                              {item.comparePrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  Rs. {Number(item.comparePrice).toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Variant Options: Size & Color */}
                            <div className="mt-1 space-y-0.5 text-xs text-gray-600 font-normal">
                              {item.size && (
                                <p>
                                  <span className="font-medium text-gray-700">Size:</span> {item.size},
                                </p>
                              )}
                              {item.color && (
                                <p>
                                  <span className="font-medium text-gray-700">Color:</span> {item.color}
                                </p>
                              )}
                            </div>

                            {/* Stepper + Delete Action Row */}
                            <div className="mt-3 flex items-center gap-3">
                              {/* Quantity Stepper [ - 1 + ] */}
                              <div className="inline-flex items-center border border-gray-200 rounded-xs bg-white h-7.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                  className="w-7 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer select-none"
                                >
                                  <Minus className="w-3 h-3 stroke-2" />
                                </button>
                                <span className="w-8 text-center text-xs font-semibold text-gray-900 select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                  className="w-7 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer select-none"
                                >
                                  <Plus className="w-3 h-3 stroke-2" />
                                </button>
                              </div>

                              {/* Trash Icon Button */}
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Remove item"
                                className="text-gray-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4 stroke-[1.6]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}

                {/* "YOU MIGHT ALSO LIKE" CROSS-SELL / RECOMMENDATION SECTION */}
                {currentRec && (
                  <Reveal direction="up" distance={14} className="py-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-della text-base text-[#1c1b1b] font-normal">
                        You might also like
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevRec}
                          aria-label="Previous recommendation"
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black transition cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4 stroke-2" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextRec}
                          aria-label="Next recommendation"
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black transition cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4 stroke-2" />
                        </button>
                      </div>
                    </div>

                    {/* Recommendation Card */}
                    <div className="bg-[#faf9f7] border border-[#f0ece5] rounded-xs p-3 flex items-center justify-between gap-3 group transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 bg-white border border-gray-200 rounded-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                          <img
                            src={currentRec.image}
                            alt={currentRec.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        {/* Title & Pricing */}
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1c1b1b] truncate">
                            {currentRec.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#ca7b64]">
                              Rs. {currentRec.price.toFixed(2)}
                            </span>
                            {currentRec.comparePrice && (
                              <span className="text-[11px] text-gray-400 line-through">
                                Rs. {currentRec.comparePrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        type="button"
                        onClick={() => handleAddRecommendation(currentRec)}
                        disabled={addingRecId === currentRec.id}
                        className="px-3 py-1.5 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer rounded-none disabled:opacity-75"
                      >
                        {addingRecId === currentRec.id ? "Added!" : "Add"}
                      </button>
                    </div>
                  </Reveal>
                )}

                {/* ORDER SPECIAL INSTRUCTIONS ACCORDION */}
                <div className="py-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsInstructionsOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-[13px] text-gray-700 hover:text-black py-1 cursor-pointer select-none transition-colors"
                  >
                    <span className="font-normal">Order special instructions</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-250 ${
                        isInstructionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isInstructionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pt-2"
                      >
                        <textarea
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          placeholder="Special instructions for your order, gift note, or custom sizing instructions..."
                          rows={3}
                          className="w-full p-2.5 text-xs text-gray-800 bg-[#fbfaf8] border border-gray-200 rounded-xs focus:outline-none focus:border-[#ca7b64] focus:bg-white resize-none transition-all placeholder:text-gray-400"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* FOOTER & CHECKOUT ACTIONS (PINNED BOTTOM) */}
              <div className="p-5 border-t border-gray-200 bg-white shrink-0 space-y-3.5 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-base sm:text-[17px] text-[#1c1b1b]">
                    Subtotal
                  </span>
                  <span className="font-bold text-base sm:text-[17px] text-[#1c1b1b]">
                    Rs. {subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Tax & shipping disclaimer */}
                <p className="text-[11px] sm:text-xs text-gray-500 font-normal">
                  Taxes, discounts and shipping calculated at checkout.
                </p>

                {/* Checkout Notification if triggered */}
                {checkoutNotification && (
                  <div className="py-2 px-3 bg-[#f0f8f4] border border-[#d2ecd9] text-[#2e6945] text-xs text-center rounded-xs animate-in fade-in duration-200">
                    {checkoutNotification}
                  </div>
                )}

                {/* Dual Action Buttons: VIEW CART & CHECKOUT */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleViewCart}
                    className="w-full py-3.5 px-3 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-center transition-colors cursor-pointer rounded-none active:scale-[0.99]"
                  >
                    VIEW CART
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-3 bg-white hover:bg-[#1c1b1b] hover:text-white text-[#1c1b1b] border border-[#1c1b1b] text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-center transition-colors cursor-pointer rounded-none active:scale-[0.99]"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
