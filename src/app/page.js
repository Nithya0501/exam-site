import Link from "next/link";
export default function home({ children }) {
  return (
    <div className="admin-wrapper">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <li>
          <Link href="/admin/login">Login</Link><br></br>
          <Link href="/admin/dashboard">Dashboard</Link><br></br>
          <Link href="/admin/users">Users</Link>
          </li>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
