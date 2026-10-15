import { contactPillarsData } from "../../data/contactPillars";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * ContactPillarsSection (Section-3 of Contact-2 Page)
 * Displays 3-column compact highlight pillars between sections with low vertical padding.
 */
export default function ContactPillarsSection({ items = contactPillarsData }) {
  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 font-sans">
      <div className="site-container">
        <div className="w-full max-w-6xl mx-auto">
          {/* Responsive 3-Column Highlights Grid */}
          <Stagger
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 text-center"
          >
            {items.map((item) => (
              <StaggerItem
                key={item.id}
                className="flex flex-col items-center justify-start px-3 sm:px-4"
              >
                {/* Pillar Heading */}
                <h3 className="font-della text-base sm:text-lg lg:text-[20px] font-normal text-ink uppercase tracking-wide mb-2 sm:mb-2.5 leading-snug">
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
