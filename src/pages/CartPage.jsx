import { useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Gift, CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "@/hooks/useRouter";
import PageBanner from "@/components/common/PageBanner";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingDifference,
    shippingProgress,
    isFreeShipping,
    specialInstructions,
    setSpecialInstructions,
    clearCart,
  } = useCart();

  const { navigate } = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === "WELCOME10") {
      setDiscountPercent(10);
      setCouponSuccess("Coupon WELCOME10 applied (10% off)");
      setCouponError("");
    } else {
      setCouponError("Invalid discount code. Try WELCOME10");
      setCouponSuccess("");
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Requirement 1: when user clicks "checkout", clear cart to zero so user can re-order from scratch
  const handleCheckout = () => {
    clearCart();
    setIsOrderCompleted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-[70vh] font-sans text-[#1c1b1b]">
      {/* 1. Header Banner matching screenshot */}
      <PageBanner
        title="Your Shopping Cart"
        breadcrumb="YOUR SHOPPING CART"
        onNavigateHome={() => navigate("/")}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {items.length === 0 ? (
          <Reveal direction="up" duration={0.6}>
            <div className="py-16 sm:py-24 text-center max-w-md mx-auto">
              {isOrderCompleted ? (
                <>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
                    <CheckCircle2 className="w-10 h-10 stroke-[1.8]" />
                  </div>
                  <h2 className="font-della text-2xl sm:text-3xl font-normal text-[#1c1b1b] mb-2">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-8 leading-relaxed">
                    Thank you for your purchase. Your shopping cart has been reset to zero and you can now start a fresh order.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOrderCompleted(false);
                      navigate("/products");
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-xs font-bold tracking-wider uppercase transition-colors rounded-none cursor-pointer active:scale-95 shadow-xs"
                  >
                    <span>Start New Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#faf7f4] text-[#ca7b64] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h2 className="font-della text-2xl sm:text-3xl font-normal text-[#1c1b1b] mb-2">
                    Your cart is currently empty
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mb-8 leading-relaxed">
                    Before proceeding to checkout you must add some items to your shopping bag.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-xs font-bold tracking-wider uppercase transition-colors rounded-none cursor-pointer active:scale-95 shadow-xs"
                  >
                    <span>Return to Store</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </Reveal>
        ) : (
          <div className="space-y-8">
            {/* Free shipping progress bar matching screenshot */}
            <Reveal direction="down" duration={0.5}>
              <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
                <p className="text-xs sm:text-sm font-bold tracking-wider text-[#1c1b1b] uppercase mb-3">
                  {isFreeShipping ? (
                    <span className="text-emerald-700">
                      Congratulations! You have unlocked Free Shipping!
                    </span>
                  ) : (
                    <>
                      Spend Rs. {shippingDifference.toFixed(2)} more and get free shipping!
                    </>
                  )}
                </p>
                <div className="relative h-2 w-full max-w-md mx-auto bg-[#ece7e1] rounded-full">
                  <div
                    className="h-full bg-[#ca7b64] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${shippingProgress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#ca7b64] text-white flex items-center justify-center shadow-md transition-all duration-500 ease-out"
                    style={{ left: `${Math.min(97, Math.max(3, shippingProgress))}%` }}
                  >
                    <Truck className="w-3 h-3 fill-white stroke-none" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Cart Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 8 Columns: Products Table + Return to Store + Instructions */}
              <div className="lg:col-span-8 space-y-8">
                {/* Table Header */}
                <div className="grid grid-cols-12 pb-3 border-b border-gray-200 text-xs sm:text-sm font-bold text-[#1c1b1b]">
                  <div className="col-span-6 sm:col-span-6">Product</div>
                  <div className="col-span-4 sm:col-span-4 text-center">Quantity</div>
                  <div className="col-span-2 sm:col-span-2 text-right">Total</div>
                </div>

                {/* Items List */}
                <Stagger staggerDelay={0.05} className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <StaggerItem
                      key={item.id}
                      className="py-5 sm:py-6 grid grid-cols-12 items-center gap-2 sm:gap-4"
                    >
                      {/* Product Column */}
                      <div className="col-span-6 sm:col-span-6 flex items-start gap-3 sm:gap-4">
                        <div className="w-18 h-18 sm:w-22 sm:h-22 bg-white border border-gray-200 rounded-none flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            width={88}
                            height={88}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="min-w-0 pr-1">
                          <h3
                            onClick={() => item.slug && navigate(`/products/${item.slug}`)}
                            className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#1c1b1b] hover:text-[#ca7b64] cursor-pointer transition-colors leading-snug line-clamp-2"
                            title={item.title}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] font-medium text-[#1c1b1b] mt-1">
                            Rs. {Number(item.price).toFixed(2)}
                          </p>
                          <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                            {item.size && <p>Size: {item.size}</p>}
                            {item.color && <p>Color: {item.color}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Column */}
                      <div className="col-span-4 sm:col-span-4 flex items-center justify-center gap-2 sm:gap-3">
                        <div className="inline-flex items-center border border-gray-300 bg-white h-8 sm:h-9">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 sm:w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 sm:w-8 text-center text-xs font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 sm:w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Standalone Trash Icon right next to Stepper */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1 sm:p-1.5 transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>

                      {/* Total Column */}
                      <div className="col-span-2 sm:col-span-2 text-right text-xs sm:text-sm font-bold text-[#1c1b1b]">
                        Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                {/* Bottom Row: Discount Code & Return to Store */}
                <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  {/* Discount Code Form with Gift icon */}
                  <form onSubmit={handleApplyCoupon} className="flex items-center w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Gift className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Discount code"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-gray-300 focus:outline-none focus:border-[#ca7b64] rounded-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-10 h-10 bg-[#ca7b64] hover:bg-[#b86d58] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 rounded-none shadow-2xs"
                      title="Apply Discount"
                      aria-label="Apply Discount"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Return to Store button matching screenshot */}
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="w-full sm:w-auto px-7 py-3 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-none cursor-pointer shadow-2xs text-center"
                  >
                    RETURN TO STORE
                  </button>
                </div>

                {couponError && <p className="text-xs text-red-600 -mt-2">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-emerald-700 -mt-2 font-medium">{couponSuccess}</p>}

                {/* Order Special Instructions matching screenshot */}
                <div className="pt-4 space-y-2.5">
                  <h4 className="text-sm font-semibold text-[#1c1b1b]">
                    Order special instructions
                  </h4>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Order special instructions"
                    rows={4}
                    className="w-full p-3.5 text-xs sm:text-sm bg-white border border-gray-300 focus:outline-none focus:border-[#ca7b64] rounded-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Right 4 Columns: Order Summary Box matching screenshot */}
              <div className="lg:col-span-4">
                <div className="bg-cream-light p-6 sm:p-7 sticky top-24 space-y-3">
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#1c1b1b]">
                    <span>Subtotal</span>
                    <span>Rs. {finalTotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-700 font-medium">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-Rs. {discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 leading-relaxed pt-1">
                    Taxes, discounts and shipping calculated at checkout.
                  </p>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full mt-4 py-3.5 bg-[#ca7b64] hover:bg-[#b86d58] text-white text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-colors cursor-pointer rounded-none active:scale-[0.99] shadow-xs"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
