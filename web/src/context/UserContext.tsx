'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  completedStages: Record<string, string[]>; // roadmapPath -> stageIds[]
  toggleStageCompletion: (roadmapPath: string, stageId: string) => void;
  isStageCompleted: (roadmapPath: string, stageId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [completedStages, setCompletedStages] = useState<Record<string, string[]>>({});

  /**
   * HYDRATION EFFECT
   * Loads user progress from LocalStorage after the initial commit.
   * This decoupled approach prevents the "cascading renders" warning.
   */
  useEffect(() => {
    const savedProgress = localStorage.getItem('halqa-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Defer state update to avoid synchronous cascading renders during hydration
        setTimeout(() => setCompletedStages(parsed), 0);
      } catch (e) {
        console.error("Halqa Registry: Failed to restore local progress data.", e);
      }
    }
  }, []);

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
