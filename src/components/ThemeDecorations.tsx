
import React, { useRef, useEffect } from 'react';
import { Theme } from '@/types/theme';

interface ThemeDecorationsProps {
  currentTheme: Theme;
  prefersReducedMotion: boolean;
  parallaxContainerRef: React.RefObject<HTMLDivElement>;
}

const ThemeDecorations = ({ currentTheme, prefersReducedMotion, parallaxContainerRef }: ThemeDecorationsProps) => {
  // References for the decorative elements
  const decorativeElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Create decorative elements for dark theme
  const createDecorativeElements = () => {
    // Clean up any existing elements
    decorativeElementsRef.current.forEach(el => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    
    decorativeElementsRef.current = [];
    
    if (parallaxContainerRef.current) {
      // Create patterns
      const container = parallaxContainerRef.current;
      
      // Create grid pattern
      const gridPattern = document.createElement('div');
      gridPattern.className = 'bg-pattern-grid fixed inset-0 pointer-events-none';
      container.appendChild(gridPattern);
      decorativeElementsRef.current.push(gridPattern);
      
      // Create dot pattern
      const dotPattern = document.createElement('div');
      dotPattern.className = 'bg-pattern-dots fixed inset-0 pointer-events-none';
      container.appendChild(dotPattern);
      decorativeElementsRef.current.push(dotPattern);
      
      // Create glow blobs
      const colors = currentTheme === 'dark' ? ['purple', 'purple', 'gold'] : 
                     currentTheme === 'golden' ? ['gold', 'gold', 'gold'] : 
                     currentTheme === 'emerald' ? ['emerald', 'emerald', 'gold'] : 
                     ['gold', 'gold', 'gold'];
      
      const positions = [
        { top: '15%', left: '10%' },
        { top: '60%', left: '80%' },
        { top: '30%', left: '65%' },
        { top: '75%', left: '25%' }
      ];
      
      positions.forEach((pos, i) => {
        const blob = document.createElement('div');
        const color = colors[i % colors.length];
        blob.className = `glow-blob-${color} fixed pointer-events-none`;
        blob.style.top = pos.top;
        blob.style.left = pos.left;
        
        if (!prefersReducedMotion) {
          blob.style.animation = `float ${6 + i}s ease-in-out infinite`;
          blob.style.animationDelay = `${i * 0.5}s`;
        }
        
        container.appendChild(blob);
        decorativeElementsRef.current.push(blob);
      });
    }
  };
  
  // Effect for theme changes
  useEffect(() => {
    if (currentTheme === 'dark') {
      createDecorativeElements();
    } else {
      // Clean up decorative elements if not in dark mode
      decorativeElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      decorativeElementsRef.current = [];
    }
  }, [currentTheme, prefersReducedMotion]);

  return null; // This is a behavior-only component, no rendering
};

export default ThemeDecorations;
