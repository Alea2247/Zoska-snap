// src\app\layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
import ThemeProviderWrapper from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "fekete-snap-zoska",
  description: "Created by Sasenka Masenka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <ThemeProviderWrapper> {/* Wrap everything in the theme provider */}
          <AuthProvider>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <main style={{ flexGrow: 1 }}>{children}</main>
            </div>
            <Navbar />
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}