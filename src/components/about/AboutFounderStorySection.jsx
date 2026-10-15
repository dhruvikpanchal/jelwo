import aboutUs3Img from "../../assets/images/about/about-us-3.webp";
import Reveal from "@/components/animation/Reveal";

/**
 * AboutFounderStorySection (Section-3 of About-2 Page)
 * Displays a 2-column editorial story with left portrait image (with hover zoom) and right narrative with founder signature.
 */
export default function AboutFounderStorySection({
  title = "Story about us",
  description = "As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we're asking women to invite us into their most intimate space.",
  authorName = "Harlie puth",
  imageSrc = aboutUs3Img,
  imageAlt = "Elegant jewelry collection showcased on model",
}) {
  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-24 font-sans overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center max-w-345 mx-auto">
          {/* Left Column: Portrait Visual with Smooth Hover Zoom */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal direction="right" duration={0.65}>
              <div className="relative overflow-hidden rounded-xs shadow-sm group cursor-pointer bg-cream-card w-full max-w-155 lg:max-w-none mx-auto">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={675}
                  height={550}
                  className="w-full h-auto object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Narrative & Founder Signature */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left lg:pl-4 xl:pl-10">
            <Reveal direction="left" duration={0.65} delay={0.08}>
              <h2 className="font-della text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] text-ink font-normal leading-[1.2] tracking-tight mb-5 sm:mb-7">
                {title}
              </h2>

              <p className="text-xs sm:text-sm lg:text-[14.5px] text-ink-muted leading-relaxed mb-8 sm:mb-12 max-w-lg">
                {description}
              </p>

              <div>
                <span className="font-della text-3xl sm:text-4xl lg:text-[46px] text-brand-terracotta font-normal leading-tight tracking-normal block">
                  {authorName}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
