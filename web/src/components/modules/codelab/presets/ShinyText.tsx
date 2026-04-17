'use client';

import styles from './ShinyText.module.css';

export default function ShinyText({ text = "Shiny Glow", paused = false }) {
  return (
    <div className={`${styles.shinyContainer} ${paused ? styles.paused : ''}`}>
      {text}
    </div>
  );
}
