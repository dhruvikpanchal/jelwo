import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import AboutStorySection from "@/components/about/AboutStorySection";

// Below-the-fold sections lazily loaded to ensure instantaneous above-the-fold FCP/LCP
const AboutStatsSection = lazy(() => import("@/components/about/AboutStatsSection"));
const AboutTestimonialsSection = lazy(() => import("@/components/about/AboutTestimonialsSection"));
const AboutPhilosophySection = lazy(() => import("@/components/about/AboutPhilosophySection"));
const AboutTeamSection = lazy(() => import("@/components/about/AboutTeamSection"));
const AboutFeaturesSection = lazy(() => import("@/components/about/AboutFeaturesSection"));

export default function About1Page({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* Section 1: Breadcrumb Page Banner (Immediate render) */}
      <PageBanner
        title="About 1"
        breadcrumb="ABOUT 1"
        onNavigateHome={onNavigateHome}
      />

      {/* Section 2: Our About Story Hero Showcase (Immediate render) */}
      <AboutStorySection />

      {/* Below-the-fold lazy-loaded sections rendered progressively */}
      <Suspense fallback={null}>
        {/* Section 3: Company Milestones & Statistics */}
        <AboutStatsSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 4: Customer Testimonial Slider */}
        <AboutTestimonialsSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 5: Brand Craft Showcase & Fashion Philosophy */}
        <AboutPhilosophySection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 6: Meet Our Teams */}
        <AboutTeamSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 7: Service Guarantees & Features */}
        <AboutFeaturesSection />
      </Suspense>
    </div>
  );
}
