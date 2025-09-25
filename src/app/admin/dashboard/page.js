import '@/styles/dashboard.module.scss'

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome to the Admin Dashboard!</p>
      <div className="dashboard-widgets">
        <div className="card">Total Students: 1200</div>
        <div className="card">Total Exams: 15</div>
        <div className="card">Pending Results: 34</div>
      </div>
    </div>
  );
}
