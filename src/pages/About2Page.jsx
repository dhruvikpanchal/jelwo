import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import AboutStoryVideoSection from "@/components/about/AboutStoryVideoSection";

// Below-the-fold sections lazily loaded to ensure immediate narrative render
const AboutFounderStorySection = lazy(() => import("@/components/about/AboutFounderStorySection"));
const AboutMissionVisionSection = lazy(() => import("@/components/about/AboutMissionVisionSection"));
const AboutTeamSection = lazy(() => import("@/components/about/AboutTeamSection"));
const AboutTestimonialsMinimalSection = lazy(() => import("@/components/about/AboutTestimonialsMinimalSection"));

export default function About2Page({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* Section 1: Breadcrumb Page Banner (Immediate render) */}
      <PageBanner
        title="About 2"
        breadcrumb="ABOUT 2"
        onNavigateHome={onNavigateHome}
      />

      {/* Section 2: Story Narrative with Video Badge (Immediate render) */}
      <AboutStoryVideoSection />

      {/* Below-the-fold lazy-loaded sections rendered progressively */}
      <Suspense fallback={null}>
        {/* Section 3: Story About Us with Founder Visual & Signature */}
        <AboutFounderStorySection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 4: Brand Mission, Vision & Support Pillars */}
        <AboutMissionVisionSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 5: Meet Our Teams */}
        <AboutTeamSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* Section 6: Client Testimonial Slider */}
        <AboutTestimonialsMinimalSection />
      </Suspense>
    </div>
  );
}
