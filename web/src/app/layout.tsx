import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Navbar from "@shared/Navbar";
import Footer from "@shared/Footer";
import styles from "@shared/layout.module.css";
import { UserProvider } from "@/context/UserContext";
import { AIProvider } from "@/context/AIContext";
import AIAgent from "@shared/AIAgent";
import MeshBackground from "@shared/MeshBackground";
import QuickAccess from "@shared/QuickAccess";
import StatusBar from "@shared/StatusBar";
import NoiseOverlay from "@shared/NoiseOverlay";
import NextTopLoader from 'nextjs-toploader';
import ScrollProgress from "@shared/ScrollProgress";
import PageTransition from "@/components/shared/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const CANONICAL_URL = "https://halqa.dev";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: {
    default: "Halqa | The Developer Sanctuary",
    template: "%s | Halqa"
  },
  description: "Master the code with high-performance roadmaps, premium UI components, and curated resources for modern engineers.",
  openGraph: {
    title: "Halqa | The Developer Sanctuary",
    description: "The minimalist developer ecosystem. Zero distraction, ultra-high performance.",
    url: CANONICAL_URL,
    siteName: "Halqa",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Halqa Social Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halqa | The Developer Sanctuary",
    description: "The minimalist developer ecosystem. Zero distraction, ultra-high performance.",
    creator: "@shuvocode",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        {/* Navigation Progress Loader - Industrial Teal with Glow */}
        <NextTopLoader 
            color="var(--accent)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px var(--accent), 0 0 5px var(--accent)"
        />
        
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        <UserProvider>
          <AIProvider>
            <div className={styles.mainLayout}>
              <StatusBar />
              <Navbar />
              
              {/* Premium Page Transitions */}
              <PageTransition>
                <main className={styles.mainContent}>
                  {children}
                </main>
              </PageTransition>

              <Footer />
              <AIAgent />
              <MeshBackground />
              <QuickAccess />
              <NoiseOverlay />
            </div>
          </AIProvider>
        </UserProvider>
      </body>
    </html>
  );
}
