import { useEffect, lazy, Suspense } from "react";
import StoreLocationBanner from "@/components/storeLocation/StoreLocationBanner";
import ValsoneShopSection from "@/components/storeLocation/ValsoneShopSection";

// Below-the-fold store locations lazily loaded
const MelbournePlaceSection = lazy(() => import("@/components/storeLocation/MelbournePlaceSection"));
const AnsoltParkSection = lazy(() => import("@/components/storeLocation/AnsoltParkSection"));

export default function StoreLocationPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* Section 1: Hero Breadcrumb Banner (Immediate render) */}
      <StoreLocationBanner onNavigateHome={onNavigateHome} />

      {/* Section 2: Valsone Shop (Immediate render) */}
      <ValsoneShopSection />

      {/* Below-the-fold store locations rendered progressively */}
      <Suspense fallback={null}>
        {/* Section 3: Melbourne Place (Details Left, Image Right) */}
        <MelbournePlaceSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 4: Ansolt Park (Image Left, Details Right) */}
        <AnsoltParkSection />
      </Suspense>
    </div>
  );
}
