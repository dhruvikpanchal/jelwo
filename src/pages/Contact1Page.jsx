import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import QuickSupportSection from "@/components/contact/QuickSupportSection";

// Below-the-fold sections lazily loaded to ensure immediate top banner and cards render
const GetInTouchLocationsSection = lazy(() => import("@/components/contact/GetInTouchLocationsSection"));
const ContactFormSection = lazy(() => import("@/components/contact/ContactFormSection"));
const ContactDirectInfoSection = lazy(() => import("@/components/contact/ContactDirectInfoSection"));

export default function Contact1Page({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Hero Page Banner (Immediate render) */}
      <PageBanner
        title="Contact 1"
        breadcrumb="CONTACT 1"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Quick Support Section (Immediate render) */}
      <QuickSupportSection />

      {/* Below-the-fold lazy-loaded sections rendered progressively */}
      <Suspense fallback={null}>
        {/* 3. Get in touch Locations Carousel Section */}
        <GetInTouchLocationsSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* 4. Keep in touch with us Form Section */}
        <ContactFormSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* 5. Contact us Direct Details & Image Section */}
        <ContactDirectInfoSection />
      </Suspense>
    </div>
  );
}
