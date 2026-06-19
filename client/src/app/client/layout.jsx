"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ClientSidebar from "@/components/client/ClientSidebar";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/login" || pathname === "/register") {
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    // Check if user is client
    const userData = JSON.parse(user);
    if (userData.role !== "client") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [pathname, router]);

  // Don't show sidebar on login/register page
  if (pathname === "/login" || pathname === "/register") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ClientSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "lg:ml-20" : "lg:ml-72"}`}>
        <div className="p-4 md:p-8">
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
}
