import { X, ShoppingBag } from "lucide-react";

export default function QuickViewModal({
  product,
  size,
  onSizeChange,
  onAddToCart,
  onViewDetails,
  onClose,
}) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xs max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-5 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="aspect-square bg-[#f9f7f4] rounded-xs p-4 flex items-center justify-center">
            <img
              src={product.images?.[0]?.src || product.image}
              alt={product.name}
              width={1066}
              height={1200}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div>
            <h3 className="text-xl font-serif text-[#1c1b1b] mb-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-[#cb765f]">
                Rs. {Number(product.price).toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-xs text-gray-400 line-through">
                  Rs. {Number(product.comparePrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 mb-4 line-clamp-3">
              {product.shortDescription ||
                "Elegantly crafted fine jewelry showcasing exquisite craftsmanship and timeless beauty."}
            </p>

            {/* Size options if available */}
            {product.options?.find((o) => o.name === "Size") && (
              <div className="mb-4">
                <span className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Size: {size}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.options
                    .find((o) => o.name === "Size")
                    ?.values.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => onSizeChange(s)}
                        className={`px-3 py-1 text-xs border rounded-xs transition-colors cursor-pointer ${
                          size === s
                            ? "border-[#1c1b1b] bg-[#1c1b1b] text-white font-medium"
                            : "border-gray-300 text-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Add to cart / View Full details */}
            <div className="space-y-2 mt-6">
              <button
                type="button"
                onClick={onAddToCart}
                className="w-full py-2.5 bg-[#1c1b1b] hover:bg-[#cb765f] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={onViewDetails}
                className="w-full py-2 border border-gray-300 hover:border-gray-800 text-gray-800 text-xs font-medium uppercase tracking-wider rounded-xs transition-colors text-center cursor-pointer"
              >
                View Full Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
