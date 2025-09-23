import AdminLayout from "../../../components/adminlayout/AdminLayout";
import UserTable from "../../../components/usertable/UserTable";

export default function UsersPage() {
  return (
    <AdminLayout>
      <h1>Users</h1>
      <UserTable />
    </AdminLayout>
  );
}
