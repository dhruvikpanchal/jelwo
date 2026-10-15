import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfoSection from "./ProductInfoSection";
import { products, findVariant } from "../../data/productsData";
import { Check, Sparkles } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

export default function ProductSectionOne({ product }) {
  const [prevSlug, setPrevSlug] = useState(product?.slug);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  // When active product changes, reset variant & image state during render (avoids cascading effect)
  if (product?.slug !== prevSlug) {
    setPrevSlug(product?.slug);
    setSelectedVariant(product?.variants?.[0] || null);
    setSelectedImageIndex(0);
  }

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  const handleVariantChange = ({ size, color }) => {
    const matched = findVariant(product, { size, color });
    if (matched) {
      setSelectedVariant(matched);
      // If variant has matching image, switch gallery preview to it
      if (matched.image && product?.images) {
        const foundIdx = product.images.findIndex((img) => img.src === matched.image);
        if (foundIdx >= 0) setSelectedImageIndex(foundIdx);
      }
    } else {
      setSelectedVariant((prev) => ({
        ...(prev || product?.variants?.[0]),
        size: size !== undefined ? size : prev?.size,
        color: color !== undefined ? color : prev?.color,
      }));
    }
  };

  const galleryImages = product?.images || [];

  return (
    <section className="w-full bg-white text-[#1c1b1b] pt-6 pb-16 sm:pb-20 font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b1b] text-white px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10">
          <div className="w-6 h-6 rounded-full bg-[#cb765f] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

      <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching exact screenshot */}
        <Reveal direction="down" duration={0.4}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
            <nav className="text-xs sm:text-[13px] text-gray-500 font-normal">
              <a href="/" className="hover:text-[#cb765f] transition-colors">
                Home
              </a>
              <span className="mx-2 text-gray-400">/</span>
              <a href="/products" className="hover:text-[#cb765f] transition-colors">
                Products
              </a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-[#1c1b1b] font-medium">
                {product?.name || "Rose gold rings"}
              </span>
            </nav>

            {/* Quick Product Switcher Pills to test other items easily */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
              <span className="text-[11px] font-semibold uppercase text-gray-400 mr-1 hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#cb765f]" /> All Products:
              </span>
              {products.map((p) => {
                const isActive = p.slug === product?.slug;
                return (
                  <a
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className={`text-[11px] px-2.5 py-1 rounded-[1px] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#1c1b1b] text-white font-semibold shadow-2xs"
                        : "bg-cream-light text-gray-600 hover:bg-[#cb765f] hover:text-white border border-gray-200/70"
                    }`}
                    title={p.name}
                  >
                    {p.name}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Product Gallery with Amazon-type Zoom (sticky on desktop only) */}
          <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-24 w-full max-w-2xl mx-auto lg:max-w-none">
            <Reveal direction="right" duration={0.6} distance={24} className="w-full">
              <ProductGallery
                images={galleryImages}
                productName={product?.name || "Product"}
                selectedIndex={selectedImageIndex}
                onSelectIndex={setSelectedImageIndex}
              />
            </Reveal>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-6 xl:col-span-6 w-full max-w-2xl mx-auto lg:max-w-none">
            <Reveal direction="left" duration={0.6} distance={24} delay={0.08} className="w-full">
              <ProductInfoSection
                product={product}
                selectedVariant={selectedVariant}
                onVariantChange={handleVariantChange}
                onTriggerToast={triggerToast}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
