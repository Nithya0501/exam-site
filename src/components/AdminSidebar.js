"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/AdminSidebar.module.scss";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/exams", label: "Exams" },
    { href: "/admin/students", label: "Students" },
    { href: "/admin/results", label: "Results" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside className={styles.adminSidebar}>
      <div className={styles.logo}>Exam Site</div>
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? styles.active : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}




// import Link from "next/link";
// import styles from "../styles/AdminSidebar.module.scss";

// export default function AdminSidebar() {
//   return (
//     <aside className={styles.adminSidebar}>
//       <div className={styles.logo}>Exam Site</div>
//       <nav>
//         <Link href="/admin/dashboard">Dashboard</Link>
//         <Link href="/admin/exams">Exams</Link>
//         <Link href="/admin/students">Students</Link>
//         <Link href="/admin/results">Results</Link>
//         <Link href="/admin/settings">Settings</Link>
//       </nav>
//     </aside>
//   );
// }
