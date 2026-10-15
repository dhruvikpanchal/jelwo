import { lazy, Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import JewelryCollection from "@/components/home/JewelryCollection";

// Below-the-fold sections lazily loaded to drastically reduce initial JS bundle & boost LCP
const HomeBanners = lazy(() => import("@/components/home/HomeBanners"));
const NewArrivals = lazy(() => import("@/components/home/NewArrivals"));
const AboutLuxury = lazy(() => import("@/components/home/AboutLuxury"));
const BrandMarquee = lazy(() => import("@/components/home/BrandMarquee"));
const BestProducts = lazy(() => import("@/components/home/BestProducts"));
const PopularProducts = lazy(() => import("@/components/home/PopularProducts"));
const NewsEvents = lazy(() => import("@/components/home/NewsEvents"));
const TrustFeatures = lazy(() => import("@/components/home/TrustFeatures"));
const InstagramFeed = lazy(() => import("@/components/home/InstagramFeed"));
const NewsletterSection = lazy(() => import("@/components/home/NewsletterSection"));

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Slider Section - Rendered immediately for optimal LCP without animation delay */}
      <HeroSlider />

      {/* 2. Jewelry Collection ("Shop by category") Section with internal Reveal and Stagger */}
      <JewelryCollection />

      {/* Below-the-fold lazy-loaded sections rendered progressively */}
      <Suspense fallback={null}>
        {/* 3. Banner Area Section */}
        <HomeBanners />
      </Suspense>

      <Suspense fallback={null}>
        {/* 4. New Arrivals ("Great selection") Section */}
        <NewArrivals />
      </Suspense>

      <Suspense fallback={null}>
        {/* 5. About Luxury Section */}
        <AboutLuxury />
      </Suspense>

      <Suspense fallback={null}>
        {/* 6. Brand Logos Marquee Section */}
        <BrandMarquee />
      </Suspense>

      <Suspense fallback={null}>
        {/* 7. Best Products Section */}
        <BestProducts />
      </Suspense>

      <Suspense fallback={null}>
        {/* 8. Popular product Section */}
        <PopularProducts />
      </Suspense>

      <Suspense fallback={null}>
        {/* 9. News and Events Section */}
        <NewsEvents />
      </Suspense>

      <Suspense fallback={null}>
        {/* 10. Trust Features Section */}
        <TrustFeatures />
      </Suspense>

      <Suspense fallback={null}>
        {/* 11. Instagram Feed Section */}
        <InstagramFeed />
      </Suspense>

      <Suspense fallback={null}>
        {/* 12. Newsletter Section */}
        <NewsletterSection />
      </Suspense>
    </div>
  );
}
