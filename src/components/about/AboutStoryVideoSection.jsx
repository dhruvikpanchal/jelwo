import { Play } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

/**
 * AboutStoryVideoSection (Section for About-2 Page)
 * Displays brand story introductory text with a horizontal divider line and an infinitely rotating circular badge linking to YouTube.
 */
export default function AboutStoryVideoSection({
  subtitle = "SINCE 1982 OUR STORY",
  description = "In early 1982, founder and creative director had the idea to design a bag collection where comfort, fashion, and distinction are key. was born a bag brand that believes fashion should go hand in hand with comfort.",
  videoUrl = "https://www.youtube.com/watch?v=0Aja_yP93PY",
  circularText = "ESTD 1982 • OUR BIG COLLECTIONS •",
}) {
  return (
    <section className="w-full bg-white pt-14 sm:pt-18 lg:pt-22 pb-16 sm:pb-20 lg:pb-24 font-sans overflow-hidden">
      <div className="site-container">
        <Reveal direction="up">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Subtitle */}
            <span className="text-brand-terracotta text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase mb-3.5 sm:mb-4 inline-block">
              {subtitle}
            </span>

            {/* Story Narrative Paragraph */}
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-ink-muted leading-relaxed max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20">
              {description}
            </p>
          </div>
        </Reveal>

        {/* Full-Width Horizontal Line with Centered Clockwise Rotating Badge */}
        <Reveal direction="zoom" delay={0.08}>
          <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center my-2 sm:my-4">
            {/* Subtle Horizontal Divider Line */}
            <div className="w-full h-px bg-border absolute top-1/2 left-0 right-0 -translate-y-1/2" />

            {/* Interactive Rotating Video Link Badge */}
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch video about our collections"
              className="relative z-10 bg-white px-3 sm:px-4 py-1 flex items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 select-none"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center">
                {/* Clockwise Infinitely Rotating Circular Text SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_14s_linear_infinite]"
                >
                  <path
                    id="badgeCirclePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                  <text className="text-[7.2px] uppercase tracking-[0.22em] fill-[#1c1b1b] font-medium">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      {circularText}
                    </textPath>
                  </text>
                </svg>

                {/* Centered Play Triangle Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#1c1b1b] text-[#1c1b1b] ml-0.5 transition-transform duration-300 group-hover:scale-125" />
                </div>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
