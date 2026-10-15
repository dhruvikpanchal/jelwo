import { useState, useEffect } from "react";
import {
  Star,
  Heart,
  FileText,
  HelpCircle,
  Share2,
  MapPin,
  RotateCcw,
  DollarSign,
  Check,
  X,
  Copy,
} from "lucide-react";
import { commonProductInfo } from "../../data/productsData";
import PaymentBadges from "../common/PaymentBadges";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

export default function ProductInfoSection({
  product,
  selectedVariant,
  onVariantChange,
  onTriggerToast,
}) {
  const [quantity, setQuantity] = useState(1);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product?.slug || product?.id);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 1423,
    hours: 8,
    minutes: 55,
    seconds: 50,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sizeOption = product?.options?.find((o) => o.name.toLowerCase() === "size");
  const colorOption = product?.options?.find((o) => o.name.toLowerCase() === "color");

  const currentSize = selectedVariant?.size || sizeOption?.default || sizeOption?.values?.[0] || "";
  const currentColor = selectedVariant?.color || colorOption?.default || colorOption?.values?.[0]?.name || "";

  const displayPrice = selectedVariant?.price ?? product?.price ?? 0;
  const displayComparePrice = selectedVariant?.comparePrice ?? product?.comparePrice;
  const displayDiscount = displayComparePrice
    ? Math.round(((displayComparePrice - displayPrice) / displayComparePrice) * 100)
    : product?.discountPercent || 0;
  const currentSku = selectedVariant?.sku || product?.sku || "445";

  const handleSizeSelect = (size) => {
    if (onVariantChange) onVariantChange({ size, color: currentColor });
  };

  const handleColorSelect = (color) => {
    if (onVariantChange) onVariantChange({ size: currentSize, color });
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: selectedVariant?.id || product?.id,
        productId: product?.id,
        title: product?.name || product?.title,
        price: selectedVariant?.price ?? product?.price,
        comparePrice: selectedVariant?.comparePrice ?? product?.comparePrice,
        size: currentSize || selectedVariant?.size,
        color: currentColor || selectedVariant?.color,
        image: selectedVariant?.image || product?.images?.[0]?.src || product?.image,
        slug: product?.slug,
      },
      quantity,
      {
        size: currentSize || selectedVariant?.size,
        color: currentColor || selectedVariant?.color,
      }
    );
    onTriggerToast?.(`Added "${product?.name}" to cart`);
  };

  const handleBuyItNow = () => {
    addToCart(
      {
        id: selectedVariant?.id || product?.id,
        productId: product?.id,
        title: product?.name || product?.title,
        price: selectedVariant?.price ?? product?.price,
        comparePrice: selectedVariant?.comparePrice ?? product?.comparePrice,
        size: currentSize || selectedVariant?.size,
        color: currentColor || selectedVariant?.color,
        image: selectedVariant?.image || product?.images?.[0]?.src || product?.image,
        slug: product?.slug,
      },
      quantity,
      {
        size: currentSize || selectedVariant?.size,
        color: currentColor || selectedVariant?.color,
      }
    );
  };

  const handleToggleWishlist = () => {
    const nowWishlisted = toggleWishlist(product);
    onTriggerToast?.(
      nowWishlisted
        ? `Added "${product?.name}" to your wishlist`
        : `Removed "${product?.name}" from your wishlist`
    );
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full flex flex-col text-left font-sans select-text">
      {/* 1. Title */}
      <h1 className="font-serif text-3xl sm:text-[36px] lg:text-[40px] text-[#1c1b1b] font-normal tracking-tight leading-snug">
        {product?.name || "Rose gold rings"}
      </h1>

      {/* 2. Review Stars */}
      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex items-center gap-0.5 text-[#e59819]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-[#e59819] text-[#e59819]" />
          ))}
        </div>
        <span className="text-xs sm:text-[13px] text-gray-500 font-normal">
          {product?.reviews?.count || 1} {product?.reviews?.count === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* 3. Price & Discount Badge */}
      <div className="flex items-center flex-wrap gap-2.5 mt-3 sm:mt-3.5">
        <span className="text-2xl sm:text-[28px] font-bold text-[#c8654d] tracking-tight">
          Rs. {Number(displayPrice).toFixed(2)}
        </span>

        {displayComparePrice && (
          <span className="line-through text-gray-400 text-sm sm:text-base font-normal">
            Rs. {Number(displayComparePrice).toFixed(2)}
          </span>
        )}

        {displayDiscount > 0 && (
          <span className="bg-[#2ba25b] text-white text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-xs tracking-wide leading-tight">
            Sale {displayDiscount}%
          </span>
        )}
      </div>

      {/* 4. Tax Note */}
      <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
        {commonProductInfo.shippingNote}
      </p>

      {/* 5. Stock Status */}
      <div className="flex items-center gap-2 mt-3.5 pb-4 border-b border-gray-200/80">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
        <span className="text-xs sm:text-[13px] text-[#1c1b1b] font-medium">
          {product?.stock || 15} in stock
        </span>
      </div>

      {/* 6. Short Description */}
      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mt-4 font-normal">
        {commonProductInfo.shortDescription}
      </p>

      {/* 7. Hurry Up Sale Countdown Box */}
      <div className="bg-[#fef2f2] border border-[#fecaca]/70 rounded-xs px-4 py-3 flex items-center justify-between my-4.5">
        <span className="text-xs sm:text-[13px] font-semibold text-[#dc2626] tracking-wide">
          {commonProductInfo.saleCountdown.text}
        </span>
        <div className="text-xs sm:text-sm font-bold text-[#dc2626] tracking-wider font-mono">
          {String(timeLeft.days).padStart(4, "0")} : {String(timeLeft.hours).padStart(2, "0")} :{" "}
          {String(timeLeft.minutes).padStart(2, "0")} : {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>

      {/* 8. Size Selector (if product has sizes) */}
      {sizeOption && sizeOption.values?.length > 0 && (
        <div className="mt-2">
          <div className="text-xs sm:text-[13px] text-[#1c1b1b] font-semibold mb-2">
            Size: <span className="font-normal text-gray-600">{currentSize}</span>
          </div>
          <div className="flex items-center gap-2">
            {sizeOption.values.map((size) => {
              const isSelected = String(currentSize) === String(size);
              return (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`min-w-10.5 h-10 px-3.5 text-xs sm:text-[13px] flex items-center justify-center transition-all cursor-pointer rounded-[1px] bg-white ${
                    isSelected
                      ? "border-2 border-[#1c1b1b] font-bold text-[#1c1b1b] shadow-2xs"
                      : "border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-black"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 9. Color Selector */}
      {colorOption && colorOption.values?.length > 0 && (
        <div className="mt-4">
          <div className="text-xs sm:text-[13px] text-[#1c1b1b] font-semibold mb-2">
            Color: <span className="font-normal text-gray-600">{currentColor}</span>
          </div>
          <div className="flex items-center gap-3">
            {colorOption.values.map((col) => {
              const isSelected = currentColor.toLowerCase() === col.name.toLowerCase();
              return (
                <button
                  key={col.name}
                  onClick={() => handleColorSelect(col.name)}
                  style={{ backgroundColor: col.rgb }}
                  className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-[#1c1b1b] scale-110 shadow-xs"
                      : "opacity-85 hover:opacity-100 hover:scale-105"
                  }`}
                  title={col.name}
                  aria-label={col.name}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 10. Quantity Stepper */}
      <div className="mt-5">
        <div className="inline-flex items-center border border-gray-300 bg-white rounded-[1px]">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer text-lg leading-none"
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span className="w-11 text-center text-xs sm:text-sm font-semibold text-[#1c1b1b] select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer text-lg leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* 11. Two Action Buttons with Terracotta / Red Hover Shade (Image 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
        <button
          onClick={handleAddToCart}
          className="w-full py-3.5 sm:py-4 px-6 bg-white border border-[#222222] text-[#222222] font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase rounded-[1px] hover:bg-[#cb765f] hover:text-white hover:border-[#cb765f] transition-colors duration-300 shadow-xs cursor-pointer text-center"
        >
          ADD TO CART
        </button>

        <button
          onClick={handleBuyItNow}
          className="w-full py-3.5 sm:py-4 px-6 bg-[#222222] border border-[#222222] text-white font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase rounded-[1px] hover:bg-[#cb765f] hover:border-[#cb765f] transition-colors duration-300 shadow-xs cursor-pointer text-center"
        >
          BUY IT NOW
        </button>
      </div>

      {/* 12. Actions Bar (Wishlist, Sizeguide, Question, Share) */}
      <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-7 mt-5 pt-4 border-t border-gray-200/80 text-xs sm:text-[13px] font-semibold text-gray-700 uppercase tracking-wider">
        <button
          onClick={handleToggleWishlist}
          className="inline-flex items-center gap-1.5 hover:text-[#cb765f] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-[#cb765f] text-[#cb765f]" : "stroke-[1.75]"
            }`}
          />
          <span>WISHLIST</span>
        </button>

        <button
          onClick={() => setShowSizeGuide(true)}
          className="inline-flex items-center gap-1.5 hover:text-[#cb765f] transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 stroke-[1.75]" />
          <span>SIZEGUIDE</span>
        </button>

        <button
          onClick={() => setShowQuestionModal(true)}
          className="inline-flex items-center gap-1.5 hover:text-[#cb765f] transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 stroke-[1.75]" />
          <span>QUESTION</span>
        </button>

        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-1.5 hover:text-[#cb765f] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 stroke-[1.75]" />
          <span>SHARE</span>
        </button>
      </div>

      {/* 13. Metadata Rows: Delivery, Returns, SKU */}
      <div className="space-y-1.5 mt-5 text-xs sm:text-[13px] text-gray-600">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-[#1c1b1b] min-w-17.5">Delivery:</span>
          <span>{commonProductInfo.delivery}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-[#1c1b1b] min-w-17.5">Returns:</span>
          <span>{commonProductInfo.returns}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-[#1c1b1b] min-w-17.5">Sku:</span>
          <span>{currentSku}</span>
        </div>
      </div>

      {/* 14. Payment & Security Card Box */}
      <div className="bg-cream-light border border-[#f0ece3] p-5 sm:p-6 rounded-xs mt-6">
        <h3 className="font-semibold text-sm sm:text-[15px] text-[#1c1b1b] mb-3">
          {commonProductInfo.paymentSecurity.title}
        </h3>

        {/* Payment Badges Row */}
        <PaymentBadges className="flex items-center gap-2 flex-wrap" />

        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mt-3">
          {commonProductInfo.paymentSecurity.text}
        </p>
      </div>

      {/* 15. Service Highlights Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-gray-200/80 text-center">
        <div className="flex flex-col items-center gap-1.5">
          <MapPin className="w-5 h-5 text-[#1c1b1b] stroke-[1.5]" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#1c1b1b]">
            Order tracking
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <RotateCcw className="w-5 h-5 text-[#1c1b1b] stroke-[1.5]" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#1c1b1b]">
            90 days return
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <DollarSign className="w-5 h-5 text-[#1c1b1b] stroke-[1.5]" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#1c1b1b]">
            Money guarantee
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Interactive Size Guide Modal */}
      {/* ------------------------------------------------------------- */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xs max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-200">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-[#1c1b1b] mb-4">Size Guide</h3>

            {/* Size Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-[13px] border border-gray-200 text-left">
                <thead className="bg-cream-light border-b border-gray-200 font-semibold text-[#1c1b1b]">
                  <tr>
                    {commonProductInfo.sizeGuide.columns.map((col) => (
                      <th key={col} className="p-2.5 border-r border-gray-200 last:border-r-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {commonProductInfo.sizeGuide.rows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/80">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 border-r border-gray-200 last:border-r-0 text-gray-600">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Measurement Guide */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm text-[#1c1b1b] mb-2.5">How to Measure</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-2 text-xs sm:text-[13px] text-gray-600">
                  {commonProductInfo.sizeGuide.howToMeasure.map((m, idx) => (
                    <div key={idx}>
                      <span className="font-medium text-[#1c1b1b]">{m.title}: </span>
                      {m.text}
                    </div>
                  ))}
                </div>
                {commonProductInfo.sizeGuide.image && (
                  <div className="flex justify-center p-2 bg-cream-light rounded-xs">
                    <img
                      src={commonProductInfo.sizeGuide.image}
                      alt="How to measure"
                      width={370}
                      height={402}
                      className="max-h-44 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Ask a Question Modal */}
      {/* ------------------------------------------------------------- */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xs max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setShowQuestionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-[#1c1b1b] mb-1">Have a Question?</h3>
            <p className="text-xs text-gray-500 mb-5">
              Inquire about "{product?.name}" and we will respond within 24 hours.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowQuestionModal(false);
                onTriggerToast?.("Your message has been sent successfully!");
              }}
              className="space-y-3.5"
            >
              <input
                id="question-name"
                name="name"
                autoComplete="name"
                aria-label="Your Name"
                type="text"
                placeholder="Your Name *"
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
              />
              <input
                id="question-email"
                name="email"
                autoComplete="email"
                aria-label="Your Email"
                type="email"
                placeholder="Your Email *"
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
              />
              <textarea
                id="question-message"
                name="message"
                aria-label="Your Message"
                placeholder="Your Message *"
                rows={4}
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#1c1b1b] hover:bg-[#cb765f] text-white font-bold text-xs uppercase tracking-widest rounded-[1px] transition-colors cursor-pointer"
              >
                Send Question
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Share Modal */}
      {/* ------------------------------------------------------------- */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xs max-w-md w-full p-6 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl text-[#1c1b1b] mb-2">Share this product</h3>
            <p className="text-xs text-gray-500 mb-4">{product?.name}</p>

            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-xs">
              <input
                id="share-product-link"
                name="share_url"
                aria-label="Product share link"
                type="text"
                readOnly
                value={window.location.href}
                className="flex-1 bg-transparent text-xs text-gray-600 outline-none select-all truncate"
              />
              <button
                onClick={handleCopyShare}
                className="px-3 py-1.5 bg-[#1c1b1b] hover:bg-[#cb765f] text-white text-xs font-semibold rounded-[1px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
