import { Target, Crosshair, Headphones } from "lucide-react";
import { aboutMissionVisionData } from "../../data/about";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * AboutMissionVisionSection (Section-4 of About-2 Page)
 * Displays 3-column company pillar cards (Mission, Vision, Support) with circular terracotta icon badges.
 */
export default function AboutMissionVisionSection({
  items = aboutMissionVisionData,
}) {
  const renderIcon = (type) => {
    switch (type) {
      case "target":
        return <Target className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
      case "vision":
        return <Crosshair className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
      case "support":
        return <Headphones className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
      default:
        return <Target className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
    }
  };

  return (
    <section className="w-full bg-[#f8f4ef] py-16 sm:py-20 lg:py-24 font-sans">
      <div className="site-container">
        <div className="w-full max-w-6xl mx-auto">
          {/* Responsive 3-Column Pillars Grid */}
          <Stagger
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16"
          >
            {items.map((item) => (
              <StaggerItem
                key={item.id}
                className="flex flex-col items-center text-center group cursor-pointer px-4"
              >
                {/* Circular White Icon Container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                  {renderIcon(item.icon)}
                </div>

                {/* Pillar Title */}
                <h3 className="font-della text-base sm:text-lg lg:text-[20px] font-normal text-ink uppercase tracking-wide mt-6 sm:mt-7 mb-2.5 sm:mb-3 leading-snug transition-colors duration-300 group-hover:text-brand-terracotta">
                  {item.title}
                </h3>

                {/* Pillar Description */}
                <p className="font-sans text-xs sm:text-[13.5px] text-ink-muted leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
