"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const BLUEPRINTS = [
  {
    id: "ai-chat",
    title: "AI-Powered Chat",
    tag: "Next.js + AI",
    roadmap: { name: "Full-Stack Stage 04", link: "/roadmaps/fullstack", icon: "🗺️" },
    code: { name: "Glowing Input UI", link: "/codelab", icon: "🧪" },
    api: { name: "Google Gemini API", link: "/apilab", icon: "🔌" },
    steps: [
      "Securely init a Next.js App Router API route fetching directly from the Gemini Endpoint.",
      "Bind user interactive queries dynamically to the Halqa Glowing Input UI components.",
      "Persist message threads natively mapping Prisma Schema to your database."
    ]
  },
  {
    id: "crypto-dash",
    title: "Crypto Dashboard",
    tag: "React Data Stream",
    roadmap: { name: "Frontend Stage 03", link: "/roadmaps/frontend", icon: "🗺️" },
    code: { name: "Glassmorphism Card", link: "/codelab", icon: "🧪" },
    api: { name: "CoinGecko Market Feed", link: "/apilab", icon: "🔌" },
    steps: [
      "Establish absolute async fetching of live cryptocurrency payloads utilizing CoinGecko via useEffect.",
      "Map pure price data cleanly onto the transparent Halqa Glass Card layout.",
      "Architect React Context to maintain automatic 60-second price polling globally."
    ]
  },
  {
    id: "weather-app",
    title: "Native Weather Map",
    tag: "Expo Geolocation",
    roadmap: { name: "Mobile Stage 02", link: "/roadmaps/mobile", icon: "🗺️" },
    code: { name: "Apple Bento Grid", link: "/codelab", icon: "🧪" },
    api: { name: "OpenWeather Engine", link: "/apilab", icon: "🔌" },
    steps: [
      "Deploy Expo Go application capturing raw device geolocation utilizing Expo Location APIs.",
      "Feed coordinates structurally into the OpenWeatherMap endpoints to extract local climate arrays.",
      "Dissect current conditions mapping metrics natively onto asymmetrical Bento Grid containers."
    ]
  }
];

export default function Projects() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const toggleDrawer = (id: string) => {
    setOpenDrawer(openDrawer === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Project <span className="text-gradient">Hub</span></h1>
        <p className={styles.subtitle}>
          The final piece of the Halqa puzzle. Combine theoretical roadmap learning directly with Code Lab components and live API Lab data to architect real applications.
        </p>
      </header>

      <div className={styles.grid}>
        {BLUEPRINTS.map((bp) => {
          const isOpen = openDrawer === bp.id;

          return (
            <div key={bp.id} className={styles.card + ' glass-panel'}>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{bp.title}</h3>
                  <span className={styles.techTag}>{bp.tag}</span>
                </div>

                {/* The "Connect the Dots" Trinity UI */}
                <div className={styles.trinity}>
                  <div className={styles.trinityItem}>
                    <div className={styles.trinityIcon}>{bp.roadmap.icon}</div>
                    <Link href={bp.roadmap.link} className={styles.trinityLink}>
                      {bp.roadmap.name} <span>View Path &rarr;</span>
                    </Link>
                  </div>
                  <div className={styles.trinityItem}>
                    <div className={styles.trinityIcon}>{bp.code.icon}</div>
                    <Link href={bp.code.link} className={styles.trinityLink}>
                      {bp.code.name} <span>Grab Code &rarr;</span>
                    </Link>
                  </div>
                  <div className={styles.trinityItem}>
                    <div className={styles.trinityIcon}>{bp.api.icon}</div>
                    <Link href={bp.api.link} className={styles.trinityLink}>
                      {bp.api.name} <span>Get Data &rarr;</span>
                    </Link>
                  </div>
                </div>

                <button 
                  onClick={() => toggleDrawer(bp.id)} 
                  className={styles.actionBtn + ' ' + (isOpen ? styles.open : '')}
                >
                  {isOpen ? 'Close Blueprint' : 'Start Building'}
                </button>
              </div>

              {/* Expandable Checklist Drawer */}
              <div className={styles.expandable + ' ' + (isOpen ? styles.open : '')}>
                <div className={styles.drawerContent}>
                  <ul className={styles.stepList}>
                    {bp.steps.map((step, index) => (
                      <li key={index} className={styles.stepItem}>
                        <b>Step 0{index + 1}:</b> {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
