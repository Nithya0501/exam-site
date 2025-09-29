import DashboardPage from "../dashboard/page";
import ExamsPage from "../exams/page";
import LoginForm from "../login/page";
import ResultsPage from "../results/page";
import SettingsPage from "../settings/page";
import StudentsPage from "../students/page";
import ResultsPage from "../results/page";
import SettingsPage from "../settings/page";
import StudentsPage from "../students/page";
import AdminLayout from "../layout";


export default function AllAdminPages() {
  return (
    <div>
      <DashboardPage/>
      <ExamsPage/>
      <LoginForm/>
      <ResultsPage/>
      <StudentsPage/>
      <SettingsPage/>
      <AdminLayout/>
      </div>
  );
}
