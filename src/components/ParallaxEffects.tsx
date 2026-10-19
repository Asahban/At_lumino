
import React, { useRef, useEffect } from 'react';
import { Theme } from '@/types/theme';

interface ParallaxEffectsProps {
  parallaxContainerRef: React.RefObject<HTMLDivElement>;
  prefersReducedMotion: boolean;
  currentTheme: Theme;
}

const ParallaxEffects = ({ parallaxContainerRef, prefersReducedMotion, currentTheme }: ParallaxEffectsProps) => {
  // Refs for parallax effect elements
  const parallaxItemsRef = useRef<(HTMLElement | null)[]>([]);
  const decorativeElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Parallax effect
  useEffect(() => {
    if (prefersReducedMotion || !parallaxContainerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = parallaxContainerRef.current;
      if (!container) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      parallaxItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        const speed = index % 3 === 0 ? 25 : index % 3 === 1 ? 15 : 8;
        const translateX = x * speed;
        const translateY = y * speed;
        
        item.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
      
      // Also move decorative elements if in dark mode
      if (currentTheme === 'dark') {
        decorativeElementsRef.current.forEach((item, index) => {
          if (!item) return;
          
          const speed = 5 + (index * 2);
          const translateX = x * speed * -1; // Move in opposite direction
          const translateY = y * speed * -1;
          
          const currentTransform = item.style.transform || '';
          const floatAnimation = currentTransform.includes('translate3d') 
            ? currentTransform 
            : 'translate3d(0, 0, 0)';
            
          item.style.transform = `translate(${translateX}px, ${translateY}px) ${floatAnimation}`;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, currentTheme]);

  return (
    <>
      <div 
        ref={el => parallaxItemsRef.current[0] = el} 
        className={`parallax-slow absolute -top-10 -left-10 w-32 h-32 rounded-full ${
          currentTheme === 'dark' ? 'bg-purple-500/15' : 
          currentTheme === 'golden' ? 'bg-amber-500/15' :
          currentTheme === 'emerald' ? 'bg-emerald-500/15' : 'bg-gold/15'
        }`}
      />
      <div 
        ref={el => parallaxItemsRef.current[1] = el}
        className={`parallax-medium absolute top-40 right-20 w-24 h-24 rounded-full ${
          currentTheme === 'dark' ? 'bg-purple-700/25' : 
          currentTheme === 'golden' ? 'bg-amber-700/25' :
          currentTheme === 'emerald' ? 'bg-emerald-700/25' : 'bg-gold-dark/25'
        }`}
      />
      <div 
        ref={el => parallaxItemsRef.current[2] = el}
        className={`parallax-fast absolute bottom-10 left-1/3 w-16 h-16 rounded-full ${
          currentTheme === 'dark' ? 'bg-indigo-500/20' : 
          currentTheme === 'golden' ? 'bg-amber-300/20' :
          currentTheme === 'emerald' ? 'bg-emerald-300/20' : 'bg-gold/20'
        }`}
      />
    </>
  );
};

export default ParallaxEffects;
