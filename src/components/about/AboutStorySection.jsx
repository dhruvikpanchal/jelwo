import aboutUsImg from "../../assets/images/about/about-us-1-opt.webp";
import Reveal from "@/components/animation/Reveal";

/**
 * AboutStorySection (Section-2 of About-1 Page)
 * Displays the story subtitle, heading, and high-resolution hero showcase image with interactive zoom hover effect.
 */
export default function AboutStorySection({
  subtitle = "SINCE 1982 OUR STORY",
  title = "Our about story",
  imageSrc = aboutUsImg,
  imageAlt = "Crafting luxury jewelry with precision and care",
}) {
  return (
    <section className="w-full bg-surface py-14 sm:py-18 lg:py-22 font-sans overflow-hidden">
      <div className="site-container">
        {/* Section Header: Subtitle and Main Story Title */}
        <Reveal direction="up">
          <div className="text-center mb-8 sm:mb-11 lg:mb-14">
            <span className="text-brand-terracotta text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase mb-2.5 sm:mb-3.5 inline-block">
              {subtitle}
            </span>
            <h2 className="font-della text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] text-ink font-normal leading-[1.2] tracking-tight">
              {title}
            </h2>
          </div>
        </Reveal>

        {/* Story Visual Showcase with Smooth Zoom Hover Effect */}
        <Reveal direction="up" delay={0.08}>
          <div className="w-full max-w-345 mx-auto">
            <div className="relative overflow-hidden rounded-xs shadow-sm group cursor-pointer bg-cream-card">
              <img
                src={imageSrc}
                alt={imageAlt}
                width={1400}
                height={640}
                className="w-full h-auto max-h-160 xl:max-h-180 object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
