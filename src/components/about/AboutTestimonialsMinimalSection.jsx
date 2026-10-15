import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { testimonialData2 } from "../../data/about";
import Reveal from "@/components/animation/Reveal";

/**
 * AboutTestimonialsMinimalSection (Section-6 of About-2 Page)
 * Displays a clean minimal testimonial slider using Swiper with 5s autoplay delay and no pagination dots.
 */
export default function AboutTestimonialsMinimalSection({
  testimonials = testimonialData2,
}) {
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 font-sans overflow-hidden">
      <div className="site-container relative">
        {/* Left Navigation Arrow Button */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous testimonial"
          className="absolute left-2 sm:left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#1c1b1b] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-brand-terracotta hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-border-subtle group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        {/* Right Navigation Arrow Button */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next testimonial"
          className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#1c1b1b] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-brand-terracotta hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-border-subtle group"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        {/* Minimal Testimonial Swiper Slider */}
        <Reveal direction="up">
          <div className="w-full max-w-4xl mx-auto overflow-hidden px-8 sm:px-14">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={750}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={item.id || idx}>
                <div className="w-full flex flex-col items-center text-center px-4">
                  <Card className="bg-transparent border-0 shadow-none text-center w-full">
                    <CardContent className="p-0 flex flex-col items-center text-center">
                      {/* Subtitle / Badge */}
                      <span className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-[#1c1b1b] uppercase mb-4 sm:mb-6 inline-block">
                        {item.badge || "WE LOVE OUR CLIENTS"}
                      </span>

                      {/* Main Testimonial Description / Quote */}
                      <p className="font-della text-xl sm:text-2xl md:text-[28px] lg:text-[32px] text-[#1c1b1b] font-normal leading-[1.45] tracking-tight mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto">
                        {item.description}
                      </p>

                      {/* Client Name */}
                      <h4 className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#1c1b1b] uppercase">
                        {item.name}
                      </h4>
                    </CardContent>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
