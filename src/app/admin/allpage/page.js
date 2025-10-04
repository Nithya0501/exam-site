import DashboardPage from "../dashboard/page";
import CoursesPage from "../course/page";
import LoginForm from "../login/page";
import ResultsPage from "../results/page";
import SettingsPage from "../settings/page";
import StudentsPage from "../students/page";
import ResultsPage from "../results/page";
import SettingsPage from "../settings/page";
import StudentsPage from "../students/page";
import AdminLayout from "../layout";
import CoursesPage from "../course/page";


export default function AllAdminPages() {
  return (
    <div>
      <DashboardPage/>
      <CoursesPage/>
      <LoginForm/>
      <ResultsPage/>
      <StudentsPage/>
      <SettingsPage/>
      <AdminLayout/>
      </div>
  );
}
