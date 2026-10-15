import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import contactLocations from "../../data/contactLocations";
import contactHeroImg from "../../assets/images/contact/jewelry-contact-us-opt.webp";
import { Card } from "../ui/Card";
import Reveal from "@/components/animation/Reveal";

export default function GetInTouchLocationsSection() {
  const swiperRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let isRewinding = false;

    const interval = setInterval(() => {
      if (isHoveredRef.current || !swiperRef.current) return;

      const swiper = swiperRef.current;
      if (swiper.destroyed) return;

      if (isRewinding) return;

      if (swiper.isEnd) {
        // When all cards have been shown: smoothly rewind from the last card back to the 1st card (left to right)
        isRewinding = true;
        swiper.slideTo(0, 1000);
        setTimeout(() => {
          isRewinding = false;
        }, 1200);
      } else {
        // Base animation: move 1 card forward (right to left)
        swiper.slideNext(650);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Full-Width Support Team Hero Image */}
      <div className="w-full h-70 sm:h-95 md:h-120 lg:h-135 overflow-hidden select-none">
        <img
          src={contactHeroImg}
          alt="Support representative"
          width={1920}
          height={770}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* 2. Floating "Get in touch" Card with Location Carousel */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 md:-mt-44 relative z-10">
        <Reveal direction="up" distance={28}>
          <div
            className="bg-white px-6 sm:px-10 md:px-14 py-12 sm:py-16 md:py-20 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100/80"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
          >
          {/* Section Heading in Della Respira font */}
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-serif font-normal text-center text-[#1c1b1b] tracking-tight mb-10 sm:mb-14 md:mb-16">
            Get in touch
          </h2>

          {/* Carousel with Navigation Arrows */}
          <div className="relative px-4 sm:px-8">
            {/* Left Navigation Arrow */}
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev(500)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#ca7b64] transition-colors p-1 cursor-pointer select-none"
              aria-label="Previous location"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext(500)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#ca7b64] transition-colors p-1 cursor-pointer select-none"
              aria-label="Next location"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
            </button>

            {/* Swiper Slider with controlled step-by-step flow */}
            <Swiper
              loop={false}
              speed={650}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                540: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="w-full"
            >
              {contactLocations.map((item) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <Card className="flex flex-col items-center text-center px-2 sm:px-3 py-2 group h-full justify-between select-none">
                    {/* Flag Icon */}
                    <div className="h-10 sm:h-12 flex items-center justify-center mb-5">
                      <img
                        src={item.flag}
                        alt={`${item.country} flag`}
                        width={72}
                        height={44}
                        className="h-8 sm:h-9.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Location Address */}
                    <p className="text-xs sm:text-[13px] text-gray-500 max-w-52.5 leading-relaxed mx-auto mb-4 min-h-10.5 font-sans">
                      {item.address}
                    </p>

                    {/* Phone & Email */}
                    <div className="space-y-1 mb-5 font-sans">
                      <a
                        href={`tel:${item.phone.replace(/\s+/g, "")}`}
                        className="text-xs sm:text-[13px] text-gray-600 hover:text-[#ca7b64] transition-colors block"
                      >
                        {item.phone}
                      </a>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-xs sm:text-[13px] text-gray-600 hover:text-[#ca7b64] transition-colors block"
                      >
                        {item.email}
                      </a>
                    </div>

                    {/* Country Name in Terracotta color matching screenshots */}
                    <div className="text-sm sm:text-base font-normal text-[#ca7b64] tracking-wide font-sans mt-auto">
                      {item.country}
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
