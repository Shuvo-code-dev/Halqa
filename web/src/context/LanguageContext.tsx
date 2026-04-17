'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Initial dictionaries will be populated in separate JSON files, 
// for now we'll handle basic logic and dynamic imports or embedding.
import en from '../../locales/en.json';
import bn from '../../locales/bn.json';

const dictionaries: Record<Language, any> = { en, bn };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('halqa-lang') as Language;
    if (saved && (saved === 'en' || saved === 'bn')) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.startsWith('bn') ? 'bn' : 'en';
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('halqa-lang', lang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result = dictionaries[language];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // Fallback to the key itself
      }
    }
    return typeof result === 'string' ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
