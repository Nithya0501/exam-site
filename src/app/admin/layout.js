import AdminSidebar from "../../components/AdminSidebar";




export default function Layout({ children }) {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
}