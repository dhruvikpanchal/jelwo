import { aboutStatsData } from "../../data/aboutStats";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * AboutStatsSection (Section-3 of About-1 Page)
 * Displays three responsive achievement / company milestone highlight columns mapped from data.
 */
export default function AboutStatsSection({ stats = aboutStatsData }) {
  return (
    <section className="w-full bg-surface pb-16 sm:pb-20 lg:pb-24 pt-4 sm:pt-6 font-sans">
      <div className="site-container">
        <div className="w-full max-w-345 mx-auto">
          {/* Responsive 3-Column Grid */}
          <Stagger
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
          >
            {stats.map((item) => (
              <StaggerItem key={item.id} direction="up" distance={20}>
                <div
                  className="text-center flex flex-col items-center justify-start px-2 sm:px-4"
                >
                  {/* Milestone Stat / Title */}
                  <h3 className="font-della text-base sm:text-lg lg:text-[20px] xl:text-[22px] font-normal text-ink uppercase tracking-wide mb-3 sm:mb-4 leading-snug">
                    {item.title}
                  </h3>

                  {/* Milestone Description */}
                  <p className="text-xs sm:text-sm lg:text-[14.5px] text-ink-muted leading-relaxed max-w-md mx-auto">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
