import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import CollectionSidebar from "@/components/collection/CollectionSidebar";
import CollectionProductCard from "@/components/collection/CollectionProductCard";
import { products as allProducts } from "@/data/productsData";
import { useRouter } from "@/hooks/useRouter";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  List,
  ChevronDown,
  X,
  Check,
} from "lucide-react";
import collectionBannerImg from "@/assets/images/products/jewelry-3-collection-banner-opt.webp";
import { useCart } from "@/hooks/useCart";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

// Lazy-loaded modal to avoid bundle bloat when browsing catalog
const QuickViewModal = lazy(() => import("@/components/product/QuickViewModal"));

export default function ProductsPage() {
  const { navigate } = useRouter();
  const { addToCart } = useCart();

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState(() => {
    if (typeof window === "undefined") return [];
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") || params.get("collection");
    return cat ? [cat] : [];
  });
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 28]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid-3"); // 'grid-3' | 'grid-4' | 'grid-2' | 'list'

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Toast & Modal states
  const [toastMessage, setToastMessage] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  // Prevent background body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  // Handlers for toggles
  const handleToggleCategory = (slug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const handleToggleAvailability = (val) => {
    setSelectedAvailability((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const handleToggleColor = (col) => {
    setSelectedColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  const handleResetCategory = () => setSelectedCategories([]);
  const handleResetAvailability = () => setSelectedAvailability([]);
  const handleResetPrice = () => setPriceRange([0, 28]);
  const handleResetColor = () => setSelectedColors([]);
  const handleResetAll = () => {
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setPriceRange([0, 28]);
    setSelectedColors([]);
  };

  const totalActiveFiltersCount =
    selectedCategories.length +
    selectedAvailability.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 28 ? 1 : 0);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      // 1. Availability filter (1 = in stock, 0 = out of stock)
      if (selectedAvailability.length > 0) {
        const inStock = item.stock > 0;
        const matchesInStock = selectedAvailability.includes("1") && inStock;
        const matchesOutOfStock =
          selectedAvailability.includes("0") && !inStock;
        if (!matchesInStock && !matchesOutOfStock) return false;
      }

      // 2. Price filter
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }

      // 3. Color filter
      if (selectedColors.length > 0) {
        const itemColors =
          item.variants?.map((v) => v.color?.toLowerCase()) || [];
        const hasColor = selectedColors.some((c) =>
          itemColors.includes(c.toLowerCase()),
        );
        if (!hasColor) return false;
      }

      // 4. Category filter (if selected)
      if (selectedCategories.length > 0) {
        const nameSlug = item.slug;
        const typeSlug = (item.type || "").toLowerCase();
        const matchesCat = selectedCategories.some((cat) => {
          const cleanCat = cat.replace(/-/g, " ").toLowerCase();
          return (
            nameSlug.includes(cat) ||
            item.name.toLowerCase().includes(cleanCat) ||
            typeSlug.includes(cleanCat) ||
            cleanCat.includes("14k") ||
            cleanCat.includes("18k") ||
            cleanCat.includes("22k") ||
            cleanCat.includes("24k") ||
            cleanCat.includes("best") ||
            cleanCat.includes("trending")
          );
        });
        if (!matchesCat) return false;
      }

      return true;
    });
  }, [selectedAvailability, priceRange, selectedColors, selectedCategories]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return list.reverse();
      case "best-selling":
      case "featured":
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const openQuickView = (prod) => {
    setQuickViewProduct(prod);
    setQuickViewSize(
      prod.options?.find((o) => o.name === "Size")?.values?.[0] || "",
    );
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#1c1b1b]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b1b] text-white px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10">
          <div className="w-6 h-6 rounded-full bg-[#cb765f] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

      {/* 1. Page Hero Banner matching screenshot */}
      <Reveal direction="fade" duration={0.5}>
        <PageBanner
          title="Products"
          breadcrumb="PRODUCTS"
          onNavigateHome={() => navigate("/")}
        />
      </Reveal>

      {/* 2. Main Page Layout (Sidebar + Products Grid) */}
      <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          {/* =========================================================
              DESKTOP SIDEBAR (>= 1024px)
          ========================================================= */}
          <Reveal direction="right" duration={0.6} distance={20} className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
            <CollectionSidebar
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              selectedAvailability={selectedAvailability}
              onToggleAvailability={handleToggleAvailability}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedColors={selectedColors}
              onToggleColor={handleToggleColor}
              onResetCategory={handleResetCategory}
              onResetAvailability={handleResetAvailability}
              onResetPrice={handleResetPrice}
              onResetColor={handleResetColor}
              onResetAll={handleResetAll}
            />
          </Reveal>

          {/* =========================================================
              MAIN PRODUCTS AREA
          ========================================================= */}
          <div className="flex-1 w-full min-w-0">
            {/* Top Collection Banner matching user reference image */}
            <Reveal direction="up" distance={20} className="mb-8">
              <h2 className="text-xl sm:text-2xl font-serif text-[#1c1b1b] font-normal mb-3 sm:mb-4">
                Products
              </h2>
              <div className="w-full overflow-hidden rounded-xs bg-[#f9f7f4] shadow-2xs">
                <img
                  src={collectionBannerImg}
                  alt="New arrival just for you - Discount up to 30% off"
                  width={1410}
                  height={365}
                  className="w-full h-auto object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed mt-3.5">
                Care for fiber: 30% more recycled polyester. We label garments
                manufactured using environmentally friendly technologies and raw
                materials with the Join Life label.
              </p>
            </Reveal>

            {/* Toolbar: Filter Toggle Button (mobile/tablet), Sorting & View Switchers */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  Showing {sortedProducts.length} results
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                {/* Mobile/Tablet Filter Trigger Button (< 1024px) */}
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-[#1c1b1b] hover:text-white rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer relative"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter</span>
                  {totalActiveFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#cb765f] text-white text-[10px] font-bold flex items-center justify-center">
                      {totalActiveFiltersCount}
                    </span>
                  )}
                </button>

                {/* View Mode Switchers (Desktop/Tablet) */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-xs p-0.5 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid-3")}
                    className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                      viewMode === "grid-3"
                        ? "bg-white text-[#1c1b1b] shadow-2xs"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                    title="3 Columns Grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid-4")}
                    className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                      viewMode === "grid-4"
                        ? "bg-white text-[#1c1b1b] shadow-2xs"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                    title="4 Columns Grid"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-white text-[#1c1b1b] shadow-2xs"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort By Dropdown */}
                <div className="relative">
                  <select
                    id="products-sort-by"
                    name="sort_by"
                    aria-label="Sort products by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xs pl-3 pr-8 py-2 text-xs font-medium text-[#1c1b1b] focus:border-[#1c1b1b] outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="name-asc">Alphabetically, A-Z</option>
                    <option value="name-desc">Alphabetically, Z-A</option>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                    <option value="newest">Date, new to old</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {totalActiveFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-gray-500 font-medium mr-1">
                  Active Filters:
                </span>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-xs"
                  >
                    <span>{cat}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedAvailability.map((val) => (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-xs"
                  >
                    <span>{val === "1" ? "In stock" : "Out of stock"}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(val)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedColors.map((col) => (
                  <span
                    key={col}
                    className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-xs capitalize"
                  >
                    <span>{col}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleColor(col)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 28) && (
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-xs">
                    <span>
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                    <button
                      type="button"
                      onClick={handleResetPrice}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-xs text-[#cb765f] hover:underline font-semibold ml-2 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid / List */}
            {sortedProducts.length === 0 ? (
              <Reveal direction="up" duration={0.5}>
                <div className="text-center py-16 px-4 bg-gray-50 rounded-xs border border-gray-200">
                  <p className="text-lg font-serif text-[#1c1b1b] mb-2">
                    No products found
                  </p>
                  <p className="text-xs text-gray-500 mb-5">
                    Try clearing some filter criteria to find what you are looking
                    for.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="px-5 py-2.5 bg-[#1c1b1b] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#cb765f] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              </Reveal>
            ) : viewMode === "list" ? (
              <Stagger staggerDelay={0.04} className="space-y-4">
                {sortedProducts.map((prod) => (
                  <StaggerItem key={prod.id} direction="up" distance={20}>
                    <CollectionProductCard
                      product={prod}
                      viewMode="list"
                      onTriggerToast={showToast}
                      onQuickView={openQuickView}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Stagger
                staggerDelay={0.04}
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === "grid-4"
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                }`}
              >
                {sortedProducts.map((prod) => (
                  <StaggerItem key={prod.id} direction="up" distance={20}>
                    <CollectionProductCard
                      product={prod}
                      viewMode="grid"
                      onTriggerToast={showToast}
                      onQuickView={openQuickView}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE & TABLET SLIDE-OVER DRAWER (< 1024px)
      ========================================================= */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Slide-over Panel from Left */}
          <div className="fixed inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col animate-slide-right">
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <CollectionSidebar
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
                selectedAvailability={selectedAvailability}
                onToggleAvailability={handleToggleAvailability}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedColors={selectedColors}
                onToggleColor={handleToggleColor}
                onResetCategory={handleResetCategory}
                onResetAvailability={handleResetAvailability}
                onResetPrice={handleResetPrice}
                onResetColor={handleResetColor}
                onResetAll={handleResetAll}
                isMobileDrawer={true}
                onCloseDrawer={() => setIsMobileDrawerOpen(false)}
              />
            </div>

            {/* Bottom Action bar */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetAll}
                className="flex-1 py-2.5 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-2.5 bg-[#1c1b1b] hover:bg-[#cb765f] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          QUICK VIEW MODAL (Deferred)
      ========================================================= */}
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
                  size: quickViewSize || quickViewProduct.options?.Size?.[0] || "",
                  color: quickViewProduct.options?.Color?.[0] || "",
                  image: quickViewProduct.images?.[0]?.src || quickViewProduct.image,
                  slug: quickViewProduct.slug,
                },
                1,
                { size: quickViewSize }
              );
              showToast(`Added "${quickViewProduct.name}" to cart`);
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
