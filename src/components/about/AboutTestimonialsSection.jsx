import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { aboutTestimonials } from "../../data/aboutTestimonials";
import Reveal from "@/components/animation/Reveal";

/**
 * AboutTestimonialsSection (Section-4 of About-1 Page)
 * Displays auto-playing customer testimonials with seamless infinite loop using Swiper.
 *
 * Guaranteed Behavior:
 * - Slides continuously right-to-left in an infinite loop.
 * - Card 1 -> 2 -> 3 -> 4 -> 1 -> 2 ... without ever showing blank space or getting hidden.
 * - Fully responsive, with pause-on-hover and interactive arrow controls.
 */
export default function AboutTestimonialsSection({
  testimonials = aboutTestimonials,
}) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTestimonial = testimonials[activeIndex] || testimonials[0];

  return (
    <section className="relative w-full bg-[#f6efe9] pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 mt-14 sm:mt-16 md:mt-20 font-sans">
      {/* Top Floating Avatar Anchored on Section Boundary */}
      <div className="absolute -top-12 sm:-top-14 md:-top-16 left-1/2 -translate-x-1/2 z-20">
        <div className="w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30 rounded-full overflow-hidden ring-[7px] sm:ring-8 ring-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-white">
          <img
            src={currentTestimonial?.image}
            alt={currentTestimonial?.name || "Client testimonial"}
            width={90}
            height={90}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

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

        {/* Testimonials Swiper Carousel */}
        <Reveal direction="up">
          <div className="w-full max-w-4xl mx-auto overflow-hidden px-6 sm:px-12">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              speed={750}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              className="w-full"
            >
              {testimonials.map((item, idx) => (
                <SwiperSlide key={item.id || idx}>
                  <div className="w-full flex flex-col items-center text-center px-4">
                    <Card className="border-0 shadow-none text-center w-full bg-transparent!">
                      <CardContent className="p-0 flex flex-col items-center text-center">
                        {/* Badge / Subtitle */}
                        <span className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-[#1c1b1b] uppercase mb-4 sm:mb-6 inline-block">
                          {item.badge || "WE LOVE OUR CLIENTS"}
                        </span>

                        {/* Main Quote */}
                        <p className="font-della text-xl sm:text-2xl md:text-[28px] lg:text-[30px] text-[#1c1b1b] font-normal leading-[1.45] tracking-tight mb-6 sm:mb-8 max-w-2xl mx-auto">
                          {item.description}
                        </p>

                        {/* Author Name */}
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
