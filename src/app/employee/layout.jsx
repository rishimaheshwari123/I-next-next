"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import EmployeeSidebar from "@/components/employee/EmployeeSidebar";

export default function EmployeeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <EmployeeSidebar />
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
