import { useEffect } from "react";
import PageBanner from "@/components/common/PageBanner";
import notFoundImg from "@/assets/images/page-not-found.webp";
import { useRouter } from "@/hooks/useRouter";
import Reveal from "@/components/animation/Reveal";

export default function NotFoundPage({ onNavigateHome }) {
  const { navigate } = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Page Header Breadcrumb Banner: "HOME - 404 NOT FOUND" & "404 Not Found" */}
      <PageBanner
        title="404 Not Found"
        breadcrumb="404 NOT FOUND"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Content Grid (Wind-blown Tree Vector on Left, 404 + Text + CTA on Right) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20 xl:gap-24">
          {/* Left Column: Yellow Tree Illustration */}
          <Reveal direction="right" duration={0.7} distance={30}>
            <div className="w-full max-w-70 sm:max-w-90 md:max-w-100 lg:max-w-115 flex items-center justify-center shrink-0">
              <img
                src={notFoundImg}
                alt="Page not found tree illustration"
                width={535}
                height={639}
                className="w-full h-auto object-contain select-none pointer-events-none"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </Reveal>

          {/* Right Column: 404 Heading, Subtitle & Continue Shopping Button */}
          <Reveal direction="left" delay={0.1} duration={0.7} distance={30}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="font-serif text-[72px] sm:text-[96px] lg:text-[112px] xl:text-[124px] text-[#1c1b1b] font-normal leading-none mb-3 sm:mb-4 select-none tracking-tight">
                404
              </h2>

              <p className="font-sans text-2xl sm:text-3xl lg:text-[34px] text-[#717171] font-normal tracking-tight mb-7 sm:mb-8">
                Page not found!
              </p>

              <button
                type="button"
                onClick={handleContinueShopping}
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#ca7b64] hover:bg-[#1c1b1b] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors duration-300 rounded-[1px] shadow-sm hover:shadow-md cursor-pointer select-none"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
