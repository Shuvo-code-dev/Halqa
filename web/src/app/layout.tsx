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
  title: "Halqa | The Global Developer Ecosystem",
  description: "A world-class, high-density educational ecosystem for modern developers. 16+ Roadmaps, Visual FX Code Lab, and Multi-language support.",
  openGraph: {
    title: "Halqa | Navigate the Noise, Master the Code",
    description: "Navigate the complex world of software engineering with high-fidelity roadmaps and an elite UI repository.",
    url: "https://halqa.dev",
    siteName: "Halqa",
    images: [
      {
        url: "/og-image.png", // We'll assume this exists or create it
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halqa | The Global Developer Ecosystem",
    description: "16+ Curated Roadmaps and an Elite UI Lab for the modern developer.",
    images: ["/og-image.png"],
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import { AIProvider } from "@/context/AIContext";
import GsapRegistry from "@/components/GsapRegistry";
import AIAgent from "@/components/AIAgent";
import MeshBackground from "@/components/MeshBackground";
import QuickAccess from "@/components/QuickAccess";
import StatusBar from "@/components/StatusBar";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <LanguageProvider>
          <UserProvider>
            <AIProvider>
              <div className={styles.mainLayout}>
                <StatusBar />
                <Navbar />
                <main className={styles.mainContent}>
                  {children}
                </main>
                <Footer />
                <AIAgent />
                <MeshBackground />
                <QuickAccess />
                <NoiseOverlay />
              </div>
            </AIProvider>
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
