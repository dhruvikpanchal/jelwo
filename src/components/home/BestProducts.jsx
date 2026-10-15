import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { mockBestProducts } from "@/data/home/bestProducts";
const bestProductsData = mockBestProducts;

// Individual Sub-Item Component to isolate hover state exclusively to the sub-item (not the slide)
const SlideSubItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic rotation styles based on item direction and hover state
  const getRotationTransform = () => {
    if (!isHovered) return "rotate(0deg) scale(1)";
    switch (item.rotateDirection) {
      case "vertical":
        return "perspective(400px) rotateX(20deg) scale(1.12) translateY(-2px)";
      case "horizontal":
        return "perspective(400px) rotateY(-22deg) scale(1.12) translateY(-2px)";
      case "diagonal":
      default:
        return "perspective(400px) rotate(-12deg) rotateY(15deg) scale(1.12) translateY(-2px)";
    }
  };

  return (
    <div
      className="inline-flex items-center gap-3 select-none cursor-pointer group/item pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Product Image Box with smooth animated rotation and 3D angle movement */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 bg-white flex items-center justify-center p-1.5 shadow-lg shrink-0 relative overflow-hidden transition-all duration-500 ease-out rounded-none ${
          isHovered ? "shadow-2xl ring-1 ring-black/10 scale-105" : ""
        }`}
      >
        <div
          className="w-full h-full relative transition-transform duration-500 ease-out"
          style={{
            transform: getRotationTransform(),
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Image */}
          <img
            src={item.imageFront}
            alt={item.title}
            width={720}
            height={811}
            className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-500 ${
              isHovered && item.imageBack ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            decoding="async"
          />

          {/* Alternate Angle Image when hovered */}
          {item.imageBack && (
            <img
              src={item.imageBack}
              alt={`${item.title} alternate angle`}
              width={720}
              height={811}
              className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>

      {/* Product Details (Title & Price) */}
      <div className="flex flex-col justify-center text-left drop-shadow-md">
        <h4
          className={`text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white leading-tight transition-colors duration-300 ${
            isHovered ? "text-[#f3c8b4]" : "text-white"
          }`}
        >
          {item.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] sm:text-xs font-semibold text-white">
            {item.price}
          </span>
          {item.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-gray-300 line-through">
              {item.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Performance-optimized lazy video component
const LazyVideoCard = ({ item, isSectionInView }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (!isSectionInView) {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      return;
    }

    // Only load video when slide card is near the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: "250px 0px", threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isSectionInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-9/15 sm:aspect-9/15.5 md:aspect-9/15 bg-[#1a1a1a] overflow-hidden group/slide select-none"
    >
      {/* 1. Instant Lightweight WebP Poster (Zero layout shift, instant paint) */}
      <img
        src={item.poster}
        alt={item.title}
        width={540}
        height={960}
        className={`w-full h-full object-cover pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        decoding="async"
      />

      {/* 2. Video element dynamically mounted only when viewport is near */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disableRemotePlayback
          onCanPlay={() => setIsVideoReady(true)}
          className={`w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Dark Gradient Overlay for optimal contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Bottom Sub-Item Card (Hover isolated exclusively to this sub-item) */}
      <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none">
        <SlideSubItem item={item} />
      </div>
    </div>
  );
};

export default function BestProducts() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);

  // Monitor Section 7 visibility to pause/resume video activity
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { rootMargin: "350px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[#ca7b64] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase block mb-1">
              BEST PRODUCT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1c1b1b] font-normal tracking-tight">
              Hot picks
            </h2>
          </div>
        </Reveal>

        {/* Swiper Slider */}
        <Reveal direction="up" delay={0.08}>
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              spaceBetween={12}
              slidesPerView={1.2}
              loop={false}
              breakpoints={{
                480: {
                  slidesPerView: 1.6,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 18,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
              className="w-full pb-4!"
            >
              {bestProductsData.map((item) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <LazyVideoCard item={item} isSectionInView={isSectionInView} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Controls matching design */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                aria-label="Previous slide"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isBeginning
                    ? "bg-[#e5e5e5] text-gray-400 cursor-not-allowed opacity-70"
                    : "bg-[#e5e5e5] text-gray-700 hover:bg-black hover:text-white shadow-sm hover:scale-105 cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                aria-label="Next slide"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isEnd
                    ? "bg-[#e5e5e5] text-gray-400 cursor-not-allowed opacity-70"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-black hover:text-white shadow-sm hover:scale-105 cursor-pointer"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
