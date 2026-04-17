'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  completedStages: Record<string, string[]>; // roadmapPath -> stageIds[]
  toggleStageCompletion: (roadmapPath: string, stageId: string) => void;
  isStageCompleted: (roadmapPath: string, stageId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [completedStages, setCompletedStages] = useState<Record<string, string[]>>({});

  // Sync with LocalStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('halqa-bookmarks');
    const savedProgress = localStorage.getItem('halqa-progress');
    
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedProgress) setCompletedStages(JSON.parse(savedProgress));
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      localStorage.setItem('halqa-bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const toggleStageCompletion = (roadmapPath: string, stageId: string) => {
    setCompletedStages(prev => {
      const pathStages = prev[roadmapPath] || [];
      const nextStages = pathStages.includes(stageId) 
        ? pathStages.filter(s => s !== stageId) 
        : [...pathStages, stageId];
      
      const next = { ...prev, [roadmapPath]: nextStages };
      localStorage.setItem('halqa-progress', JSON.stringify(next));
      return next;
    });
  };

  const isStageCompleted = (roadmapPath: string, stageId: string) => {
    return (completedStages[roadmapPath] || []).includes(stageId);
  };

  return (
    <UserContext.Provider value={{ 
      bookmarks, toggleBookmark, isBookmarked, 
      completedStages, toggleStageCompletion, isStageCompleted 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
