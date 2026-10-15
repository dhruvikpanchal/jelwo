import { useState, useEffect, useCallback, useContext } from "react";
import { RouterContext, normalizePath } from "./routerCore";

export function RouterProvider({ children }) {
  const getInitialPath = () => {
    // 1. If user landed with a hash like /#privacy or #terms, migrate to clean path
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
      if (hash) {
        let mappedPath = "/" + hash;
        if (hash === "privacy" || hash === "privacy-policy") mappedPath = "/privacy-policy";
        if (hash === "terms" || hash === "terms-and-condition") mappedPath = "/terms-and-condition";
        if (hash === "refund" || hash === "refund-policy") mappedPath = "/refund-policy";
        if (hash === "shipping" || hash === "shipping-and-return") mappedPath = "/shipping-and-return";
        if (hash === "store-location" || hash === "location") mappedPath = "/store-location";
        if (hash === "about" || hash === "about-us") mappedPath = "/about-1";
        if (hash === "about-1" || hash === "about1") mappedPath = "/about-1";
        if (hash === "about-2" || hash === "about2") mappedPath = "/about-2";
        if (hash === "contact" || hash === "contact-us") mappedPath = "/contact-1";
        if (hash === "contact-1" || hash === "contact1") mappedPath = "/contact-1";
        if (hash === "contact-2" || hash === "contact2") mappedPath = "/contact-2";
        if (hash === "products" || hash === "product" || hash === "shop") mappedPath = "/products";
        if (hash === "collections" || hash === "collection") mappedPath = "/collections";
        if (hash === "news" || hash === "blogs" || hash === "blog") mappedPath = "/blogs";
        if (hash === "wishlist" || hash === "my-wishlist") mappedPath = "/wishlist";
        if (hash === "404" || hash === "404-not-found" || hash === "not-found") mappedPath = "/404";
        if (hash === "home" || hash === "") mappedPath = "/";

        window.history.replaceState({}, "", mappedPath);
        return mappedPath;
      }
    }
    return normalizePath(window.location.pathname);
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  // Navigate programmatically without page reload
  const navigate = useCallback((to, options = { replace: false, scrollToTop: true }) => {
    if (!to) return;
    
    // External link check
    if (to.startsWith("http://") || to.startsWith("https://") || to.startsWith("mailto:") || to.startsWith("tel:")) {
      window.location.href = to;
      return;
    }

    const cleanPath = normalizePath(to);
    
    if (options.replace) {
      window.history.replaceState({}, "", to);
    } else {
      window.history.pushState({}, "", to);
    }

    setCurrentPath(cleanPath);

    if (options.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Global link interceptor: all internal links navigate client-side without full reload
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, downloads, or targets like _blank
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // If it starts with # (legacy anchor or route), map it smoothly
      if (href.startsWith("#")) {
        const routeName = href.replace(/^#\/?/, "").toLowerCase();
        if (routeName) {
          e.preventDefault();
          let target = "/" + routeName;
          if (routeName === "privacy") target = "/privacy-policy";
          if (routeName === "terms") target = "/terms-and-condition";
          if (routeName === "refund") target = "/refund-policy";
          if (routeName === "shipping") target = "/shipping-and-return";
          if (routeName === "wishlist" || routeName === "my-wishlist") target = "/wishlist";
          if (routeName === "collections" || routeName === "collection") target = "/collections";
          navigate(target);
        }
        return;
      }

      // If it's an internal path starting with /
      if (href.startsWith("/")) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [navigate]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// Custom Link Component
export function Link({ to, children, className = "", onClick, ...props }) {
  const context = useContext(RouterContext);
  const navigate = context ? context.navigate : (p) => { window.location.href = p; };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export default RouterProvider;
