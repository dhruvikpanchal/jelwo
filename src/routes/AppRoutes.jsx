import { Suspense } from "react";
import { useRouter } from "../hooks/useRouter";
import routesConfig, {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CollectionsPage,
  NotFoundPage,
} from "./routesConfig";

// Minimal, smooth fallback loader while page chunks load
function PageLoader() {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#ca7b64] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  const { currentPath, navigate } = useRouter();

  const pathParts = currentPath.split("/").filter(Boolean);

  let DynamicComponent = null;

  // 1. Collections Listing Page (/collections)
  if (currentPath === "/collections") {
    DynamicComponent = CollectionsPage;
  }
  // 2. Products Catalog Page (/products, /collections/all, /shop)
  else if (
    currentPath === "/products" ||
    currentPath === "/product" ||
    currentPath === "/collections/all" ||
    currentPath === "/shop"
  ) {
    DynamicComponent = ProductsPage;
  }
  // 2. Product Detail / Item Page (/products/:slug or /product/:slug)
  else if (
    pathParts.length >= 2 &&
    (pathParts[0] === "products" || pathParts[0] === "product")
  ) {
    DynamicComponent = ProductDetailPage;
  }
  // 3. News / Blog subpages
  else if (
    currentPath.startsWith("/blogs/news/") ||
    currentPath.startsWith("/news/") ||
    (currentPath.startsWith("/blogs/") && currentPath !== "/blogs") ||
    (currentPath.startsWith("/blog/") && currentPath !== "/blog")
  ) {
    const newsRoute = routesConfig.find((r) => r.path === "/blogs/news" || r.path === "/news");
    DynamicComponent = newsRoute ? newsRoute.component : null;
  }

  // Exact matching for standard pages
  const activeRoute = routesConfig.find((route) => route.path === currentPath);
  const ComponentToRender =
    DynamicComponent ||
    (activeRoute
      ? activeRoute.component
      : currentPath === "/" || currentPath === ""
      ? HomePage
      : NotFoundPage);

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <ComponentToRender onNavigateHome={handleNavigateHome} />
    </Suspense>
  );
}
