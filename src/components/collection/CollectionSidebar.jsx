import { memo } from "react";
import {
  categories,
  availabilityFilters,
  priceFilter,
  colorFilters,
  specialProducts,
  sidebarBanner,
} from "../../data/collectionSidebar";
import { useRouter } from "@/hooks/useRouter";
import { Check, X } from "lucide-react";

function CollectionSidebar({
  selectedCategories = [],
  onToggleCategory,
  selectedAvailability = [],
  onToggleAvailability,
  priceRange = [0, 28],
  onPriceChange,
  selectedColors = [],
  onToggleColor,
  onResetCategory,
  onResetAvailability,
  onResetPrice,
  onResetColor,
  onResetAll,
  isMobileDrawer = false,
  onCloseDrawer,
}) {
  const { navigate } = useRouter();

  const handleProductClick = (slug) => {
    if (onCloseDrawer) onCloseDrawer();
    navigate(`/products/${slug}`);
  };

  const handleMinPriceInput = (e) => {
    const val = Number(e.target.value) || 0;
    const clamped = Math.max(0, Math.min(val, priceRange[1]));
    onPriceChange?.([clamped, priceRange[1]]);
  };

  const handleMaxPriceInput = (e) => {
    const val = Number(e.target.value) || 0;
    const clamped = Math.min(priceFilter.max, Math.max(val, priceRange[0]));
    onPriceChange?.([priceRange[0], clamped]);
  };

  const minPercent = ((priceRange[0] - priceFilter.min) / (priceFilter.max - priceFilter.min)) * 100;
  const maxPercent = ((priceRange[1] - priceFilter.min) / (priceFilter.max - priceFilter.min)) * 100;

  return (
    <aside className="w-full text-[#1c1b1b] font-sans">
      {/* Mobile Drawer Header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-serif font-medium text-[#1c1b1b]">
              Filter & Sort
            </h3>
            {(selectedCategories.length > 0 ||
              selectedAvailability.length > 0 ||
              selectedColors.length > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 28) && (
              <button
                type="button"
                onClick={onResetAll}
                className="text-xs text-[#cb765f] hover:underline font-medium cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onCloseDrawer}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#1c1b1b] transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 1. CATEGORIES */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-[19px] font-serif text-[#1c1b1b] font-normal tracking-tight">
            Categories
          </h3>
          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={onResetCategory}
              className="text-xs text-gray-500 hover:text-[#cb765f] underline transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Scrollable list with scrollbar as seen in screenshot */}
        <div className="max-h-56 sm:max-h-60 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {categories.map((cat, idx) => {
            const isChecked = selectedCategories.includes(cat.slug);
            return (
              <label
                key={`${cat.slug}-${idx}`}
                className="flex items-center justify-between group cursor-pointer select-none text-[13.5px] hover:text-[#cb765f] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#cb765f] border-[#cb765f] text-white"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-3" />}
                  </div>
                  <span
                    className={`${
                      isChecked ? "text-[#1c1b1b] font-medium" : "text-gray-700"
                    }`}
                  >
                    {cat.name}
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-normal">
                  ({cat.count})
                </span>
                <input
                  id={`filter-cat-${cat.slug}`}
                  name={`category_${cat.slug}`}
                  aria-label={`Filter category: ${cat.name}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory?.(cat.slug)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-t border-gray-200 my-5" />

      {/* FILTER SECTION HEADER */}
      <h3 className="text-lg sm:text-[19px] font-serif text-[#1c1b1b] font-normal tracking-tight mb-4">
        Filter
      </h3>

      {/* 2. AVAILABILITY */}
      <div className="mb-6">
        <h4 className="text-[15px] font-serif text-[#1c1b1b] font-normal mb-1.5">
          Availability
        </h4>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{selectedAvailability.length} selected</span>
          {selectedAvailability.length > 0 && (
            <button
              type="button"
              onClick={onResetAvailability}
              className="hover:text-[#cb765f] underline transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {availabilityFilters.map((avail) => {
            const isChecked = selectedAvailability.includes(avail.value);
            return (
              <label
                key={avail.value}
                className="flex items-center justify-between group cursor-pointer select-none text-[13.5px] hover:text-[#cb765f] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#cb765f] border-[#cb765f] text-white"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-3" />}
                  </div>
                  <span
                    className={`${
                      isChecked ? "text-[#1c1b1b] font-medium" : "text-gray-700"
                    }`}
                  >
                    {avail.name}
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-normal">
                  ({avail.count})
                </span>
                <input
                  id={`filter-avail-${avail.value}`}
                  name={`availability_${avail.value}`}
                  aria-label={`Filter availability: ${avail.name}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAvailability?.(avail.value)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-t border-gray-200 my-5" />

      {/* 3. PRICE */}
      <div className="mb-6">
        <h4 className="text-[15px] font-serif text-[#1c1b1b] font-normal mb-1.5">
          Price
        </h4>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>The highest price is Rs. 28.00</span>
          {(priceRange[0] > 0 || priceRange[1] < 28) && (
            <button
              type="button"
              onClick={onResetPrice}
              className="hover:text-[#cb765f] underline transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Dual Range Slider Component matching screenshot */}
        <div className="relative w-full py-4 mb-4">
          {/* Base Track */}
          <div className="w-full h-1 bg-gray-200 rounded-full" />
          {/* Active Highlight Track */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#1c1b1b] rounded-full pointer-events-none"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }}
          />

          {/* Hidden multi-range sliders layered */}
          <input
            id="filter-price-min-range"
            name="price_min_range"
            aria-label="Minimum price range slider"
            type="range"
            min={priceFilter.min}
            max={priceFilter.max}
            value={priceRange[0]}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), priceRange[1]);
              onPriceChange?.([val, priceRange[1]]);
            }}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer accent-[#1c1b1b] [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1c1b1b] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-xs"
          />
          <input
            id="filter-price-max-range"
            name="price_max_range"
            aria-label="Maximum price range slider"
            type="range"
            min={priceFilter.min}
            max={priceFilter.max}
            value={priceRange[1]}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), priceRange[0]);
              onPriceChange?.([priceRange[0], val]);
            }}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer accent-[#1c1b1b] [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1c1b1b] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-xs"
          />
        </div>

        {/* Min / Max Price Input Boxes matching screenshot */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex-1">
            <span className="block mb-1 text-[11px] text-gray-400">From</span>
            <div className="flex items-center border border-gray-300 rounded-xs bg-white px-2.5 py-1.5 focus-within:border-[#1c1b1b]">
              <span className="text-gray-500 text-xs mr-1.5">₹</span>
              <input
                id="filter-price-from-input"
                name="price_from"
                aria-label="Minimum price in rupees"
                type="number"
                min={priceFilter.min}
                max={priceFilter.max}
                value={priceRange[0]}
                onChange={handleMinPriceInput}
                className="w-full text-right text-xs font-medium text-[#1c1b1b] bg-transparent outline-none"
              />
            </div>
          </div>
          <span className="mt-4 text-gray-400 font-medium">-</span>
          <div className="flex-1">
            <span className="block mb-1 text-[11px] text-gray-400">To</span>
            <div className="flex items-center border border-gray-300 rounded-xs bg-white px-2.5 py-1.5 focus-within:border-[#1c1b1b]">
              <span className="text-gray-500 text-xs mr-1.5">₹</span>
              <input
                id="filter-price-to-input"
                name="price_to"
                aria-label="Maximum price in rupees"
                type="number"
                min={priceFilter.min}
                max={priceFilter.max}
                value={priceRange[1]}
                onChange={handleMaxPriceInput}
                className="w-full text-right text-xs font-medium text-[#1c1b1b] bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200 my-5" />

      {/* 4. COLOR */}
      <div className="mb-6">
        <h4 className="text-[15px] font-serif text-[#1c1b1b] font-normal mb-1.5">
          Color
        </h4>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{selectedColors.length} selected</span>
          {selectedColors.length > 0 && (
            <button
              type="button"
              onClick={onResetColor}
              className="hover:text-[#cb765f] underline transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Scrollable list with scrollbar as shown in screenshot */}
        <div className="max-h-48 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {colorFilters.map((col) => {
            const isChecked = selectedColors.includes(col.value);
            return (
              <label
                key={col.value}
                className="flex items-center justify-between group cursor-pointer select-none text-[13.5px] hover:text-[#cb765f] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-4.5 h-4.5 rounded-full inline-block shrink-0 shadow-2xs border ${
                      isChecked ? "ring-2 ring-offset-1 ring-[#1c1b1b]" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: col.color }}
                  />
                  <span
                    className={`${
                      isChecked ? "text-[#1c1b1b] font-medium" : "text-gray-700"
                    }`}
                  >
                    {col.name}
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-normal">
                  ({col.count})
                </span>
                <input
                  id={`filter-color-${col.value}`}
                  name={`color_${col.value}`}
                  aria-label={`Filter color: ${col.name}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleColor?.(col.value)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-t border-gray-200 my-5" />

      {/* 5. SPECIAL PRODUCT (Featured cards in screenshot 4) */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-[19px] font-serif text-[#1c1b1b] font-normal tracking-tight mb-4">
          Special product
        </h3>

        <div className="space-y-3">
          {specialProducts.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item.slug)}
              className="bg-white border border-gray-200 rounded-xs p-3 flex items-center gap-3.5 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-xs overflow-hidden flex items-center justify-center p-1">
                <img
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-[12.5px] font-bold text-[#1c1b1b] uppercase tracking-wide truncate group-hover:text-[#cb765f] transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-[#cb765f]">
                    Rs. {Number(item.price).toFixed(2)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-[11px] text-gray-400 line-through">
                      Rs. {Number(item.oldPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. PROMOTIONAL SIDEBAR BANNER ("Meet our new collection / BEAUTY & ELEGANCE") */}
      <div className="mt-6">
        <div
          onClick={() => {
            if (onCloseDrawer) onCloseDrawer();
            navigate(sidebarBanner.link || "/products");
          }}
          className="relative overflow-hidden rounded-xs bg-[#c97c63] text-white p-6 sm:p-7 text-center group cursor-pointer shadow-md transition-transform duration-300 hover:shadow-lg"
        >
          {/* Subtle floral/ambient background layer */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <h4 className="font-serif text-xl sm:text-2xl font-normal leading-tight mb-1 tracking-tight">
              Meet our
              <br />
              new collection
            </h4>
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-white/80 font-medium mb-4">
              BEAUTY & ELEGANCE
            </p>

            {/* Arched showcase thumbnail matching screenshot */}
            <div className="relative w-36 h-36 rounded-t-full rounded-b-lg overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform duration-500">
              <img
                src={sidebarBanner.image}
                alt={sidebarBanner.alt}
                width={sidebarBanner.width || 350}
                height={sidebarBanner.height || 470}
                className="w-full h-full object-cover object-center rounded-t-full rounded-b-md"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default memo(CollectionSidebar);
