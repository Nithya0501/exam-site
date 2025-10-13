import './DashboardStats.scss';

export default function DashboardStats() {
  const stats = [
    { title: "Total Students", value: 1200 },
    { title: "Total Exams", value: 42 },
    { title: "Ongoing Exams", value: 8 },
    { title: "Results Pending", value: 5 },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((s) => (
        <div key={s.title} className={styles.card}>
          <h2>{s.value}</h2>
          <p>{s.title}</p>
        </div>
      ))}
    </div>
  );
}
