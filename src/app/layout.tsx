
// ./app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import Navbar from '@/components/Navbar';  // Import the Navbar component
import React from 'react';


export const metadata: Metadata = {
  title: "Moja apicka",
  description: "Made by Sasenka Masenka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Navbar /> {/* Bottom Navigation */}
        </div>
      </body>
    </html>
  );
}
