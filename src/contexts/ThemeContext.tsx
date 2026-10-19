
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from '@/types/theme';

interface ThemeContextType {
  currentTheme: Theme;  // Keep this existing property
  theme: Theme;  // Add the theme property that Navbar is expecting
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('royal');

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('atlumino-theme') as Theme | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('atlumino-theme', currentTheme);
  }, [currentTheme]);

  const value = {
    currentTheme,
    theme: currentTheme,  // Add this line to match the expected property
    setTheme: setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
