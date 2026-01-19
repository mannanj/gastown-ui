import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Gas Town | Command Center",
  description: "Orchestration system for Claude Code instances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0d0e10] text-[#e2e3e5]">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundSize: '40px 40px',
              backgroundImage: `
                linear-gradient(to right, #ff6b35 1px, transparent 1px),
                linear-gradient(to bottom, #ff6b35 1px, transparent 1px)
              `,
            }}
          />
          {/* Radial Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.05) 0%, transparent 50%)',
            }}
          />
          {/* Noise Texture */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Layout */}
        <Sidebar />
        <Header />
        <main className="ml-64 pt-14 min-h-screen relative">
          {children}
        </main>
      </body>
    </html>
  );
}
