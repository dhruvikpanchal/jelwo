
import { mockCategories } from "@/data/home/categories";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";
const categories = mockCategories;

export default function JewelryCollection() {
  return (
    <section className="w-full bg-surface section-spacing font-sans">
      <div className="site-container">
        {/* Section Header */}
        <Reveal direction="up" distance={20}>
          <div className="section-header">
            <span className="section-subtitle">
              JEWELRY COLLECTION
            </span>
            <h2 className="section-title">
              Shop by category
            </h2>
          </div>
        </Reveal>

        {/* Categories Grid (Responsive: 2 cols on mobile, 3 cols on tablet, 6 cols on desktop) */}
        <Stagger staggerDelay={0.05} className="grid-responsive-6">
          {categories.map((category) => (
            <StaggerItem key={category.id} direction="up" distance={20}>
              <a
                href={category.link}
                className="group block bg-cream-card hover:bg-cream transition-all duration-300 rounded-xs overflow-hidden border border-border-soft/60 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] h-full"
              >
                {/* Top Area with Circular Badge for Jewelry Image */}
                <div className="pt-4 sm:pt-8 md:pt-10 px-2 sm:px-4 text-center">
                  <div className="w-22 h-22 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full bg-surface mx-auto flex items-center justify-center p-2 sm:p-3 shadow-xs transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={category.image}
                      alt={category.title}
                      width={512}
                      height={512}
                      className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 xl:w-32 xl:h-32 object-contain transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Items Count */}
                  <p className="body-small text-center mt-3 sm:mt-6 mb-2.5 sm:mb-4 text-xs sm:text-sm">
                    {category.itemsCount}
                  </p>
                </div>

                {/* Bottom Category Name / Hover "SHOP NOW" button */}
                <div className="relative border-t border-border-soft/80 py-2.5 sm:py-4 px-1 sm:px-2 text-center transition-all duration-300 bg-cream-card/60 group-hover:bg-brand-terracotta group-hover:border-transparent overflow-hidden">
                  {/* Default Category Name */}
                  <span className="block text-[11px] sm:text-[13px] font-bold tracking-[0.12em] sm:tracking-[0.15em] text-ink uppercase transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 truncate">
                    {category.title}
                  </span>

                  {/* Hover SHOP NOW Text */}
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] sm:text-[13px] font-bold tracking-[0.12em] sm:tracking-[0.15em] text-surface uppercase translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    SHOP NOW
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

