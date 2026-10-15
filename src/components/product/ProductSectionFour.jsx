import { useRouter } from "@/hooks/useRouter";
import { commonProductInfo } from "../../data/productsData";
import Reveal from "@/components/animation/Reveal";

export default function ProductSectionFour({ bannerData }) {
  const { navigate } = useRouter();

  // Use passed bannerData or pull directly from commonProductInfo.aboutBanners[1]
  const banner = bannerData || commonProductInfo.aboutBanners[1];

  const handleShopClick = () => {
    if (banner?.href) {
      navigate(banner.href);
    } else {
      navigate("/collections/all");
    }
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 font-sans border-t border-gray-100">
      <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Title, Editorial Text, and Shop Now CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 lg:pr-4">
            <Reveal direction="right" duration={0.6} distance={24}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.18] font-normal text-[#1c1b1b] tracking-tight">
                {banner?.title || "I make clothes make fashion"}
              </h2>

              <p className="text-gray-600 text-xs sm:text-[13.5px] leading-relaxed mt-4 sm:mt-6 mb-7 sm:mb-8 font-normal max-w-lg">
                {banner?.text ||
                  "As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we’re asking women to invite us into their most intimate space."}
              </p>

              <div>
                <button
                  type="button"
                  onClick={handleShopClick}
                  className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 bg-[#cb765f] hover:bg-[#1c1b1b] text-white font-bold text-xs sm:text-[13px] tracking-[0.18em] uppercase rounded-[1px] transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
                >
                  {banner?.buttonText || "SHOP NOW"}
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Jewelry Image */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <Reveal direction="left" duration={0.6} distance={24} delay={0.08} className="w-full max-w-xl">
              <div
                className="relative w-full overflow-hidden rounded-[1px] group cursor-pointer"
                onClick={handleShopClick}
              >
                <img
                  src={banner?.image}
                  alt={banner?.title || "I make clothes make fashion"}
                  width={675}
                  height={550}
                  className="w-full h-auto object-cover aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
