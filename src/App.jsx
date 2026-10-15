import { lazy, Suspense } from "react";
import { MotionConfig } from "motion/react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import { RouterProvider, AppRoutes } from "./routes";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";

// Lazy-load promotional popup modal so it does not inflate the initial bundle
const PopupModal = lazy(() => import("./components/common/PopupModal"));

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="min-h-screen w-full max-w-full overflow-x-clip bg-white text-[#1c1b1b] font-sans antialiased selection:bg-[#ca7b64] selection:text-white flex flex-col justify-between">
              {/* 1. Header Component (Sticky Navigation with Topbar) */}
              <Header />

              {/* Slide-out Cart Drawer anchored to right side */}
              <CartDrawer />

          {/* 2. Main Controlled Routing Page Content */}
          <main className="flex-1 w-full max-w-full overflow-x-clip">
            <AppRoutes />
          </main>

          {/* 3. Footer Component */}
          <Footer />

          {/* 4. Independent Scroll To Top Button */}
          <ScrollToTop />

          {/* 5. Timed Promotional Popup Modal (Deferred) */}
          <Suspense fallback={null}>
            <PopupModal />
          </Suspense>
        </div>
          </CartProvider>
        </WishlistProvider>
      </RouterProvider>
    </MotionConfig>
  );
}

export default App;
