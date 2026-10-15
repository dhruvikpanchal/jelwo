import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Plus,
  Minus,
  Search,
} from "lucide-react";
import { fixedImages } from "../../utils/imagePath";
const logoImg = fixedImages.logo;
import { navLinks } from "../../data/navigation";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "@/hooks/useRouter";
import { useCart } from "@/hooks/useCart";

// Custom House with Heart SVG to match the exact icon in the reference top bar
const TryAtHomeIcon = ({ className = "w-4 h-4 text-brand" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
    <path
      d="M12 11.2c-.8-1-2.2-.8-2.7.2-.6 1.1.2 2.3 2.7 4.1 2.5-1.8 3.3-3 2.7-4.1-.5-1-1.9-1.2-2.7-.2z"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("INR ₹");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { wishlistCount } = useWishlist();
  const { navigate } = useRouter();
  const { totalCount, openCart } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [popularIndex, setPopularIndex] = useState(0);

  const handlePrevPopular = (total) => {
    setPopularIndex((prev) => (prev - 2 < 0 ? Math.max(0, total - (total % 2 === 0 ? 2 : 1)) : prev - 2));
  };

  const handleNextPopular = (total) => {
    setPopularIndex((prev) => (prev + 2 >= total ? 0 : prev + 2));
  };

  // Toggle mobile drawer accordion item
  const toggleMobileItem = (name) => {
    setExpandedMobileItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Scroll listener for sticky header (throttled with requestAnimationFrame for smooth 60fps)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 45);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Header Container with ultra-high Z-Index so it always floats on top of all page content */}
      <header className="w-full relative z-9999 font-sans select-none">
        {/* =========================================================================
            TOP UTILITY & ANNOUNCEMENT BAR (Top Line)
            - Desktop (>= 1024px): Standard utilities + search
            - Mobile & Tablet (< 1024px): Continuous scrolling Marquee line
        ========================================================================= */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 ease-in-out border-b border-border topbar-pattern ${
            isScrolled
              ? "max-h-0 opacity-0 -translate-y-full border-none"
              : "max-h-16 opacity-100 translate-y-0"
          }`}
        >
          {/* Desktop Version (>= 1024px) */}
          <div className="hidden lg:flex max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-11 items-center justify-between text-[13px] text-ink-muted">
            {/* Left Announcement */}
            <div className="flex items-center gap-2 tracking-wide font-normal">
              <span>Free uk standard delivery on all orders.</span>
            </div>

            {/* Right Utilities: Free try at home + Search Input */}
            <div className="flex items-center">
              {/* Free try at home button */}
              <a
                href="#try-at-home"
                className="flex items-center gap-2 px-3 py-1 text-ink-muted hover:text-brand transition-colors duration-200 group"
              >
                <TryAtHomeIcon className="w-4 h-4 text-brand group-hover:scale-110 transition-transform duration-200" />
                <span className="font-normal">Free try at home</span>
              </a>

              {/* Subtle vertical separator */}
              <div className="h-5 w-px bg-border-strong mx-2 hidden sm:block"></div>

              {/* Top Search Input Box */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center pl-2 relative group"
              >
                <input
                  type="text"
                  id="desktop-search-input"
                  name="search"
                  autoComplete="off"
                  placeholder="Search our store"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[13px] text-ink placeholder:text-ink-soft w-36 sm:w-44 md:w-48 py-1 focus:w-56 transition-all duration-300 font-normal"
                />
                <button
                  type="submit"
                  className="text-[13px] font-bold text-brand hover:text-brand-hover uppercase tracking-wider pl-2 pr-1 transition-colors duration-200 cursor-pointer"
                >
                  SEARCH
                </button>
              </form>
            </div>
          </div>

          {/* Mobile & Tablet Marquee (< 1024px) matching Image 1 & Image 3 */}
          <div className="lg:hidden w-full py-2 overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex items-center">
              <div className="flex items-center shrink-0">
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
              </div>
              <div className="flex items-center shrink-0">
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
                <span className="mx-6 text-[13px] text-ink-muted font-normal">
                  Free uk standard delivery on all orders.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN NAVIGATION BAR (Sticky Mid Header / Second Line)
            Fixed on scroll with pure white background, exact typography, logo & icons
        ========================================================================= */}
        <div
          className={`w-full bg-surface transition-all duration-300 ${
            isScrolled
              ? "fixed top-0 left-0 right-0 z-9999 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-b border-border-soft/80 py-3 backdrop-blur-md bg-surface/95"
              : "relative border-b border-border-soft py-3 sm:py-4 lg:py-5"
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between relative">
            {/* 1. Left: Hamburger Button on Mobile/Tablet (< 1024px) & Logo on Desktop */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-ink hover:text-brand p-1.5 -ml-1.5 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.8]" />
              </button>

              <div className="hidden lg:flex shrink-0 items-center">
                <a href="/" className="flex items-center gap-2 group">
                  <img
                    src={logoImg}
                    alt="JELWO Jewelry"
                    width={260}
                    height={59}
                    className="h-7 sm:h-8 lg:h-9 w-auto object-contain transition-transform duration-300 group-hover:opacity-95"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </a>
              </div>
            </div>

            {/* 2. Center: Logo on Mobile/Tablet (< 1024px) OR Desktop Nav Links (>= 1024px) */}
            <div className="lg:hidden flex items-center justify-center">
              <a href="/" className="flex items-center gap-2">
                <img
                  src={logoImg}
                  alt="JELWO Jewelry"
                  width={260}
                  height={59}
                  className="h-6.5 sm:h-7 md:h-8 w-auto object-contain"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </a>
            </div>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-10">
              {navLinks.map((link) => {
                const isDropdownOpen = activeDropdown === link.name;

                return (
                  <div
                    key={link.name}
                    className={`group py-2 ${link.megaMenu ? "" : "relative"}`}
                    onMouseEnter={() =>
                      link.hasDropdown && setActiveDropdown(link.name)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Link & Badge Wrapper */}
                    <div className="relative inline-flex items-center">
                      {/* SALE Badge above Shop */}
                      {link.badge && (
                        <div className="absolute -top-6.5 left-5.5 z-10 pointer-events-none">
                          <span className="relative inline-flex items-center justify-center bg-ink text-surface text-[9.5px] font-bold tracking-wider px-1.5 py-0.5 rounded-[3px] uppercase shadow-sm leading-none">
                            {link.badge}
                            {/* Speech bubble pointer notch */}
                            <span className="absolute -bottom-1 left-1.5 w-0 h-0 border-t-4 border-t-ink border-r-4 border-r-transparent"></span>
                          </span>
                        </div>
                      )}

                      {/* Nav Link Item with active underline matching the reference screenshot */}
                      <a
                        href={link.href}
                        onClick={() => {
                          setActiveDropdown(null);
                        }}
                        className={`relative inline-flex items-center gap-1.5 text-[15px] font-medium tracking-normal pb-1 transition-colors duration-200 cursor-pointer ${
                          isDropdownOpen
                            ? "text-brand"
                            : "text-ink hover:text-brand"
                        }`}
                      >
                        <span>{link.name}</span>
                        {link.hasDropdown && (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveDropdown(
                                activeDropdown === link.name ? null : link.name,
                              );
                            }}
                            className="p-0.5 hover:text-brand cursor-pointer"
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isDropdownOpen
                                  ? "rotate-180 text-brand"
                                  : "text-ink-muted group-hover:text-brand"
                              }`}
                            />
                          </span>
                        )}

                        {/* Active indicator underline as seen in screenshots */}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-200 ${
                            isDropdownOpen
                              ? "w-full opacity-100"
                              : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                          }`}
                        />
                      </a>
                    </div>

                    {/* =========================================================
                        A. HOME DROPDOWN: 5 Default Options (Option-1 ... Option-5)
                    ========================================================= */}
                    {link.name === "Home" && link.subItems && (
                      <div
                        className={`hidden lg:block absolute top-full left-0 pt-2 w-52 z-9999 transition-all duration-200 ${
                          isDropdownOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        <div className="bg-surface rounded-md shadow-[0_15px_45px_rgba(0,0,0,0.14)] border border-border-soft py-2">
                          {link.subItems.map((item, idx) => (
                            <a
                              key={idx}
                              href={item.href}
                              className="block px-5 py-2.5 text-[14px] text-ink hover:text-brand hover:bg-cream-light transition-colors duration-150"
                            >
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* =========================================================
                        B. SHOP MEGA MENU: Exact Scanned Columns + Promo Banner
                    ========================================================= */}
                    {link.name === "Shop" && link.megaMenu && (
                      <div
                        className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[94vw] max-w-350 z-9999 transition-all duration-200 ${
                          isDropdownOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        <div className="bg-surface rounded-b-xl shadow-[0_25px_65px_rgba(0,0,0,0.16)] border border-border-soft p-8 lg:p-10 grid grid-cols-12 gap-8">
                          {/* 4 Category Columns */}
                          <div className="col-span-9 grid grid-cols-4 gap-8">
                            {link.megaMenu.categories.map((cat, cIdx) => (
                              <div key={cIdx} className="space-y-4">
                                <a
                                  href="/products"
                                  onClick={() => setActiveDropdown(null)}
                                  className="block text-[15px] font-bold text-ink hover:text-brand tracking-normal font-heading border-b border-border-subtle pb-2 transition-colors cursor-pointer"
                                >
                                  {cat.title}
                                </a>
                                <ul className="space-y-3">
                                  {cat.items.map((item, iIdx) => {
                                    const itemName = typeof item === "object" ? item.name : item;
                                    const itemHref = typeof item === "object" ? item.href : `/products/${String(item).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                                    return (
                                      <li key={iIdx}>
                                        <a
                                          href={itemHref}
                                          onClick={() => setActiveDropdown(null)}
                                          className="text-[13.5px] text-ink-muted hover:text-brand hover:translate-x-1 inline-block transition-all duration-150"
                                        >
                                          {itemName}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Right Promo Banner ("New jewelry" 30% OFF) */}
                          <a
                            href={link.megaMenu.banner.link || "/products/rose-gold-rings"}
                            onClick={() => setActiveDropdown(null)}
                            className="col-span-3 bg-cream-card rounded-lg p-5 flex flex-col items-center justify-center text-center border border-border-soft relative overflow-hidden group/banner"
                          >
                            <div className="relative z-10 w-full flex flex-col items-center">
                              <h3 className="text-2xl font-normal font-heading text-ink mb-3">
                                New jewelry
                              </h3>
                              <div className="relative w-40 h-40 flex items-center justify-center my-2">
                                <img
                                  src={link.megaMenu.banner.image}
                                  alt="New jewelry"
                                  width={400}
                                  height={400}
                                  className="w-full h-full object-contain group-hover/banner:scale-105 transition-transform duration-500 drop-shadow-md rounded-lg"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                              {/* 30% OFF Circular Badge */}
                              <div className="mt-3 px-6 py-2 bg-brand text-surface font-heading font-bold text-lg rounded-full shadow-md">
                                {link.megaMenu.banner.discount}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* =========================================================
                        C. PRODUCTS MEGA MENU: Exact Scanned Columns + Popular Collection
                    ========================================================= */}
                    {link.name === "Products" && link.megaMenu && (
                      <div
                        className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[94vw] max-w-350 z-9999 transition-all duration-200 ${
                          isDropdownOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        <div className="bg-surface rounded-b-xl shadow-[0_25px_65px_rgba(0,0,0,0.16)] border border-border-soft p-8 lg:p-10 grid grid-cols-12 gap-8">
                          {/* 4 Category Columns */}
                          <div className="col-span-7 grid grid-cols-4 gap-6">
                            {link.megaMenu.categories.map((cat, cIdx) => (
                              <div key={cIdx} className="space-y-4">
                                <a
                                  href="/products"
                                  onClick={() => setActiveDropdown(null)}
                                  className="block text-[15px] font-bold text-ink hover:text-brand tracking-normal font-heading border-b border-border-subtle pb-2 transition-colors cursor-pointer"
                                >
                                  {cat.title}
                                </a>
                                <ul className="space-y-3">
                                  {cat.items.map((item, iIdx) => {
                                    const itemName = typeof item === "object" ? item.name : item;
                                    const itemHref = typeof item === "object" ? item.href : `/products/${String(item).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                                    return (
                                      <li key={iIdx}>
                                        <a
                                          href={itemHref}
                                          onClick={() => setActiveDropdown(null)}
                                          className="text-[13.5px] text-ink-muted hover:text-brand hover:translate-x-1 inline-block transition-all duration-150"
                                        >
                                          {itemName}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Right Popular Collection Showcase (with carousel controls & product navigation) */}
                          <div className="col-span-5 pl-4 border-l border-border-subtle">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-[15px] font-bold text-ink font-heading">
                                Popular collection
                              </h4>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11.5px] text-ink-muted font-medium mr-1 select-none">
                                  {Math.floor(popularIndex / 2) + 1} / {Math.ceil(link.megaMenu.popularCollection.length / 2)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handlePrevPopular(link.megaMenu.popularCollection.length)}
                                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-brand hover:text-brand hover:bg-cream-light/60 transition-colors cursor-pointer select-none active:scale-95"
                                  aria-label="Previous products"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleNextPopular(link.megaMenu.popularCollection.length)}
                                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-brand hover:text-brand hover:bg-cream-light/60 transition-colors cursor-pointer select-none active:scale-95"
                                  aria-label="Next products"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* 2 Product Cards per page with slide transition */}
                            <div className="grid grid-cols-2 gap-4">
                              {link.megaMenu.popularCollection
                                .slice(popularIndex, popularIndex + 2)
                                .map((prod) => (
                                <a
                                  key={prod.id}
                                  href={prod.href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveDropdown(null);
                                    setIsMobileMenuOpen(false);
                                    navigate(prod.href);
                                  }}
                                  className="bg-surface border border-border-soft hover:border-brand/50 rounded-lg p-3 hover:shadow-md transition-all group/card flex flex-col justify-between cursor-pointer"
                                >
                                  <div className="relative aspect-square bg-[#f9f8f6] rounded-md overflow-hidden flex items-center justify-center mb-3 p-2">
                                    <img
                                      src={prod.image}
                                      alt={prod.title}
                                      width={400}
                                      height={400}
                                      className="w-full h-full object-contain group-hover/card:scale-108 transition-transform duration-300 select-none"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>

                                  <div>
                                    <h5 className="text-[12.5px] font-bold text-ink uppercase tracking-wide truncate group-hover/card:text-brand transition-colors">
                                      {prod.title}
                                    </h5>
                                    <p className="text-[11.5px] text-ink-soft capitalize mt-0.5">
                                      {prod.category}
                                    </p>

                                    <div className="mt-2 pt-2 border-t border-border-subtle flex items-center justify-between">
                                      <div>
                                        <div className="text-[13px] font-bold text-ink group-hover/card:text-brand transition-colors">
                                          {prod.price}
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] text-star mt-0.5">
                                          <span>★</span>
                                          <span className="text-ink-muted">
                                            ({prod.rating})
                                          </span>
                                        </div>
                                      </div>
                                      <span className="text-[11.5px] font-medium text-brand opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        View →
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* =========================================================
                        D. PAGES DROPDOWN: Exact Scanned Items (About us >, Contact >, Faq's, etc.)
                    ========================================================= */}
                    {link.name === "Pages" && link.subItems && (
                      <div
                        className={`hidden lg:block absolute top-full left-0 pt-2 w-64 z-9999 transition-all duration-200 ${
                          isDropdownOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        <div className="bg-surface rounded-md shadow-[0_15px_45px_rgba(0,0,0,0.14)] border border-border-soft py-3">
                          {link.subItems.map((item, idx) => {
                            const hasSubOptions = item.subOptions && item.subOptions.length > 0;

                            return (
                              <div key={idx} className="relative group/sub">
                                <a
                                  href={item.href}
                                  className="flex items-center justify-between px-6 py-2.5 text-[14.5px] text-ink hover:text-brand hover:bg-cream-light transition-colors duration-150 cursor-pointer"
                                >
                                  <span>{item.title}</span>
                                  {item.hasArrow && (
                                    <ChevronDown className="w-3.5 h-3.5 text-ink-soft group-hover/sub:text-brand group-hover/sub:rotate-180 transition-transform duration-200" />
                                  )}
                                </a>

                                {/* Nested Flyout Submenu on Hover */}
                                {hasSubOptions && (
                                  <div className="hidden lg:block absolute left-full top-0 -ml-1 w-48 z-10000 opacity-0 invisible -translate-x-2 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:pointer-events-auto transition-all duration-200">
                                    <div className="bg-surface rounded-md shadow-[0_15px_45px_rgba(0,0,0,0.16)] border border-border-soft py-2 ml-2">
                                      {item.subOptions.map((sub, sIdx) => (
                                        <a
                                          key={sIdx}
                                          href={sub.href}
                                          className="block px-5 py-2 text-[14px] text-ink hover:text-brand hover:bg-cream-light transition-colors duration-150"
                                        >
                                          {sub.title}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* 3. Right: Action Icons (Mobile: Cart only; Tablet: Search, User, Wishlist, Cart; Desktop: Full) */}
            <div className="flex items-center space-x-2 sm:space-x-5 lg:space-x-7">
              {/* Search Toggle Icon on Tablet */}
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="hidden sm:flex lg:hidden text-ink hover:text-brand p-1 cursor-pointer transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Account / User Icon with Plus sign (hidden on mobile < 640px, shown on sm+) */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex text-ink hover:text-brand transition-colors duration-200 items-center justify-center relative p-1 group cursor-pointer"
                title="My Account / Sign in"
                aria-label="Account"
              >
                <div className="relative">
                  <User className="w-5.25 h-5.25 stroke-[1.6] group-hover:scale-105 transition-transform" />
                  <Plus className="w-2.5 h-2.5 stroke-[2.5] text-ink group-hover:text-brand absolute -bottom-0.5 -right-1 transition-colors" />
                </div>
              </button>

              {/* Wishlist Icon with Counter (hidden on mobile < 640px, shown on sm+) */}
              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="hidden sm:flex text-ink hover:text-brand transition-colors duration-200 items-center gap-1.5 p-1 group cursor-pointer"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <div className="relative flex items-center gap-1">
                  <Heart className="w-5.25 h-5.25 stroke-[1.6] group-hover:scale-105 transition-transform" />
                  <span className="text-[14px] font-normal text-ink group-hover:text-brand transition-colors">
                    ({wishlistCount})
                  </span>
                </div>
              </button>

              {/* Shopping Bag Icon with Dynamic Counter (Shown on ALL screen sizes: mobile, tablet, desktop) */}
              <button
                type="button"
                onClick={openCart}
                className="text-ink hover:text-brand transition-colors duration-200 flex items-center gap-1.5 p-1 group cursor-pointer"
                title="Shopping Bag"
                aria-label="Cart"
              >
                <div className="relative flex items-center gap-1">
                  <ShoppingBag className="w-5.25 h-5.25 stroke-[1.6] group-hover:scale-105 transition-transform" />
                  <span className="text-[14px] font-normal text-ink group-hover:text-brand transition-colors">
                    ({totalCount})
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Tablet Expandable Search Input Bar */}
          {isMobileSearchOpen && (
            <div className="sm:block lg:hidden px-4 py-2.5 bg-cream-light border-t border-border-soft animate-in slide-in-from-top duration-200">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  id="tablet-search-input"
                  name="search"
                  autoComplete="off"
                  placeholder="Search our store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface rounded-xs px-4 py-2 pr-16 text-sm border border-border outline-none focus:border-brand text-ink placeholder:text-ink-soft"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand uppercase cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* =========================================================================
            MOBILE SLIDE-OUT MENU DRAWER (Matching Reference Image 2)
        ========================================================================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-10000 bg-black/60 backdrop-blur-xs flex">
            <div className="w-[85vw] max-w-70 sm:max-w-80 bg-surface h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
              <div>
                {/* 1. Drawer Header matching Image 2 */}
                <div className="bg-[#232323] px-5 py-4 flex items-center justify-between">
                  <span className="text-surface font-semibold text-[15px] tracking-wider uppercase">
                    MENU
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-surface hover:text-brand transition-colors p-1 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 2. Navigation Items List matching Image 2 */}
                <nav className="divide-y divide-[#ece7e1]">
                  {navLinks.map((link) => {
                    const isExpanded = !!expandedMobileItems[link.name];
                    const hasChildren = !!(link.subItems || link.megaMenu);

                    return (
                      <div key={link.name} className="bg-surface">
                        {/* Main Link Row */}
                        <div className="flex items-center justify-between px-5 py-3.5 hover:bg-cream-light/40 transition-colors">
                          <a
                            href={link.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                            }}
                            className="text-[15px] font-medium text-ink hover:text-brand transition-colors flex-1"
                          >
                            {link.name}
                          </a>

                          {hasChildren && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMobileItem(link.name);
                              }}
                              className="p-1 text-ink hover:text-brand transition-colors cursor-pointer flex items-center justify-center"
                              aria-label={`Toggle ${link.name} submenu`}
                            >
                              {link.name === "Pages" ? (
                                <span className="w-6 h-6 border border-ink/40 rounded-xs flex items-center justify-center text-ink text-xs font-semibold">
                                  {isExpanded ? "−" : "+"}
                                </span>
                              ) : isExpanded ? (
                                <Minus className="w-4.5 h-4.5 stroke-[1.8]" />
                              ) : (
                                <Plus className="w-4.5 h-4.5 stroke-[1.8]" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Sub Menu / Accordion Content */}
                        {hasChildren && isExpanded && (
                          <div className="bg-cream-light/50 border-t border-border-subtle divide-y divide-border-subtle animate-in fade-in duration-200">
                            {/* Simple Sub Items (Home, Pages) */}
                            {link.subItems &&
                              link.subItems.map((sub, sIdx) => {
                                const hasSubOptions = sub.subOptions && sub.subOptions.length > 0;
                                const isSubExpanded = !!expandedMobileItems[`sub-${sub.title}`];

                                return (
                                  <div key={sIdx} className="bg-transparent">
                                    <div className="flex items-center justify-between pl-8 pr-5 py-2.5 text-[14px] text-ink-muted hover:text-brand hover:bg-cream-light transition-colors">
                                      <a
                                        href={sub.href}
                                        onClick={() => {
                                          if (!hasSubOptions) {
                                            setIsMobileMenuOpen(false);
                                          } else {
                                            toggleMobileItem(`sub-${sub.title}`);
                                          }
                                        }}
                                        className="flex-1"
                                      >
                                        {sub.title}
                                      </a>
                                      {hasSubOptions && (
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMobileItem(`sub-${sub.title}`);
                                          }}
                                          className="p-1 cursor-pointer"
                                        >
                                          <ChevronDown
                                            className={`w-3.5 h-3.5 text-ink-soft transition-transform duration-200 ${
                                              isSubExpanded ? "rotate-180 text-brand" : ""
                                            }`}
                                          />
                                        </button>
                                      )}
                                    </div>

                                    {/* Nested Options on Mobile */}
                                    {hasSubOptions && isSubExpanded && (
                                      <div className="bg-cream-light pl-12 pr-5 py-1 space-y-1.5 border-t border-border-subtle animate-in fade-in duration-150">
                                        {sub.subOptions.map((opt, oIdx) => (
                                          <a
                                            key={oIdx}
                                            href={opt.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-1 text-[13px] text-ink-muted hover:text-brand transition-colors"
                                          >
                                            {opt.title}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                            {/* Mega Menu Categories (Shop & Products) */}
                            {link.megaMenu && (
                              <div className="p-4 space-y-4">
                                {link.megaMenu.categories.map((cat, cIdx) => (
                                  <div key={cIdx} className="space-y-1.5">
                                    <h5 className="text-[13px] font-bold text-ink uppercase tracking-wider font-heading pb-1 border-b border-border-subtle">
                                      {cat.title}
                                    </h5>
                                    <ul className="space-y-1 pl-2">
                                      {cat.items.map((item, iIdx) => {
                                        const itemName = typeof item === "object" ? item.name : item;
                                        const itemHref = typeof item === "object" ? item.href : `/products/${String(item).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                                        return (
                                          <li key={iIdx}>
                                            <a
                                              href={itemHref}
                                              onClick={() =>
                                                setIsMobileMenuOpen(false)
                                              }
                                              className="block py-1 text-[13px] text-ink-muted hover:text-brand transition-colors"
                                            >
                                              {itemName}
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}

                                {/* Mobile Popular Collection Showcase */}
                                {link.megaMenu.popularCollection && (
                                  <div className="pt-3 border-t border-border-subtle">
                                    <h5 className="text-[13px] font-bold text-ink uppercase tracking-wider font-heading mb-3">
                                      Popular Collection
                                    </h5>
                                    <div className="grid grid-cols-2 gap-2.5">
                                      {link.megaMenu.popularCollection.slice(0, 4).map((prod) => (
                                        <a
                                          key={prod.id}
                                          href={prod.href}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setIsMobileMenuOpen(false);
                                            navigate(prod.href);
                                          }}
                                          className="bg-surface border border-border-soft rounded-lg p-2.5 flex flex-col justify-between group/mcard cursor-pointer"
                                        >
                                          <div className="aspect-square bg-[#f9f8f6] rounded overflow-hidden flex items-center justify-center mb-2 p-1.5">
                                            <img
                                              src={prod.image}
                                              alt={prod.title}
                                              width={200}
                                              height={200}
                                              className="w-full h-full object-contain group-hover/mcard:scale-105 transition-transform"
                                              loading="lazy"
                                              decoding="async"
                                            />
                                          </div>
                                          <div>
                                            <div className="text-[11.5px] font-bold text-ink uppercase truncate group-hover/mcard:text-brand">
                                              {prod.title}
                                            </div>
                                            <div className="text-[11px] text-ink font-semibold mt-0.5">
                                              {prod.price}
                                            </div>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* 2.5 Mobile Wishlist Row */}
                  <div className="border-b border-[#ece7e1] bg-white">
                    <a
                      href="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-ink hover:text-brand transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Heart className="w-4.5 h-4.5 text-brand stroke-[1.8]" />
                        <span>Wishlist</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-[#faf7f2] text-brand border border-border-soft rounded-xs">
                        {wishlistCount}
                      </span>
                    </a>
                  </div>

                  {/* 3. Currency Selector Row matching Image 2 */}
                  <div className="bg-cream-light border-b border-[#ece7e1]">
                    <button
                      type="button"
                      onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-ink hover:text-brand transition-colors cursor-pointer"
                    >
                      <span>{selectedCurrency}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-ink-muted transition-transform duration-200 ${
                          isCurrencyOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isCurrencyOpen && (
                      <div className="bg-surface border-t border-border-subtle py-1 shadow-inner">
                        {["INR ₹", "USD $", "EUR €", "GBP £", "AUD $"].map(
                          (curr) => (
                            <button
                              key={curr}
                              type="button"
                              onClick={() => {
                                setSelectedCurrency(curr);
                                setIsCurrencyOpen(false);
                              }}
                              className={`w-full text-left px-8 py-2 text-[13.5px] transition-colors cursor-pointer ${
                                selectedCurrency === curr
                                  ? "text-brand font-semibold bg-cream-light"
                                  : "text-ink-muted hover:text-brand hover:bg-cream-light/60"
                              }`}
                            >
                              {curr}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </nav>
              </div>

              {/* 4. Drawer Bottom Action */}
              <div className="p-5 border-t border-border-soft bg-surface">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-ink text-surface rounded-xs text-sm font-medium hover:bg-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Account</span>
                </button>
              </div>
            </div>

            {/* Backdrop Dismiss */}
            <div
              className="flex-1"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}
      </header>

      {/* =========================================================================
          SIGN IN / ACCOUNT MODAL
      ========================================================================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-10000 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 border border-border-soft">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-ink-soft hover:text-ink cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img
                src={logoImg}
                alt="JELWO"
                width={260}
                height={59}
                className="h-8 mx-auto mb-3 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-xl font-bold text-ink font-heading">
                Welcome to JELWO
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Sign in to manage your orders, wishlist, and bespoke
                appointments.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAuthModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="auth-email-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="auth-email-input"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 text-sm bg-cream-light border border-border rounded-lg outline-none focus:border-brand text-ink placeholder:text-ink-soft"
                  required
                />
              </div>
              <div>
                <label htmlFor="auth-password-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="auth-password-input"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-sm bg-cream-light border border-border rounded-lg outline-none focus:border-brand text-ink placeholder:text-ink-soft"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-ink-muted">
                <label htmlFor="auth-remember-checkbox" className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="auth-remember-checkbox"
                    name="rememberMe"
                    className="rounded accent-brand"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:text-brand transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-ink hover:bg-brand text-surface text-sm font-semibold rounded-lg transition-colors mt-2 cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border-subtle text-center text-xs text-ink-muted">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-semibold text-brand hover:underline"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
