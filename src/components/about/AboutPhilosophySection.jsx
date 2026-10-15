import aboutUs2Img from "../../assets/images/about/about-us-2-opt.webp";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * AboutPhilosophySection (Section-5 of About-1 Page)
 * Displays a large craft showcase image with zoom-on-hover effect overlapping the blush/white background split,
 * followed by a responsive 2-column fashion philosophy and brand mission editorial section.
 */
export default function AboutPhilosophySection({
  imageSrc = aboutUs2Img,
  imageAlt = "Handcrafted artisan jewelry and bespoke accessories process",
  items = [
    {
      id: 1,
      title:
        "Fashion is what you’re offered four times a yea by designers fashions fade",
      description:
        "In early 1982, founder and creative direct or had the idea to design a bag collection where comfort, fashion, and distinction are key.",
    },
    {
      id: 2,
      title:
        "I prefer to shock rather than to bore through repetition style is eternal",
      description:
        "I have always believed that fashion was not only to make women more beautiful, but also to reassure them, give them confidence.",
    },
  ],
}) {
  return (
    <section className="w-full font-sans overflow-hidden">
      {/* 1. Full-Width Overlapping Showcase Image with Zoom Effect */}
      <div className="relative w-full">
        {/* Top half background matching section 4 blush tone, bottom half pure white */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#f6efe9] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white pointer-events-none" />

        <div className="site-container relative z-10">
          <Reveal direction="up">
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
      </div>

      {/* 2. Responsive 2-Column Editorial Philosophy / Mission Content */}
      <div className="w-full bg-white pt-12 sm:pt-16 md:pt-20">
        <div className="site-container">
          <div className="w-full max-w-5xl mx-auto">
            <Stagger
              staggerDelay={0.1}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 text-center"
            >
              {items.map((item) => (
                <StaggerItem key={item.id} direction="up" distance={20}>
                  <div
                    className="flex flex-col items-center justify-start px-2 sm:px-4"
                  >
                    <h3 className="font-della text-lg sm:text-xl lg:text-[22px] font-normal text-ink leading-[1.35] tracking-tight mb-3.5 sm:mb-4.5 max-w-md mx-auto">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-[14.5px] text-ink-muted leading-relaxed max-w-md mx-auto">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
