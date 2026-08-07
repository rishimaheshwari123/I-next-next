"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/common/PageLoader";

function RouteLoaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Initial load trigger on safe client mount
  useEffect(() => {
    // Snappy initial brand loader transition
    const timer = setTimeout(() => {
      setIsFading(true);
      const fadeTimer = setTimeout(() => {
        setIsLoading(false);
        setIsFading(false);
      }, 200);
      return () => clearTimeout(fadeTimer);
    }, 250);
    return () => clearTimeout(timer);
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
