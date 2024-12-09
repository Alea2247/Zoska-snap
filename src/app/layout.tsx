// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
import ThemeProvider from "../components/ThemeProvider";
import PublicLayout from './(public)/layout';
import PrivateLayout from './(private)/layout';

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by Sasenka Masenka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const isPrivateRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/private');

  const Layout = isPrivateRoute ? PrivateLayout : PublicLayout;

  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <Navbar />
              <main style={{ flexGrow: 1 }}>{children}</main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}