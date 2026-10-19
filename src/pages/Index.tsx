
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Theme } from '@/types/theme';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LuxuryBackground from '@/components/LuxuryBackground';
import LedGlowCursor from '@/components/LedGlowCursor';
import ContentSections from '@/components/ContentSections';
import FooterWithControls from '@/components/FooterWithControls';
import ThemeDecorations from '@/components/ThemeDecorations';
import { getThemeClasses, getLedGlowColor } from '@/components/ThemeUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CompareModeConsole from '@/components/CompareModeConsole';

const Index = () => {
  // Default to royal theme for new users
  const [currentTheme, setCurrentTheme] = useState<Theme>('royal');
  
  // Detect if user has preference for reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Ref for parallax container
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check for user's motion preference - respect user's needs
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    // Update document title with new website name
    document.title = "Atlumino - Gold Jewelry Price Transparency Platform";
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  const addScrollAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.fade-with-scroll').forEach(el => {
      observer.observe(el);
    });
  };
  
  // Set up scroll animations
  useEffect(() => {
    addScrollAnimations();
  }, []);
  
  return (
    <ThemeProvider>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "min-h-screen transition-colors duration-700", 
            getThemeClasses(currentTheme)
          )}
          ref={parallaxContainerRef}
        >
          {/* Luxury Background */}
          <LuxuryBackground theme={currentTheme} />
          
          {/* Theme-specific decorative elements */}
          <ThemeDecorations 
            currentTheme={currentTheme}
            prefersReducedMotion={prefersReducedMotion}
            parallaxContainerRef={parallaxContainerRef}
          />
          
          {/* LED Glow Cursor */}
          {!prefersReducedMotion && (
            <LedGlowCursor 
              color={getLedGlowColor(currentTheme)}
              size={currentTheme === 'dark' ? 320 : currentTheme === 'royal' ? 300 : 280}
              blur={currentTheme === 'dark' ? 80 : currentTheme === 'royal' ? 70 : 60}
              opacity={currentTheme === 'dark' ? 0.7 : currentTheme === 'royal' ? 0.65 : 0.6}
              delay={0.2}
              disabled={prefersReducedMotion}
            />
          )}
          
          {/* Sticky navbar with enhanced visibility */}
          <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">
            <Navbar />
          </div>
          
          {/* Theme Switcher */}
          <div className="fixed top-20 right-4 z-50">
            <ThemeSwitcher 
              currentTheme={currentTheme} 
              setTheme={setCurrentTheme} 
            />
          </div>
          
          {/* Hero Section */}
          <HeroSection />
          
          {/* Content Sections */}
          <ContentSections 
            currentTheme={currentTheme}
            prefersReducedMotion={prefersReducedMotion}
            parallaxContainerRef={parallaxContainerRef}
          />
          
          {/* Floating compare console */}
          <CompareModeConsole />
          
          {/* Footer and Controls */}
          <FooterWithControls currentTheme={currentTheme} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;
