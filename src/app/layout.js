import "./globals.scss";

export const metadata = {
  title: "ExamSite",
  description: "Academic Exam Dashboard",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
