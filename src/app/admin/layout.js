
"use client";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="admin-layout">
      {!isLoginPage && <AdminSidebar />}
      <main className="admin-content">{children}</main>
    </div>
  );
}
