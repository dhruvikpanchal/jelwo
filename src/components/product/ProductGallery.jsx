import { useState, useRef } from "react";

export default function ProductGallery({
  images = [],
  productName = "Product",
  selectedIndex: controlledIndex,
  onSelectIndex,
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [prevProduct, setPrevProduct] = useState(productName);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  if (prevProduct !== productName) {
    setPrevProduct(productName);
    setInternalIndex(0);
  }

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const activeImage = images[activeIndex]?.src || images[0]?.src || "";

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomPos({ x: 50, y: 50 });
  };

  const handleThumbSelect = (idx) => {
    if (onSelectIndex) {
      onSelectIndex(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Preview Container with Amazon-Style Hover Zoom */}
      <div
        ref={imageContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-square max-w-155 bg-surface border border-[#f0ece6] rounded-xs relative overflow-hidden flex items-center justify-center p-6 sm:p-10 cursor-crosshair select-none"
      >
        <img
          src={activeImage}
          alt={productName}
          width={1066}
          height={1200}
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isHovered ? "scale(2.35)" : "scale(1)",
            transition: isHovered ? "transform 0.08s ease-out" : "transform 0.3s ease-out",
          }}
          className="max-h-full max-w-full object-contain pointer-events-none will-change-transform"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Subtle Amazon-Style Zoom Hint */}
        <div
          className={`absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[11px] text-[#555] px-2.5 py-1 rounded-xs border border-gray-200/80 shadow-2xs pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-90"
          }`}
        >
          <span>Roll over image to zoom in</span>
        </div>
      </div>

      {/* 5 Thumbnails Strip */}
      {images.length > 0 && (
        <div className="w-full max-w-155 grid grid-cols-5 gap-2.5 sm:gap-3.5 mt-4 sm:mt-5">
          {images.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={img.id || idx}
                onClick={() => handleThumbSelect(idx)}
                onMouseEnter={() => handleThumbSelect(idx)}
                className={`aspect-square w-full bg-white p-2 sm:p-2.5 rounded-xs flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-2 border-[#1c1b1b] shadow-xs"
                    : "border border-border hover:border-[#888888] opacity-75 hover:opacity-100"
                }`}
                aria-label={`View angle ${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  width={1066}
                  height={1200}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
