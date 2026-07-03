"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/common/PageLoader";

function RouteLoaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial load trigger on safe client mount
  useEffect(() => {
    setHasMounted(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsFading(true);
      const fadeTimer = setTimeout(() => {
        setIsLoading(false);
        setIsFading(false);
      }, 300);
      return () => clearTimeout(fadeTimer);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Reset loader state on route/params change
  useEffect(() => {
    if (!hasMounted) return;
    setIsFading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, hasMounted]);

  useEffect(() => {
    const handleLinkClick = (event) => {
      // Find closest anchor tag
      const anchor = event.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      // Only handle internal links that do not open in a new tab/window and aren't hash links
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        (!target || target === "_self") &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        try {
          const currentUrl = new URL(window.location.href);
          const targetUrl = new URL(href, window.location.href);

          // Trigger loader if path or search query is different
          if (
            currentUrl.pathname !== targetUrl.pathname ||
            currentUrl.search !== targetUrl.search
          ) {
            setIsFading(false);
            setIsLoading(true);
          }
        } catch (e) {
          // Fallback for invalid URLs
        }
      }
    };

    const handlePopState = () => {
      setIsFading(false);
      setIsLoading(true);
    };

    document.addEventListener("click", handleLinkClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`transition-opacity duration-300 z-[9999] relative ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <PageLoader />
        </div>
      )}
      {children}
    </>
  );
}

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isClientRoute = pathname?.startsWith("/client");
  const isEmployeeRoute = pathname?.startsWith("/employee");

  if (isAdminRoute || isClientRoute || isEmployeeRoute) {
    // Admin, Client, and Employee routes: no navbar, footer, scroll to top, or bottom icons
    return <>{children}</>;
  }

  // Regular routes: show navbar, footer, and other components
  return (
    <Suspense fallback={<PageLoader />}>
      <RouteLoaderWrapper>
        <Navbar />
        {children}
        <ScrollToTop />
        <Footer />
      </RouteLoaderWrapper>
    </Suspense>
  );
}
