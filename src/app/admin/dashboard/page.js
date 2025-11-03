'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/dashboard.module.scss';
import { apiUrl } from '../../../lib/api';
import DashboardStats from '../../../components/DashboardStats';
import QuickActions from '../../../components/QuickActions';
import UpcomingExams from '../../../components/UpcomingExams';
import DashboardNavbar from '../../../components/DashboardNavbar'

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(
    () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/admin/login');

      const fetchData = async () => {
        try {
          const res = await fetch(apiUrl('/api/admin/dashboard'), {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.admin || data.user);
          } else {
            localStorage.removeItem('token');
            router.push('/admin/login');
          }
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
          router.push('/admin/login');
        }
      };
      fetchData();
    },
    [router]
  );

  if (!user) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.dashboard}>
      <DashboardNavbar />
      <hr className="hr" />
      <header className={styles.header}>
        <h2>Welcome back, Admin 👋</h2>
        <p>Here's your current exam summary.</p>
      </header>
      <DashboardStats />
      <QuickActions />
      <UpcomingExams />
    </div>
  );
}
