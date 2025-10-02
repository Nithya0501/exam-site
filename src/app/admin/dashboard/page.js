"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/dashboard.module.scss";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/login");

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.admin || data.user);
        } else {
          localStorage.removeItem("token");
          router.push("/admin/login");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    };
    fetchData();
  }, [router]);

  if (!user) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.card}>
        <h1>Welcome, {user.username}</h1>
        <p className={styles.role}>Role: {user.role}</p>
        <p>This is your admin dashboard.</p>
      </div>
    </div>
  );
}

