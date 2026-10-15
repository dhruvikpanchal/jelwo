import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import TermsOverviewSection from "@/components/termsAndCondition/TermsOverviewSection";
import StoreTermsSection from "@/components/termsAndCondition/StoreTermsSection";
import Reveal from "@/components/animation/Reveal";

// Below-the-fold policy sections lazily loaded to minimize initial page bundle
const InformationAccuracySection = lazy(() => import("@/components/termsAndCondition/InformationAccuracySection"));
const ProductsAndBillingSection = lazy(() => import("@/components/termsAndCondition/ProductsAndBillingSection"));
const ToolsAndLinksSection = lazy(() => import("@/components/termsAndCondition/ToolsAndLinksSection"));

export default function TermsAndConditionPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Reusable Top Banner Section */}
      <PageBanner
        title="Terms & condition"
        breadcrumb="TERMS & CONDITION"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Terms Content Grid */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 space-y-12 md:space-y-14">
        {/* Section 1: Overview & Last Updated */}
        <Reveal direction="up" delay={0.05}>
          <TermsOverviewSection />
        </Reveal>

        {/* Section 2: Online Store Terms & General Conditions */}
        <Reveal direction="up" delay={0.05}>
          <StoreTermsSection />
        </Reveal>

        {/* Below-the-fold sections deferred */}
        <Suspense fallback={null}>
          {/* Section 3: Completeness & Timeliness of Information / Modifications to Service & Prices */}
          <Reveal direction="up" delay={0.05}>
            <InformationAccuracySection />
          </Reveal>
        </Suspense>

        <Suspense fallback={null}>
          {/* Section 4: Products or Services / Accuracy of Billing */}
          <Reveal direction="up" delay={0.05}>
            <ProductsAndBillingSection />
          </Reveal>
        </Suspense>

        <Suspense fallback={null}>
          {/* Section 5: Optional Tools / Third-Party Links */}
          <Reveal direction="up" delay={0.05}>
            <ToolsAndLinksSection />
          </Reveal>
        </Suspense>
      </div>
    </div>
  );
}

