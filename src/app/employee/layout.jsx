"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import EmployeeSidebar from "@/components/employee/EmployeeSidebar";

export default function EmployeeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/login") {
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    // Check if user is employee
    const userData = JSON.parse(user);
    if (userData.role !== "employee") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [pathname, router]);

  // Don't show sidebar on login page
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <EmployeeSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`transition-all duration-300 ${isCollapsed ? "lg:ml-20" : "lg:ml-72"}`}>
        <div className="p-4 md:p-8">
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
}
