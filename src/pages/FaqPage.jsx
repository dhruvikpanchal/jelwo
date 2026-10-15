import { useEffect } from "react";
import PageBanner from "@/components/common/PageBanner";
import FaqSidebar from "@/components/faq/FaqSidebar";
import FaqSectionList from "@/components/faq/FaqSectionList";

export default function FaqPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Reusable Top Banner Section */}
      <PageBanner
        title="Faq's"
        breadcrumb="FAQ'S"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Main FAQ Content Grid (Sidebar + Accordion Content) */}
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16 items-start">
        {/* Left Sidebar */}
        <FaqSidebar />

        {/* Right FAQ Accordion Sections */}
        <div className="flex-1 w-full">
          <FaqSectionList />
        </div>
      </div>
    </div>
  );
}
