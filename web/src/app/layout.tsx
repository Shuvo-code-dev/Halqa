import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/layout.module.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halqa | A-Z Free Coding Resources & Roadmaps",
  description: "A minimalist, community-driven platform for aspiring developers to find structured coding roadmaps and curated free resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <div className={styles.mainLayout}>
          <Navbar />
          <main className={styles.mainContent}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
