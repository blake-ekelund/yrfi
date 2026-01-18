import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalNav from "../components/GlobalNav";
import GlobalFooter from "../components/GlobalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yrfi.io — Your Financial Independence",
  description:
    "Quick calculators that make complex personal finance concepts obvious.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          margin: 0,
          fontFamily: "var(--font-geist-sans)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden", // 🔒 critical
        }}
      >
        <GlobalNav />

        {/* MAIN CONTENT */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        <GlobalFooter />
      </body>
    </html>
  );
}
