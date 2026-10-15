import { blogData } from "../../data/blog";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

// Helper function to format meta text exactly like reference screenshots: "10, MAR 2025 | BY ANDREW JOHNS"
const formatBlogDate = (item) => {
  if (item.displayDate) {
    const parts = item.displayDate.replace(",", "").split(" ");
    if (parts.length >= 3) {
      return `${parts[0]}, ${parts[1].toUpperCase()} ${parts[2]}`;
    }
    return item.displayDate.toUpperCase();
  }
  if (item.date) {
    return item.date.toUpperCase();
  }
  return "02, MAR 2025";
};

export default function BlogGridSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 font-sans">
      <div className="site-container">
        {/* Responsive 3-Column Blog Grid */}
        <Stagger
          staggerDelay={0.06}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8"
        >
          {blogData.map((blog) => {
            const dateText = formatBlogDate(blog);
            const authorText = blog.author ? `BY ${blog.author.toUpperCase()}` : "BY ANDREW JOHNS";

            return (
              <StaggerItem
                key={blog.id}
                className="group bg-[#faf7f2] hover:bg-[#f6f2ec] transition-colors duration-300 p-6 sm:p-7 xl:p-8 flex flex-col items-center text-center rounded-xs"
              >
                {/* 1. Date & Author Meta at the top */}
                <div className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase mb-5 select-none">
                  <span>{dateText}</span>
                  <span className="mx-2 text-ink-soft/60">|</span>
                  <span>{authorText}</span>
                </div>

                {/* 2. Image Container with Zoom, Dark Overlay & Centered Arrow Button on Hover */}
                <a
                  href={blog.href || "#"}
                  className="relative w-full aspect-4/3 overflow-hidden block bg-cream-card mb-6 group/img cursor-pointer"
                  aria-label={blog.title}
                >
                  {/* Main Article Image with smooth zoom on hover */}
                  <img
                    src={blog.image}
                    alt={blog.alt || blog.title}
                    width={832}
                    height={556}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover/img:scale-108"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Darkened Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {/* Centered White Square Box with Terracotta Arrow Button */}
                    <div className="w-11 h-11 bg-white shadow-md flex items-center justify-center text-[#ca7b64] transform scale-75 group-hover:scale-100 group-hover/img:scale-100 opacity-0 group-hover:opacity-100 group-hover/img:opacity-100 transition-all duration-300 ease-out">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 transition-transform duration-300 group-hover/img:translate-x-0.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* 3. Title & Description Excerpt */}
                <div className="flex flex-col items-center flex-1 justify-between w-full">
                  <h2 className="font-sans text-sm sm:text-[15px] font-bold tracking-wider text-ink uppercase mb-2.5 transition-colors duration-300 group-hover:text-[#ca7b64]">
                    <a href={blog.href || "#"} className="hover:underline">
                      {blog.title}
                    </a>
                  </h2>

                  <p className="text-xs sm:text-[13px] text-ink-muted leading-relaxed max-w-85 line-clamp-3">
                    {blog.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
