import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import ReturnsSection from "@/components/shippingAndReturn/ReturnsSection";
import RefundsSection from "@/components/shippingAndReturn/RefundsSection";
import Reveal from "@/components/animation/Reveal";

// Below-the-fold policy sections lazily loaded to minimize initial page bundle
const ExchangesSection = lazy(() => import("@/components/shippingAndReturn/ExchangesSection"));
const ShippingSection = lazy(() => import("@/components/shippingAndReturn/ShippingSection"));

export default function ShippingAndReturnPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Reusable Top Banner Section */}
      <PageBanner
        title="Shipping & return"
        breadcrumb="SHIPPING & RETURN"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Content Grid (Responsive 2x2 Grid) */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-16">
          {/* Top Left: Returns */}
          <Reveal direction="up" delay={0.05}>
            <ReturnsSection />
          </Reveal>

          {/* Top Right: Refunds */}
          <Reveal direction="up" delay={0.08}>
            <RefundsSection />
          </Reveal>

          {/* Below-the-fold sections deferred */}
          <Suspense fallback={null}>
            {/* Bottom Left: Exchanges */}
            <Reveal direction="up" delay={0.05}>
              <ExchangesSection />
            </Reveal>
          </Suspense>

          <Suspense fallback={null}>
            {/* Bottom Right: Shipping */}
            <Reveal direction="up" delay={0.08}>
              <ShippingSection />
            </Reveal>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

