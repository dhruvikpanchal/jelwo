import { Truck, RotateCw, DollarSign } from "lucide-react";
import { aboutFeaturesData } from "../../data/about";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * AboutFeaturesSection (Section-7 of About-1 Page)
 * Displays responsive 3-column service guarantee highlights with circular terracotta iconography.
 */
export default function AboutFeaturesSection({ features = aboutFeaturesData }) {
  // Helper to render appropriate Lucide icon with luxury line styling
  const renderIcon = (type) => {
    switch (type) {
      case "truck":
        return <Truck className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
      case "returns":
        return <RotateCw className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
      case "secure":
        return <DollarSign className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
      default:
        return <Truck className="w-8 h-8 sm:w-9 sm:h-9 text-brand-terracotta stroke-[1.5]" />;
    }
  };

  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-24 font-sans">
      <div className="site-container">
        <div className="w-full max-w-6xl mx-auto">
          {/* Responsive 3-Column Highlights Grid */}
          <Stagger
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16"
          >
            {features.map((item) => (
              <StaggerItem
                key={item.id}
                className="flex flex-col items-center text-center group cursor-pointer px-4"
              >
                {/* Circular Icon Container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#f6f2ee] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-[#f2eae1] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
                  {renderIcon(item.icon)}
                </div>

                {/* Feature Title */}
                <h3 className="font-della text-base sm:text-lg lg:text-[20px] font-normal text-ink uppercase tracking-wide mt-6 sm:mt-7 mb-2 sm:mb-2.5 leading-snug transition-colors duration-300 group-hover:text-brand-terracotta">
                  {item.title}
                </h3>

                {/* Feature Description */}
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
