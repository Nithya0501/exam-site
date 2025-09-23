import './globals.css';

export const metadata = {
  title: 'Exam Site',
  description: 'A clean Next.js starter project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
