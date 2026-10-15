import { useEffect } from "react";
import PageBanner from "@/components/common/PageBanner";
import { useRouter } from "@/hooks/useRouter";
import { collectionsData } from "@/data/collectionsData";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

export default function CollectionsPage() {
  const { navigate } = useRouter();

  // Scroll to top on page mount & update document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Collections - Jelwo Luxury Jewelry";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="Collections"
        breadcrumb="COLLECTIONS"
        onNavigateHome={() => navigate("/")}
      />

      {/* 2. Collections Grid Container matching Screenshots */}
      <section className="max-w-360 mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-16">
        <Stagger
          staggerDelay={0.04}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
        >
          {collectionsData.map((item) => (
            <StaggerItem key={item.id} direction="up" distance={24}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                className="group block focus:outline-none cursor-pointer"
              >
                {/* Card Image Container */}
                <div className="relative aspect-square bg-[#f8f7f5] overflow-hidden flex items-center justify-center p-8 sm:p-10 transition-colors duration-300 group-hover:bg-[#f3f1ec]">
                  {/* Top-Left Item Count Badge */}
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-white text-[#222222] text-[12px] sm:text-[13px] font-semibold px-2.5 py-1 min-w-8 text-center shadow-[0_1px_4px_rgba(0,0,0,0.06)] leading-none select-none">
                    {item.count}
                  </span>

                  {/* Jewelry Visual */}
                  <img
                    src={item.image}
                    alt={item.title}
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110 select-none"
                  />
                </div>

                {/* Collection Title */}
                <h3 className="mt-4 sm:mt-5 text-center text-[13.5px] sm:text-[14.5px] font-della tracking-widest uppercase text-[#1c1b1b] group-hover:text-brand transition-colors duration-200">
                  {item.title}
                </h3>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
