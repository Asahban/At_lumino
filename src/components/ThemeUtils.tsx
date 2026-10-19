
import { cn } from "@/lib/utils";
import { Theme } from "@/types/theme";

// Function to get theme-specific background and text colors
export const getThemeClasses = (currentTheme: Theme) => {
  switch (currentTheme) {
    case 'golden':
      return "bg-amber-50 text-graphite-dark";
    case 'emerald':
      return "bg-emerald-50 text-slate-800";
    case 'dark':
      return "bg-gray-900 text-white";
    case 'royal':
      return "bg-gradient-to-b from-[#f8f4ff] to-[#f0ebff] text-indigo-950";
    default:
      return "bg-background text-foreground";
  }
};

// Function to get LED glow cursor color based on theme
export const getLedGlowColor = (currentTheme: Theme) => {
  switch (currentTheme) {
    case 'golden':
      return 'rgba(245, 158, 11, 0.7)'; // amber glow with increased opacity
    case 'emerald':
      return 'rgba(16, 185, 129, 0.7)'; // emerald glow with increased opacity
    case 'dark':
      return 'rgba(139, 92, 246, 0.8)'; // purple glow for dark theme with increased opacity
    case 'royal':
      return 'rgba(103, 58, 183, 0.7)'; // royal purple glow with increased opacity
    default:
      return 'rgba(212, 175, 55, 0.7)'; // gold glow with increased opacity
  }
};

// Get proper card style based on theme
export const getCardStyle = (element: string, currentTheme: Theme) => {
  switch (currentTheme) {
    case 'golden':
      return element === 'border' ? 'gradient-border' : 'neumorphic';
    case 'emerald':
      return element === 'border' ? 'gradient-border-emerald' : 'glass-morphism';
    case 'dark':
      return element === 'border' ? 'gradient-border-dark' : 'dark-theme-card';
    case 'royal':
      return element === 'border' ? 'gradient-border-royal' : 'royal-card';
    default:
      return element === 'border' ? '' : '';
  }
};

// Get text color based on theme
export const getTextColor = (currentTheme: Theme, type: 'heading' | 'body' | 'muted' = 'body') => {
  switch (currentTheme) {
    case 'golden':
      return type === 'heading' ? 'text-graphite-dark font-medium' : 
             type === 'body' ? 'text-graphite font-medium' : 'text-graphite/80';
    case 'emerald':
      return type === 'heading' ? 'text-slate-800 font-medium' : 
             type === 'body' ? 'text-slate-700 font-medium' : 'text-slate-600';
    case 'dark':
      return type === 'heading' ? 'text-white font-medium' : 
             type === 'body' ? 'text-gray-200 font-medium' : 'text-gray-400';
    case 'royal':
      return type === 'heading' ? 'text-indigo-950 font-medium' : 
             type === 'body' ? 'text-indigo-900 font-medium' : 'text-indigo-700';
    default:
      return type === 'heading' ? 'text-foreground font-medium' : 
             type === 'body' ? 'text-foreground font-medium' : 'text-muted-foreground';
  }
};
