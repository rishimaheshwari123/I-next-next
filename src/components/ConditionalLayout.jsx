"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ButtomIcon from "@/components/ButtomIcon";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin routes: no navbar, footer, scroll to top, or bottom icons
    return <>{children}</>;
  }

  // Regular routes: show navbar, footer, and other components
  return (
    <>
      <Navbar />
      {children}
      <ScrollToTop />
      <ButtomIcon />
      <Footer />
    </>
  );
}
