import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Navbar from "@shared/Navbar";
import Footer from "@shared/Footer";
import styles from "@shared/layout.module.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halqa | The Developer Ecosystem",
  description: "Master the code with high-performance roadmaps and UI components.",
  openGraph: {
    title: "Halqa | The Developer Ecosystem",
    description: "Master the code with high-performance roadmaps and UI components.",
    url: "https://halqa.dev",
    siteName: "Halqa",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halqa | The Developer Ecosystem",
    description: "Master the code with high-performance roadmaps and UI components.",
    images: ["/og-image.png"],
  },
};


import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import { AIProvider } from "@/context/AIContext";
import AIAgent from "@shared/AIAgent";
import MeshBackground from "@shared/MeshBackground";
import QuickAccess from "@shared/QuickAccess";
import StatusBar from "@shared/StatusBar";
import NoiseOverlay from "@shared/NoiseOverlay";

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
