import Link from "next/link";
import "./globals.scss"; 

export default function Home() {
  return (
    <main className="front-page">
      <header className="front-hero">
        <div className="front-text">
          <h1>Welcome to ExamSite</h1>
          <p>Manage exams, students, and results with ease.</p>
          <div className="front-buttons">
            <Link href="/admin/login" className="btn primary">
              Admin Login
            </Link>
       
          </div>
        </div>
        <div className="front-image">
          <img src="/logo.png" alt="ExamSite Logo" />
        </div>
      </header>
    </main>
  );
}
