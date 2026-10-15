import { useEffect, lazy, Suspense } from "react";
import PageBanner from "@/components/common/PageBanner";
import ContactMapInfoSection from "@/components/contact/ContactMapInfoSection";

// Below-the-fold sections lazily loaded to avoid heavy map and form payloads on load
const ContactPillarsSection = lazy(() => import("@/components/contact/ContactPillarsSection"));
const ContactMapEmbedSection = lazy(() => import("@/components/contact/ContactMapEmbedSection"));
const ContactFormSection = lazy(() => import("@/components/contact/ContactFormSection"));

export default function Contact2Page({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Hero Page Banner (Immediate render) */}
      <PageBanner
        title="Contact 2"
        breadcrumb="CONTACT 2"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Direct Contact Details & Global Map Visual (Immediate render) */}
      <ContactMapInfoSection />

      {/* Below-the-fold lazy-loaded sections rendered progressively */}
      <Suspense fallback={null}>
        {/* 3. Intermediate Highlight Pillars */}
        <ContactPillarsSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* 4. Full Control Interactive Google Map (Deferred) */}
        <ContactMapEmbedSection />
      </Suspense>

      <Suspense fallback={null}>
        {/* 5. Keep in touch with us Form Section */}
        <ContactFormSection />
      </Suspense>
    </div>
  );
}
