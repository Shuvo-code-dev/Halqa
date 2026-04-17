'use client';

import { useState, useEffect, useRef } from 'react';
import { useAI } from '@/context/AIContext';
import styles from './AIAgent.module.css';
import gsap from 'gsap';

export default function AIAgent() {
  const { messages, isOpen, setIsOpen, sendMessage, isTyping, clearHistory } = useAI();
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // GSAP Animations for window toggle
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatRef.current, 
        { scale: 0.8, opacity: 0, y: 30, pointerEvents: 'none' },
        { scale: 1, opacity: 1, y: 0, pointerEvents: 'all', duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, [isOpen]);

  // Entry animation for bubble on load
  useEffect(() => {
    gsap.from(bubbleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "elastic.out(1, 0.6)"
    });
  }, []);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className={styles.aiContainer}>
      {isOpen && (
        <div className={styles.chatWindow} ref={chatRef}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <div className={styles.onlineDot}></div>
              Halqa Brain
            </div>
            <button className={styles.clearBtn} onClick={clearHistory}>Reset Cache</button>
          </div>

          <div className={styles.messageArea} ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.aiWrapper}`}>
                <div className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
                  {msg.content}
                </div>
                <div className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={styles.typing}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            )}
          </div>

          <div className={styles.inputArea}>
            <input 
              className={styles.input}
              placeholder="Ask the Brain..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              autoFocus
            />
            <button className={styles.sendBtn} onClick={handleSend} disabled={isTyping || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      <button 
        ref={bubbleRef}
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.5 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
        )}
      </button>
    </div>
  );
}
