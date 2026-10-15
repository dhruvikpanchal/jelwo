import { useState, useEffect, useRef } from "react";
import Reveal from "@/components/animation/Reveal";

import { mockBrandLogos } from "@/data/home/brands";
const brandLogos = mockBrandLogos;

export default function BrandMarquee() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const timerRef = useRef(null);

  // Responsive visible count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(2); // Mobile: 2 logos
      } else if (width < 768) {
        setVisibleCount(3); // Small tablet: 3 logos
      } else if (width < 1024) {
        setVisibleCount(4); // Tablet: 4 logos
      } else {
        setVisibleCount(5); // Desktop: 5 logos
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, brandLogos.length - visibleCount);

  // Step timer: Moves 1 logo at a time, pauses for 5 seconds, rewinds left-to-right at end
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          // Reached the end: rewind back from left-to-right to logo 1
          return 0;
        } else {
          // Move 1 logo right-to-left
          return prev + 1;
        }
      });
    }, 5000); // 5 seconds pause

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [maxIndex, isPaused]);

  return (
    <section
      className="w-full bg-white border-y border-border-soft/80 py-9 sm:py-12 lg:py-14 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Brand partners marquee"
    >
      <div className="site-container">
        {/* Logos Carousel Track Container */}
        <Reveal direction="fade" duration={0.6}>
          <div className="relative overflow-hidden w-full">
          {/* Sliding Track */}
          <div
            className="flex items-center transition-transform duration-800 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {brandLogos.map((brand) => (
              <div
                key={brand.id}
                className="shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-8"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center group/logo cursor-pointer">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    width={140}
                    height={65}
                    className="max-h-7 sm:max-h-8 md:max-h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
}
