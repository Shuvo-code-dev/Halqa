'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sendMessage: (content: string) => Promise<void>;
  isTyping: boolean;
  clearHistory: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bulz-ai-history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Initial greeting if no history
      setMessages([
        { 
          role: 'assistant', 
          content: "Welcome to Bulz. I am the central intelligence of this ecosystem. How can I guide your mastery today?", 
          timestamp: Date.now() 
        }
      ]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('bulz-ai-history', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMsg: ChatMessage = { role: 'user', content, timestamp: Date.now() };
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: content, 
          history: messages.slice(-10) // Send last 10 messages for context
        })
      });

      if (!response.ok) throw new Error('Failed to fetch AI response');
      
      const data = await response.json();
      const aiMsg: ChatMessage = { 
        role: 'assistant', 
        content: data.reply, 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMsg: ChatMessage = { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my central core. Please try again in a moment.", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: "Memory cleared. I'm ready for a fresh inquiry.", 
        timestamp: Date.now() 
      }
    ]);
    localStorage.removeItem('bulz-ai-history');
  };

  return (
    <AIContext.Provider value={{ messages, isOpen, setIsOpen, sendMessage, isTyping, clearHistory }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within an AIProvider');
  return context;
};
