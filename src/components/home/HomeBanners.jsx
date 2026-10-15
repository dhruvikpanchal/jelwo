
import { bannerImages } from "@/data/home/banners";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";
const { banner1, banner2, banner3 } = bannerImages;

export default function HomeBanners() {
  return (
    <section className="w-full bg-surface pb-16 sm:pb-20 lg:pb-24 font-sans">
      <div className="site-container">
        <Stagger
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* 1. Banner 1: "Luxury to your look" (Desktop: Col 1-3 | Tablet: Row 1 Col 1) */}
          <StaggerItem
            direction="up"
            distance={24}
            className="order-1 md:order-1 lg:order-1 md:col-span-1 lg:col-span-3 relative overflow-hidden rounded-xs group min-h-100 sm:min-h-110 lg:min-h-125 flex flex-col justify-between bg-cream-card"
          >
            {/* Background Image with Zoom on Hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={banner1}
                alt="Luxury to your look"
                width={630}
                height={980}
                className="w-full h-full object-cover object-center img-zoom"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Top Text Content */}
            <div className="relative z-10 pt-8 sm:pt-10 lg:pt-12 px-5 sm:px-8 text-center flex flex-col items-center">
              <h3 className="heading-2 font-normal text-ink leading-tight mb-4 sm:mb-5 drop-shadow-xs">
                Luxury to
                <br />
                your look
              </h3>
              <a href="#shop" className="btn-primary">
                SHOP NOW
              </a>
            </div>

            {/* Empty bottom space to let jewelry items from image shine through */}
            <div className="relative z-10 h-28 sm:h-32 pointer-events-none" />
          </StaggerItem>

          {/* 2. Banner 3: "Everyday’s luxuries" (Desktop: Col 10-12 | Tablet: Row 1 Col 2) */}
          <StaggerItem
            direction="up"
            distance={24}
            className="order-2 md:order-2 lg:order-3 md:col-span-1 lg:col-span-3 relative overflow-hidden rounded-xs group min-h-100 sm:min-h-110 lg:min-h-125 flex flex-col justify-between bg-cream-card"
          >
            {/* Background Image with Zoom on Hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={banner3}
                alt="Everyday's luxuries"
                width={630}
                height={980}
                className="w-full h-full object-cover object-center img-zoom"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Top Text Content */}
            <div className="relative z-10 pt-8 sm:pt-10 lg:pt-12 px-5 sm:px-8 text-center flex flex-col items-center">
              <h3 className="heading-2 font-normal text-ink leading-tight mb-4 sm:mb-5 drop-shadow-xs">
                Everyday’s
                <br />
                luxuries
              </h3>
              <a href="#shop" className="btn-primary">
                SHOP NOW
              </a>
            </div>

            {/* Empty bottom space to let ring on stone shine through */}
            <div className="relative z-10 h-28 sm:h-32 pointer-events-none" />
          </StaggerItem>

          {/* 3. Center Wide Banner: "Happiness of women" (Desktop: Center Col 4-9 | Tablet: Row 2 Full Width) */}
          <StaggerItem
            direction="up"
            distance={24}
            className="order-3 md:order-3 lg:order-2 md:col-span-2 lg:col-span-6 relative overflow-hidden rounded-xs group min-h-105 sm:min-h-115 lg:min-h-125 flex items-center bg-banner-blue"
          >
            {/* Background Image with Zoom on Hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={banner2}
                alt="Happiness of women"
                width={832}
                height={605}
                className="w-full h-full object-cover object-[20%_center] sm:object-center img-zoom"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right-aligned Content Card with responsive background on small mobile */}
            <div className="relative z-10 w-full flex justify-end p-4 sm:p-0">
              <div className="w-full sm:w-[56%] md:w-[52%] lg:w-[50%] px-6 sm:px-8 lg:px-10 py-8 sm:py-10 text-left bg-banner-blue/85 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none rounded-xs sm:rounded-none">
                <span className="section-subtitle mb-2 sm:mb-3 text-ink-soft">
                  JEWELRY COLLECTIONS
                </span>
                <h3 className="heading-1 font-normal text-ink leading-[1.16] mb-5 sm:mb-6 drop-shadow-xs">
                  Happiness
                  <br />
                  of women
                </h3>
                <a href="#shop" className="btn-primary">
                  SHOP NOW
                </a>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
