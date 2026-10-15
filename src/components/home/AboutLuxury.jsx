import { fixedImages } from "../../utils/imagePath";
import Reveal from "@/components/animation/Reveal";
const aboutBannerImg = fixedImages.aboutLabel1;
const aboutBadgeImg = fixedImages.aboutLabel2;

export default function AboutLuxury() {
  return (
    <section className="w-full bg-surface section-spacing font-sans overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column: Dual Image Visual with Overlapping Rotating Badge (7 Cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <Reveal direction="right" duration={0.65} distance={28} className="w-full">
              {/* Main Composite Image */}
              <div className="relative overflow-hidden rounded-xs w-full max-w-155 lg:max-w-none shadow-sm group">
                <img
                  src={aboutBannerImg}
                  alt="Luxury jewelry collection model showcases"
                  width={775}
                  height={490}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />

                {/* Floating Circular Badge with Smooth Continuous Rotation */}
                <div className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-36 lg:h-36 xl:w-44 xl:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)] pointer-events-none">
                  <img
                    src={aboutBadgeImg}
                    alt="Luxury New Jewelry Badge"
                    width={425}
                    height={465}
                    className="w-full h-full object-contain animate-[spin_20s_linear_infinite]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Text Content & CTA (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left lg:pl-2 xl:pl-6">
            <Reveal direction="left" duration={0.65} distance={28} delay={0.08}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] text-ink font-normal leading-[1.2] tracking-tight mb-5 sm:mb-6">
                Add a touch of luxury to your look jewelry
              </h2>

              <p className="text-xs sm:text-sm lg:text-[14.5px] text-ink-muted leading-relaxed mb-4">
                If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill.
              </p>

              <p className="text-xs sm:text-sm lg:text-[14.5px] text-ink-muted leading-relaxed mb-8 sm:mb-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div>
                <a
                  href="#shop-collection"
                  className="inline-flex items-center justify-center px-9 sm:px-11 py-3.5 sm:py-4 bg-brand-terracotta hover:bg-ink text-white font-sans text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase rounded-[1px] transition-colors duration-300 shadow-sm cursor-pointer"
                >
                  SHOP COLLECTION
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
