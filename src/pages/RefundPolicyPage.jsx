import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import ReturnOverviewSection from "@/components/refundPolicy/ReturnOverviewSection";
import Reveal from "@/components/animation/Reveal";

// Below-the-fold policy sections lazily loaded to minimize initial page bundle
const DamagesAndExceptionsSection = lazy(() => import("@/components/refundPolicy/DamagesAndExceptionsSection"));
const ExchangesAndRefundsSection = lazy(() => import("@/components/refundPolicy/ExchangesAndRefundsSection"));

export default function RefundPolicyPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Reusable Top Banner Section */}
      <PageBanner
        title="Refund policy"
        breadcrumb="REFUND POLICY"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Refund Policy Content */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 space-y-12 md:space-y-14">
        {/* Section 1: Overview & Support Contact */}
        <Reveal direction="up" delay={0.05}>
          <ReturnOverviewSection />
        </Reveal>

        {/* Below-the-fold sections deferred */}
        <Suspense fallback={null}>
          {/* Section 2: Damages & Issues / Exceptions */}
          <Reveal direction="up" delay={0.05}>
            <DamagesAndExceptionsSection />
          </Reveal>
        </Suspense>

        <Suspense fallback={null}>
          {/* Section 3: Exchanges & Refunds with Collection Details */}
          <Reveal direction="up" delay={0.05}>
            <ExchangesAndRefundsSection />
          </Reveal>
        </Suspense>
      </div>
    </div>
  );
}

