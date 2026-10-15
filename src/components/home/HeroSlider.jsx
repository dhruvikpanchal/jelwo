import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

import { mockHeroSlides } from "@/data/home/heroSlides";
const slidesData = mockHeroSlides;

// Mandala line ornament SVG for the slider sides matching the reference
const MandalaOrnament = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.35">
      <circle cx="0" cy="200" r="180" />
      <circle cx="0" cy="200" r="140" strokeDasharray="3 3" />
      <circle cx="0" cy="200" r="100" />
      <circle cx="0" cy="200" r="60" />
      {/* Radial lines & petals */}
      <path d="M0 20L0 380" />
      <path d="M0 200L180 200" />
      <path d="M0 200L127 73" />
      <path d="M0 200L127 327" />
      <path d="M0 200L166 132" />
      <path d="M0 200L166 268" />
      <path d="M0 200L69 34" />
      <path d="M0 200L69 366" />
      {/* Decorative Petals */}
      <path d="M0 140 Q 60 170 100 200 Q 60 230 0 260" />
      <path d="M0 100 Q 90 150 140 200 Q 90 250 0 300" />
      <path d="M0 60 Q 120 130 180 200 Q 120 270 0 340" />
      {/* Diamond facets */}
      <polygon points="100,200 70,170 40,200 70,230" />
      <polygon points="140,200 105,160 70,200 105,240" />
      <polygon points="180,200 140,150 100,200 140,250" />
    </g>
  </svg>
);

// Decorative Swirl Pattern for the terracotta content card
const SwirlPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <defs>
      <pattern
        id="ornate-swirl"
        width="120"
        height="120"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M60 0 C75 25 100 35 120 40 C95 55 85 80 80 105 C65 85 40 75 20 70 C45 55 55 30 60 0 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M0 60 C25 75 35 100 40 120 C55 95 80 85 105 80 C85 65 75 40 70 20 C55 45 30 55 0 60 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <circle
          cx="60"
          cy="60"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
        <circle cx="0" cy="0" r="6" fill="currentColor" />
        <circle cx="120" cy="0" r="6" fill="currentColor" />
        <circle cx="0" cy="120" r="6" fill="currentColor" />
        <circle cx="120" cy="120" r="6" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ornate-swirl)" />
  </svg>
);

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const totalSlides = slidesData.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay interval (slides every 6 seconds)
  useEffect(() => {
    if (!isAutoPlaying || isVideoModalOpen) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isVideoModalOpen, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape" && isVideoModalOpen) setIsVideoModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isVideoModalOpen]);

  // Touch Swipe Handlers for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swiped left -> Next
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swiped right -> Prev
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const openVideoModal = (url) => {
    setActiveVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-ink select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Carousel"
    >
      {/* Slider Viewport */}
      <div className="relative w-full h-130 sm:h-150 md:h-170 lg:h-190 xl:h-205">
        {slidesData.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image: Responsive for Mobile & Desktop */}
              <picture className="w-full h-full">
                <source media="(max-width: 640px)" srcSet={slide.mobileImg} width={600} height={750} />
                <source media="(min-width: 641px)" srcSet={slide.desktopImg} width={1920} height={850} />
                <img
                  src={slide.desktopImg}
                  alt={slide.title}
                  width={1920}
                  height={850}
                  className="w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </picture>

              {/* Gentle ambient overlay for contrast */}
              <div className="absolute inset-0 bg-ink/10 sm:bg-ink/5 pointer-events-none" />
            </div>
          );
        })}

        {/* Left Side Mandala Ornament Overlay */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-surface/50 w-24 sm:w-36 md:w-48 lg:w-56 h-75 sm:h-100 flex items-center">
          <Reveal direction="right" duration={0.8} distance={20} className="w-full h-full flex items-center">
            <MandalaOrnament className="w-full h-full drop-shadow-md" />
          </Reveal>
        </div>

        {/* Right Side Mandala Ornament Overlay */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-surface/50 w-24 sm:w-36 md:w-48 lg:w-56 h-75 sm:h-100 flex items-center justify-end">
          <Reveal direction="left" duration={0.8} distance={20} className="w-full h-full flex items-center justify-end">
            <MandalaOrnament className="w-full h-full transform scale-x-[-1] drop-shadow-md" />
          </Reveal>
        </div>

        {/* Navigation Arrow: Left */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-1.5 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-surface text-brand-terracotta hover:bg-brand-terracotta hover:text-surface rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.18)] flex items-center justify-center transition-all duration-300 cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        {/* Navigation Arrow: Right */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-1.5 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-surface text-brand-terracotta hover:bg-brand-terracotta hover:text-surface rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.18)] flex items-center justify-center transition-all duration-300 cursor-pointer group"
        >
          <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        {/* Center Content Area (Video Play Button + Terracotta Box) */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 lg:bottom-16 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-85 sm:max-w-140 md:max-w-160 lg:max-w-180 flex flex-col items-center">
          <Reveal direction="up" delay={0.15} duration={0.8} distance={24} className="w-full flex flex-col items-center">
            {/* Top Circular Play Video Button with Glowing Halo */}
            <div className="relative z-40 -mb-5 sm:-mb-7.5 md:-mb-9">
              <button
                type="button"
                onClick={() => openVideoModal(slidesData[currentSlide].videoUrl)}
                aria-label="Play presentation video"
                className="group relative flex items-center justify-center w-12 h-12 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-surface text-brand-terracotta shadow-[0_4px_25px_rgba(0,0,0,0.25)] ring-4 sm:ring-8 ring-surface/40 hover:ring-surface/70 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Outer soft pulsation wave */}
                <span className="absolute inset-0 rounded-full bg-surface/40 animate-ping opacity-30" />

                {/* Play Triangle Icon */}
                <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-brand-terracotta text-brand-terracotta ml-0.5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>

            {/* Main Terracotta Content Box with Swirl Pattern */}
            <div className="w-full bg-brand-terracotta text-surface pt-8 pb-5 sm:pt-14 sm:pb-9 md:pt-16 md:pb-11 px-4 sm:px-10 md:px-14 text-center relative shadow-[0_20px_45px_rgba(0,0,0,0.22)] overflow-hidden rounded-xs">
              {/* Swirl Pattern Layer */}
              <SwirlPattern />

              {/* Dynamic Text Content with smooth transition */}
              <div
                key={currentSlide}
                className="relative z-10 transition-all duration-500 transform"
              >
                <h2 className="font-serif text-[22px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-normal leading-[1.15] text-surface tracking-normal mb-4 sm:mb-6 md:mb-7 drop-shadow-xs">
                  {slidesData[currentSlide].title}
                </h2>

                {/* SHOP NOW Button with custom hover effect */}
                <div>
                  <a
                    href={slidesData[currentSlide].buttonLink}
                    className="btn-hero-slider text-xs sm:text-sm px-5 py-2 sm:px-9 sm:py-3"
                  >
                    {slidesData[currentSlide].buttonText}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Slide Indicators / Dots for quick navigation */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slidesData.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setCurrentSlide(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIndex === currentSlide
                  ? "w-6 bg-surface"
                  : "w-2 bg-surface/50 hover:bg-surface/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-99999 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-ink rounded-lg overflow-hidden shadow-2xl aspect-video border border-surface/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close Video"
              className="absolute top-3 right-3 z-10 p-2 bg-ink/60 hover:bg-brand-terracotta text-surface rounded-full transition-colors duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video iFrame */}
            <iframe
              src={activeVideoUrl}
              title="Jewelry Presentation Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
