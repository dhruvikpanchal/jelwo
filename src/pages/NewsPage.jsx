import { useEffect, useState, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import { blogData } from "@/data/news";
import { useRouter } from "@/hooks/useRouter";
import NewsSidebar from "@/components/news/NewsSidebar";
import { getStoredCommentCount } from "@/data/newsComments";
import Reveal from "@/components/animation/Reveal";

// Lazy-load below-the-fold comments section and interactive form
const NewsCommentsSection = lazy(() => import("@/components/news/NewsCommentsSection"));

// Custom Filter & Close SVGs for 100% reliable rendering across all screens
const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function NewsPage({ onNavigateHome }) {
  const { currentPath } = useRouter();

  // Match the active article from currentPath URL or fallback to first/default item
  const cleanPath = currentPath.toLowerCase();
  const pathSlug = cleanPath.split("/").pop();

  const currentArticle =
    blogData.find((item) => {
      const itemUrl = (item.url || "").toLowerCase();
      const itemSlug = (item.slug || "").toLowerCase();
      return (
        itemUrl === cleanPath ||
        (itemSlug && pathSlug === itemSlug) ||
        (itemSlug && cleanPath.endsWith(itemSlug))
      );
    }) || blogData[0];

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(() =>
    getStoredCommentCount(currentArticle.slug)
  );
  const [prevSlug, setPrevSlug] = useState(currentArticle.slug);

  // Sync comment count & reset drawer when active article changes
  if (prevSlug !== currentArticle.slug) {
    setPrevSlug(currentArticle.slug);
    setCommentCount(getStoredCommentCount(currentArticle.slug));
    setIsMobileSidebarOpen(false);
  }

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  // Format dynamic comment count text
  const commentCountText =
    commentCount === 1 ? "1 comment" : `${commentCount} comments`;

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b] overflow-x-clip">
      {/* 1. Page Header Breadcrumb Banner: "HOME - NEWS" & "News" */}
      <PageBanner
        title="News"
        breadcrumb="NEWS"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Layout Container: Left Sticky Sidebar + Right Article */}
      <section className="site-container py-10 sm:py-14 lg:py-18">
        {/* Tablet / Mobile Filter Toggle Bar (< 1024px) */}
        <div className="lg:hidden mb-6 sm:mb-8 flex items-center justify-between border-b border-[#e5e5e5] pb-3.5">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#faf7f2] hover:bg-[#ca7b64] hover:text-white border border-[#e5e5e5] text-xs font-semibold uppercase tracking-wider text-[#1c1b1b] transition-all duration-200 cursor-pointer shadow-2xs group"
            aria-label="Open sidebar filter"
          >
            <FilterIcon className="w-4 h-4 text-[#ca7b64] group-hover:text-white transition-colors" />
            <span>Filter / Sidebar</span>
          </button>

          <span className="text-xs text-[#717171] font-medium">
            {commentCountText}
          </span>
        </div>

        {/* Responsive Grid with Desktop Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start relative">
          {/* Desktop Left Column (Sticky Sidebar) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-4 lg:sticky lg:top-24 xl:top-28 self-start z-10">
            <Reveal direction="right" delay={0.05} duration={0.6}>
              <div className="w-full pr-2">
                <NewsSidebar currentSlug={currentArticle.slug} />
              </div>
            </Reveal>
          </aside>

          {/* Right Side Main Article Box */}
          <main className="lg:col-span-8 xl:col-span-8 w-full min-w-0">
            <Reveal direction="up" delay={0.05} duration={0.6}>
              <article className="w-full">
              {/* Top Main Featured Image */}
              <div className="w-full mb-6 sm:mb-8 overflow-hidden bg-[#faf7f2]">
                <img
                  src={currentArticle.mainImage}
                  alt={currentArticle.title}
                  width={832}
                  height={556}
                  className="w-full h-auto object-cover max-h-137.5"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Article Meta Bar */}
              <div className="text-xs sm:text-[13px] text-[#717171] font-normal mb-3 flex items-center flex-wrap gap-2 select-none">
                <span>{currentArticle.date}</span>
                <span className="text-[#a0a0a0]">/</span>
                <span>By {currentArticle.author}</span>
                <span className="text-[#a0a0a0]">/</span>
                <span className="text-[#ca7b64] font-medium">{commentCountText}</span>
              </div>

              {/* Article Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1c1b1b] font-normal tracking-tight mb-5 sm:mb-6 leading-snug">
                {currentArticle.title}
              </h1>

              {/* Description Paragraphs 1 & 2 */}
              <div className="space-y-4 sm:space-y-5 text-xs sm:text-[13.5px] lg:text-sm text-[#717171] leading-relaxed font-normal">
                {currentArticle.description &&
                  currentArticle.description.slice(0, 2).map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
              </div>

              {/* Content Images Side-by-Side */}
              {currentArticle.contentImages &&
                currentArticle.contentImages.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8">
                    {currentArticle.contentImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-full overflow-hidden bg-[#faf7f2]"
                      >
                        <img
                          src={img}
                          alt={`Article detail image ${idx + 1}`}
                          width={472}
                          height={503}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                )}

              {/* Quote Block with Terracotta Quote Mark */}
              {currentArticle.quote && (
                <div className="my-8 sm:my-10 flex items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-transparent border-l-4 border-[#ca7b64]">
                  <span className="text-[#ca7b64] shrink-0 font-serif text-4xl sm:text-5xl leading-none select-none font-bold">
                    “
                  </span>
                  <blockquote className="font-sans italic font-bold text-sm sm:text-base lg:text-[17px] text-[#1c1b1b] leading-relaxed">
                    {currentArticle.quote}
                  </blockquote>
                </div>
              )}

              {/* Description Paragraph 3 */}
              <div className="space-y-4 sm:space-y-5 text-xs sm:text-[13.5px] lg:text-sm text-[#717171] leading-relaxed font-normal my-5">
                {currentArticle.description &&
                  currentArticle.description.slice(2).map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
              </div>

              {/* Tags Row */}
              {currentArticle.tags && currentArticle.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2.5 my-6 sm:my-8">
                  {currentArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border border-[#e5e5e5] px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1c1b1b] hover:border-[#ca7b64] hover:text-[#ca7b64] transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Share Icons */}
              <div className="flex items-center gap-4 my-6 text-[#1c1b1b]">
                {/* Facebook */}
                <a
                  href="#facebook"
                  className="text-[#3b5998] hover:opacity-80 transition-opacity p-1"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="#twitter"
                  className="text-[#000000] hover:text-[#ca7b64] transition-colors p-1"
                  aria-label="Share on X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="#pinterest"
                  className="text-[#bd081c] hover:opacity-80 transition-opacity p-1"
                  aria-label="Share on Pinterest"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>

              {/* Divider Line */}
              <div className="border-t border-[#e5e5e5] my-8" />

              {/* Prev / Next Post Navigation */}
              <div className="flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-[#1c1b1b]">
                {currentArticle.prevPost ? (
                  <a
                    href={currentArticle.prevPost}
                    className="flex items-center gap-2 text-[#1c1b1b] hover:text-[#ca7b64] transition-colors group cursor-pointer"
                  >
                    <span className="transition-transform group-hover:-translate-x-1">
                      ←
                    </span>
                    <span>PREV POST</span>
                  </a>
                ) : (
                  <div />
                )}

                {currentArticle.nextPost ? (
                  <a
                    href={currentArticle.nextPost}
                    className="flex items-center gap-2 text-[#1c1b1b] hover:text-[#ca7b64] transition-colors group cursor-pointer"
                  >
                    <span>NEXT POST</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                ) : (
                  <div />
                )}
              </div>

              {/* ======================================================== */}
              {/* LAZY-LOADED COMMENTS DISPLAY & FORM                      */}
              {/* ======================================================== */}
              <Suspense
                fallback={
                  <div className="mt-14 pt-8 border-t border-[#e5e5e5] py-8 text-center text-xs text-gray-400">
                    Loading discussion...
                  </div>
                }
              >
                <NewsCommentsSection
                  currentArticle={currentArticle}
                  onCommentCountChange={setCommentCount}
                />
              </Suspense>
            </article>
          </Reveal>
        </main>
        </div>
      </section>

      {/* 3. Mobile / Tablet Slide-Out Sidebar Drawer Modal (< 1024px) */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-99999 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-[85vw] max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#e5e5e5] flex items-center justify-between bg-[#faf7f2]">
              <span className="font-serif text-lg font-medium text-[#1c1b1b]">
                Sidebar & Filters
              </span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 text-[#1c1b1b] hover:text-[#ca7b64] transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <NewsSidebar currentSlug={currentArticle.slug} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
