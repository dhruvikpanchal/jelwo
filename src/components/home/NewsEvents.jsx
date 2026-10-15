import { mockNews } from "@/data/home/news";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";
const newsArticles = mockNews;

export default function NewsEvents() {
  return (
    <section className="w-full bg-surface section-spacing font-sans overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <Reveal direction="up" distance={20}>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-brand-terracotta text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-2.5 block">
              JEWELRY NEWS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-ink font-normal tracking-tight">
              News and events
            </h2>
          </div>
        </Reveal>

        {/* 3-Column News Grid */}
        <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsArticles.map((article) => (
            <StaggerItem key={article.id} direction="up" distance={20} className="h-full">
              <article
                className="group bg-[#faf7f2] hover:bg-[#f6f2ec] transition-colors duration-300 p-6 sm:p-7 xl:p-8 flex flex-col items-center text-center rounded-xs h-full"
              >
                {/* Date & Author Meta */}
                <div className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase mb-5">
                  <span>{article.date}</span>
                  <span className="mx-2 text-ink-soft/60">|</span>
                  <span>BY {article.author}</span>
                </div>

                {/* Image Container with Hover Arrow Effect */}
                <a
                  href={article.link}
                  className="relative w-full aspect-4/3 overflow-hidden block bg-cream-card mb-6 group/img cursor-pointer"
                >
                  {/* Main Article Image */}
                  <img
                    src={article.image}
                    alt={article.alt}
                    width={832}
                    height={556}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Hover Overlay with Centered White Square Arrow Button */}
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white shadow-md flex items-center justify-center text-brand-terracotta transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/img:translate-x-0.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Title & Excerpt */}
                <div className="flex flex-col items-center">
                  <h3 className="font-sans text-sm sm:text-[15px] font-bold tracking-wider text-ink uppercase mb-2.5 transition-colors duration-300 group-hover:text-brand-terracotta">
                    <a href={article.link} className="hover:underline">
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-ink-muted leading-relaxed max-w-85">
                    {article.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
