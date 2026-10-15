import { teamData } from "../../data/about";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * AboutTeamSection (Section-6 of About-1 Page)
 * Displays the team showcase grid with zoom-on-hover effects and responsive columns.
 */
export default function AboutTeamSection({
  subtitle = "HIGHLIY SKILLED",
  title = "Meet our teams",
  team = teamData,
}) {
  return (
    <section className="w-full bg-surface py-14 sm:py-18 lg:py-24 font-sans overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <span className="text-brand-terracotta text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase mb-2.5 sm:mb-3.5 inline-block">
              {subtitle}
            </span>
            <h2 className="font-della text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] text-ink font-normal leading-[1.2] tracking-tight">
              {title}
            </h2>
          </div>
        </Reveal>

        {/* Responsive 4-Column Team Grid */}
        <div className="w-full max-w-345 mx-auto">
          <Stagger
            staggerDelay={0.06}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
          >
            {team.map((member) => (
              <StaggerItem
                key={member.id}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Member Portrait Image with Zoom on Hover */}
                <div className="relative w-full aspect-4/5 sm:aspect-3.5/4 lg:aspect-[3.6/4] overflow-hidden rounded-xs bg-[#f2ede7] shadow-xs">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={450}
                    height={580}
                    className="w-full h-full object-cover object-top block transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Member Details */}
                <div className="mt-5 sm:mt-6 text-center">
                  <h3 className="font-della text-base sm:text-lg lg:text-[19px] text-ink uppercase tracking-wide font-normal mb-1 transition-colors duration-300 group-hover:text-brand-terracotta">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-ink-muted capitalize tracking-normal font-sans">
                    {member.role}
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
