import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import CollectingInformationSection from "@/components/privacyPolicy/CollectingInformationSection";
import Reveal from "@/components/animation/Reveal";

// Below-the-fold policy sections lazily loaded to minimize initial page bundle
const OrderAndSupportSection = lazy(() => import("@/components/privacyPolicy/OrderAndSupportSection"));
const RightsAndCookiesSection = lazy(() => import("@/components/privacyPolicy/RightsAndCookiesSection"));

export default function PrivacyPolicyPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Reusable Top Banner Section matching the reference */}
      <PageBanner
        title="Privacy policy"
        breadcrumb="PRIVACY POLICY"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main Privacy Policy Content */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 space-y-12 md:space-y-14">
        {/* Section 1: Collecting Personal Info, Device Info, Sharing & Behavioural Advertising */}
        <Reveal direction="up" delay={0.05}>
          <CollectingInformationSection />
        </Reveal>

        {/* Below-the-fold sections deferred */}
        <Suspense fallback={null}>
          {/* Section 2: Order Information, Customer Support & Selling Personal Info */}
          <Reveal direction="up" delay={0.05}>
            <OrderAndSupportSection />
          </Reveal>
        </Suspense>

        <Suspense fallback={null}>
          {/* Section 3: Your Rights (GDPR, CCPA, Changes) & Cookies with Data Tables */}
          <Reveal direction="up" delay={0.05}>
            <RightsAndCookiesSection />
          </Reveal>
        </Suspense>
      </div>
    </div>
  );
}

