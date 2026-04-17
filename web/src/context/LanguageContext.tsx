'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const [dictionary, setDictionary] = useState<any>({});
  const [enFallback, setEnFallback] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Load English dictionary once for fallback
  useEffect(() => {
    fetch('/locales/en.json')
      .then(res => res.json())
      .then(data => setEnFallback(data))
      .catch(err => console.error('Failed to load fallback EN dictionary', err));
  }, []);

  // Load active language dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (response.ok) {
          const data = await response.json();
          setDictionary(data);
        } else {
          // If 404, we use the fallback
          setDictionary({});
        }
      } catch (err) {
        setDictionary({});
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [language]);

  useEffect(() => {
    const saved = localStorage.getItem('halqa-lang');
    if (saved) {
      setLanguage(saved);
    } else {
      // Basic browser detection - simplified for the expanded list
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang || 'en');
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('halqa-lang', lang);
    document.cookie = `halqa-lang=${lang}; path=/; max-age=31536000`; // 1 year
  };

  const t = (path: string) => {
    const keys = path.split('.');
    
    // 1. Try Target Language
    let result = dictionary;
    let found = true;
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        found = false;
        break;
      }
    }

    if (found && typeof result === 'string') return result;

    // 2. Fallback to English
    let fallbackResult = enFallback;
    for (const key of keys) {
      if (fallbackResult && fallbackResult[key]) {
        fallbackResult = fallbackResult[key];
      } else {
        return path; // Last resort: the key string
      }
    }

    return typeof fallbackResult === 'string' ? fallbackResult : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
