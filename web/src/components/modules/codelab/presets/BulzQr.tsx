'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './BulzQr.module.css';

export default function BulzQr() {
  const [text, setText] = useState('https://bulz.dev');
  const [color, setColor] = useState('#2dd4bf');

  return (
    <div className={styles.container}>
      <div className={styles.qrWrapper}>
        <QRCodeSVG 
          value={text} 
          size={200}
          fgColor={color}
          bgColor="transparent"
          level="H"
          marginSize={4}
        />
      </div>
      
      <div className={styles.controls}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
          placeholder="Enter URL or Text"
        />
        <div className={styles.colorRow}>
            <span className={styles.label}>Accent Color</span>
            <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className={styles.colorPicker}
            />
        </div>
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>Need a premium mobile scanner?</p>
        <a 
            href="https://github.com/Shuvo-code-dev/Oi-QR-Scanner" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaLink}
        >
          Get Oi QR Scanner on GitHub &rarr;
        </a>
      </div>
    </div>
  );
}
