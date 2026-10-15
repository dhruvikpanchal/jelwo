import { useMemo, useState, lazy, Suspense } from "react";
import { useRouter } from "@/hooks/useRouter";
import { products, getProductByHandle } from "@/data/productsData";
import ProductSectionOne from "@/components/product/ProductSectionOne";

// Below-the-fold heavy sections lazily loaded to ensure immediate buy-box interactivity
const ProductSectionTwo = lazy(() => import("@/components/product/ProductSectionTwo"));
const ProductSectionThree = lazy(() => import("@/components/product/ProductSectionThree"));
const ProductSectionFour = lazy(() => import("@/components/product/ProductSectionFour"));
const ProductSectionFive = lazy(() => import("@/components/product/ProductSectionFive"));
const ProductStickyFooter = lazy(() => import("@/components/product/ProductStickyFooter"));

export default function ProductDetailPage() {
  const { currentPath } = useRouter();
  const [toastMessage, setToastMessage] = useState("");

  // Extract slug from path like /products/rose-gold-rings or /products/diamond-rings
  const activeSlug = useMemo(() => {
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length >= 2 && (parts[0] === "products" || parts[0] === "product")) {
      return parts[1];
    }
    if (parts.length === 1 && parts[0] !== "products" && parts[0] !== "product") {
      return parts[0];
    }
    return "rose-gold-rings"; // Default showcase product matching the design
  }, [currentPath]);

  const product = useMemo(() => {
    return getProductByHandle(activeSlug) || products[0];
  }, [activeSlug]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b1b] text-white px-5 py-3 rounded text-xs sm:text-sm shadow-xl flex items-center gap-3 animate-fade-in">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage("")}
            className="text-gray-400 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Section 1: Main Product Showcase with Amazon-type Zoom and Details (Immediate render) */}
      <ProductSectionOne product={product} onTriggerToast={showToast} />

      {/* Section 2: Product Accordion (Description, Additional Info, Return Policies, Reviews) */}
      <Suspense fallback={null}>
        <ProductSectionTwo product={product} onTriggerToast={showToast} />
      </Suspense>

      {/* Section 3: New Woman Fashion Arrivals Editorial Banner */}
      <Suspense fallback={null}>
        <ProductSectionThree />
      </Suspense>

      {/* Section 4: I Make Clothes Make Fashion Editorial Banner */}
      <Suspense fallback={null}>
        <ProductSectionFour />
      </Suspense>

      {/* Section 5: Recommended Products Carousel / Grid */}
      <Suspense fallback={null}>
        <ProductSectionFive currentProduct={product} onTriggerToast={showToast} />
      </Suspense>

      {/* Sticky Bottom Add-To-Cart Bar (appears after Section 1, hides near footer) */}
      <Suspense fallback={null}>
        <ProductStickyFooter product={product} onTriggerToast={showToast} />
      </Suspense>
    </div>
  );
}
