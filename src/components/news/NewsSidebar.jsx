import { useState } from "react";
import { Search, Mail } from "lucide-react";
import { blogData } from "../../data/news";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

// Instagram feed images from src/assets/images/news
import insta1 from "../../assets/images/news/jewelry-3-insta-1.webp";
import insta2 from "../../assets/images/news/jewelry-3-insta-2.webp";
import insta3 from "../../assets/images/news/jewelry-3-insta-3.webp";
import insta4 from "../../assets/images/news/jewelry-3-insta-4.webp";
import insta5 from "../../assets/images/news/jewelry-3-insta-5.webp";
import insta6 from "../../assets/images/news/jewelry-3-insta-6.webp";

const instagramImages = [insta1, insta2, insta3, insta4, insta5, insta6];

const allTags = ["ACCESSORIES", "BLOG", "CLOTHING", "FASHION", "HANDMAD"];

export default function NewsSidebar({ currentSlug = "" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ACCESSORIES");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Recent 3 posts from blogData
  const recentPosts = blogData.slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Client-side search or navigate
    console.log("Search query:", searchQuery);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <aside className="w-full space-y-10 sm:space-y-12 font-sans select-none">
      {/* 1. Search Bar */}
      <div className="w-full">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center border-b border-[#e5e5e5] pb-2 group focus-within:border-[#ca7b64] transition-colors"
        >
          <input
            id="news-sidebar-search"
            name="search"
            aria-label="Search articles"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#1c1b1b] placeholder:text-[#999999] outline-none pr-8 font-normal"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1c1b1b] hover:text-[#ca7b64] transition-colors cursor-pointer p-1"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[1.8]" />
          </button>
        </form>
      </div>

      {/* 2. Recent Posts Widget */}
      <div>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1b1b] font-normal mb-6 tracking-tight">
          Recent posts
        </h3>

        <Stagger staggerDelay={0.06} className="space-y-5">
          {recentPosts.map((post) => {
            const isCurrent =
              post.slug === currentSlug ||
              (currentSlug && post.url.includes(currentSlug));

            return (
              <StaggerItem key={post.id} direction="up" distance={16}>
                <a
                  href={post.url}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  {/* Thumbnail Image */}
                  <div className="w-20 h-14 sm:w-22 sm:h-15 shrink-0 overflow-hidden bg-[#faf7f2]">
                    <img
                      src={post.mainImage}
                      alt={post.title}
                      width={832}
                      height={556}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] sm:text-xs text-[#717171] uppercase tracking-wider block mb-1">
                      {post.date?.toUpperCase() || "MAR 02, 2025"}
                    </span>
                    <h4
                      className={`text-xs sm:text-[13.5px] font-normal leading-snug line-clamp-2 transition-colors ${
                        isCurrent
                          ? "text-[#ca7b64] font-medium"
                          : "text-[#1c1b1b] group-hover:text-[#ca7b64]"
                      }`}
                    >
                      {post.title}
                    </h4>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      {/* 3. Tags Widget */}
      <div>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1b1b] font-normal mb-5 tracking-tight">
          Tags
        </h3>

        <div className="flex items-center flex-wrap gap-2.5">
          {allTags.map((tag, idx) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#ca7b64] text-white border border-[#ca7b64] shadow-xs"
                    : "border border-[#e5e5e5] text-[#1c1b1b] hover:border-[#ca7b64] hover:text-[#ca7b64] bg-white"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Newsletter Widget */}
      <div>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1b1b] font-normal mb-5 tracking-tight">
          Newsletter
        </h3>

        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
          <div className="relative flex items-center border-b border-[#e5e5e5] pb-2 group focus-within:border-[#ca7b64] transition-colors">
            <input
              id="news-sidebar-newsletter-email"
              name="email"
              autoComplete="email"
              aria-label="Newsletter email"
              type="email"
              required
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-[#1c1b1b] placeholder:text-[#999999] outline-none pr-8 font-normal"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1c1b1b] hover:text-[#ca7b64] transition-colors cursor-pointer p-1"
              aria-label="Subscribe"
            >
              <Mail className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>

          {newsletterSubscribed && (
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              Thank you for subscribing!
            </p>
          )}
        </form>
      </div>

      {/* 5. Instagram Widget */}
      <div>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1b1b] font-normal mb-5 tracking-tight">
          Instagram
        </h3>

        <Stagger staggerDelay={0.05} className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {instagramImages.map((img, idx) => (
            <StaggerItem key={idx} direction="zoom">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden bg-[#faf7f2] block group cursor-pointer"
                aria-label={`Instagram photo ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Instagram feed ${idx + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </aside>
  );
}
