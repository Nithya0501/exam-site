"use client";

import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import "./globals.scss";
import { store } from "../redux/store";
const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
