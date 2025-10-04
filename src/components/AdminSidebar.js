"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Users,
  Award,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,

} from "lucide-react";
import { useState } from "react";
import styles from "../styles/AdminSidebar.module.scss";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/admin/course", label: "Course", icon: <FileText size={18} /> },
    { href: "/admin/students", label: "Students", icon: <Users size={18} /> },
    { href: "/admin/results", label: "Results", icon: <Award size={18} /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  return (
    <>
      <button
        className={`${styles.menuButton} ${mobileOpen ? styles.activeBtn : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <aside
        className={`${styles.adminSidebar} 
          ${collapsed ? styles.collapsed : ""} 
          ${mobileOpen ? styles.open : ""}`}
      >
        <div className={styles.logo}>Exam Site</div>

        <nav>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""
                }`}
              onClick={() => setMobileOpen(false)}
            >
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.label}>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.logoutContainer}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.icon}><LogOut size={18} /></span>
            <span className={styles.label}>Logout</span>
          </button>
        </div>

        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>
    </>
  );
}
