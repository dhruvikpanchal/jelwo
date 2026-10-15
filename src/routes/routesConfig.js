import { lazy } from "react";

// Fast lazy-loaded page components for optimal performance and code splitting
export const HomePage = lazy(() => import("../pages/HomePage"));
export const ProductsPage = lazy(() => import("../pages/ProductsPage"));
export const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
export const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage"));
export const TermsAndConditionPage = lazy(() => import("../pages/TermsAndConditionPage"));
export const RefundPolicyPage = lazy(() => import("../pages/RefundPolicyPage"));
export const ShippingAndReturnPage = lazy(() => import("../pages/ShippingAndReturnPage"));
export const StoreLocationPage = lazy(() => import("../pages/StoreLocationPage"));
export const FaqPage = lazy(() => import("../pages/FaqPage"));
export const Contact1Page = lazy(() => import("../pages/Contact1Page"));
export const Contact2Page = lazy(() => import("../pages/Contact2Page"));
export const About1Page = lazy(() => import("../pages/About1Page"));
export const About2Page = lazy(() => import("../pages/About2Page"));
export const BlogPage = lazy(() => import("../pages/BlogPage"));
export const NewsPage = lazy(() => import("../pages/NewsPage"));
export const WishlistPage = lazy(() => import("../pages/WishlistPage"));
export const CollectionsPage = lazy(() => import("../pages/CollectionsPage"));
export const CartPage = lazy(() => import("../pages/CartPage"));
export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const routesConfig = [
  {
    path: "/cart",
    title: "Shopping Cart",
    component: CartPage,
  },
  {
    path: "/products",
    title: "Products",
    component: ProductsPage,
  },
  {
    path: "/collections",
    title: "Collections",
    component: CollectionsPage,
  },
  {
    path: "/collections/all",
    title: "Collections",
    component: ProductsPage,
  },
  {
    path: "/shop",
    title: "Shop",
    component: ProductsPage,
  },
  {
    path: "/product",
    title: "Product Details",
    component: ProductDetailPage,
  },
  {
    path: "/products/rose-gold-rings",
    title: "Rose gold rings",
    component: ProductDetailPage,
  },
  {
    path: "/products/flower-nose-pin",
    title: "Flower nose pin",
    component: ProductDetailPage,
  },
  {
    path: "/products/flower-jhumka",
    title: "Flower jhumka",
    component: ProductDetailPage,
  },
  {
    path: "/products/drop-earrings",
    title: "Drop earrings",
    component: ProductDetailPage,
  },
  {
    path: "/products/floral-gold-bangle",
    title: "Floral gold bangle",
    component: ProductDetailPage,
  },
  {
    path: "/products/simple-pearl-earrings",
    title: "Simple Pearl earrings",
    component: ProductDetailPage,
  },
  {
    path: "/products/diamond-rings",
    title: "Diamond rings",
    component: ProductDetailPage,
  },
  {
    path: "/products/gold-nose-pin",
    title: "Gold nose pin",
    component: ProductDetailPage,
  },
  {
    path: "/products/glitter-diamond-ring",
    title: "Glitter diamond ring",
    component: ProductDetailPage,
  },
  {
    path: "/products/modish-bracelet",
    title: "Modish bracelet",
    component: ProductDetailPage,
  },
  {
    path: "/blogs",
    title: "Blog",
    component: BlogPage,
  },
  {
    path: "/blog",
    title: "Blog",
    component: BlogPage,
  },
  {
    path: "/news",
    title: "News",
    component: NewsPage,
  },
  {
    path: "/blogs/news",
    title: "News",
    component: NewsPage,
  },
  {
    path: "/",
    title: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    title: "About Us",
    component: About1Page,
  },
  {
    path: "/about-1",
    title: "About 1",
    component: About1Page,
  },
  {
    path: "/about-2",
    title: "About 2",
    component: About2Page,
  },
  {
    path: "/contact-1",
    title: "Contact 1",
    component: Contact1Page,
  },
  {
    path: "/contact",
    title: "Contact",
    component: Contact1Page,
  },
  {
    path: "/contact-2",
    title: "Contact 2",
    component: Contact2Page,
  },
  {
    path: "/faq",
    title: "FAQ's",
    component: FaqPage,
  },
  {
    path: "/faqs",
    title: "FAQ's",
    component: FaqPage,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    component: PrivacyPolicyPage,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    component: PrivacyPolicyPage,
  },
  {
    path: "/terms-and-condition",
    title: "Terms & Condition",
    component: TermsAndConditionPage,
  },
  {
    path: "/terms",
    title: "Terms & Condition",
    component: TermsAndConditionPage,
  },
  {
    path: "/refund-policy",
    title: "Refund Policy",
    component: RefundPolicyPage,
  },
  {
    path: "/refund",
    title: "Refund Policy",
    component: RefundPolicyPage,
  },
  {
    path: "/shipping-and-return",
    title: "Shipping & Return",
    component: ShippingAndReturnPage,
  },
  {
    path: "/shipping",
    title: "Shipping & Return",
    component: ShippingAndReturnPage,
  },
  {
    path: "/store-location",
    title: "Store Location",
    component: StoreLocationPage,
  },
  {
    path: "/wishlist",
    title: "Wishlist",
    component: WishlistPage,
  },
  {
    path: "/my-wishlist",
    title: "Wishlist",
    component: WishlistPage,
  },
  {
    path: "/pages/wishlist",
    title: "Wishlist",
    component: WishlistPage,
  },
  {
    path: "/404",
    title: "404 Not Found",
    component: NotFoundPage,
  },
  {
    path: "/404-not-found",
    title: "404 Not Found",
    component: NotFoundPage,
  },
];

export default routesConfig;
