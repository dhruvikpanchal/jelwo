import { useEffect } from "react";
import PageBanner from "@/components/common/PageBanner";
import BlogGridSection from "@/components/blog/BlogGridSection";

export default function BlogPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white font-sans text-[#1c1b1b]">
      {/* 1. Page Breadcrumb Banner: "HOME - BLOG" & "Blog" */}
      <PageBanner
        title="Blog"
        breadcrumb="BLOG"
        onNavigateHome={onNavigateHome}
      />

      {/* 2. Responsive Blog Cards Grid */}
      <BlogGridSection />
    </div>
  );
}
