import styles from '../../../styles/dashboard.module.scss';

export default function DashboardPage() {
  return (
    <div className={styles.dashboardPage}>
      <h1>Dashboard</h1>
      <p>Welcome to the Admin Dashboard!</p>
      <div className={styles.dashboardWidgets}>
        <div className={styles.card}>Total Students: 1200</div>
        <div className={styles.card}>Total Exams: 15</div>
        <div className={styles.card}>Pending Results: 34</div>
      </div>
    </div>
  );
}
