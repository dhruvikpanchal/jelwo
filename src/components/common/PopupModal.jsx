import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fixedImages } from "../../utils/imagePath";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user previously chose not to see the popup
    const isDismissed = localStorage.getItem("jelwo_popup_dismissed");
    if (isDismissed === "true") {
      return;
    }

    // Show modal between 1-2 seconds (1.5s) on page load/hard refresh
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("jelwo_popup_dismissed", "true");
    }
    setIsOpen(false);
  };

  const handleShopCollection = () => {
    if (dontShowAgain) {
      localStorage.setItem("jelwo_popup_dismissed", "true");
    }
    setIsOpen(false);
    window.history.pushState({}, "", "/shop");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container with crisp white border matching screenshot */}
      <div
        className="relative w-full max-w-[95vw] sm:max-w-155 min-h-80 sm:min-h-0 sm:aspect-16/10 border-2 sm:border-[6px] border-white shadow-2xl overflow-hidden flex items-center select-none animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image */}
        <img
          src={fixedImages.popup}
          alt="Gift bundles"
          width={715}
          height={730}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle Dark Gradient Overlay on left side for text contrast */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/35 to-transparent pointer-events-none" />

        {/* Circular Close Button at Top Right */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 w-7 h-7 sm:w-9 sm:h-9 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#ca7b64] hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
        </button>

        {/* Modal Left Content */}
        <div className="relative z-10 pl-4 sm:pl-10 md:pl-12 pr-3 py-4 sm:py-6 max-w-full sm:max-w-95 flex flex-col items-start text-left">
          {/* Headline */}
          <h3 className="text-white text-base sm:text-2xl font-normal leading-snug tracking-normal font-sans">
            Gift bundles for every <br />
            type of person
          </h3>

          {/* Discount Text with distinctive 3D drop shadow */}
          <div className="my-2 sm:my-4 font-serif italic text-3xl sm:text-5xl md:text-[52px] font-bold text-white tracking-wide drop-shadow-[2px_3px_0px_rgba(0,0,0,0.5)]">
            30% OFF
          </div>

          {/* Shop Collection CTA Button with Red/Terracotta Hover Effect */}
          <button
            type="button"
            onClick={handleShopCollection}
            className="bg-white text-[#1c1b1b] hover:bg-[#ca7b64] hover:text-white text-[11px] sm:text-[13px] font-semibold tracking-wider uppercase px-5 sm:px-8 py-2.5 sm:py-3.5 transition-all duration-300 shadow-md cursor-pointer inline-block"
          >
            SHOP COLLECTION
          </button>

          {/* Don't show again checkbox */}
          <label htmlFor="popup-dismiss-checkbox" className="mt-3 sm:mt-5 flex items-center gap-2 text-xs sm:text-[13.5px] text-white/95 hover:text-white cursor-pointer select-none font-normal">
            <input
              type="checkbox"
              id="popup-dismiss-checkbox"
              name="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-3.5 h-3.5 rounded-none border border-white/80 bg-white/20 checked:bg-[#ca7b64] checked:border-[#ca7b64] accent-[#ca7b64] cursor-pointer"
            />
            <span>Don’t show this popup again</span>
          </label>
        </div>
      </div>
    </div>
  );
}
