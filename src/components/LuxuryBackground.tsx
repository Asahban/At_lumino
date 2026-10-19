
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Theme } from '@/types/theme';

interface LuxuryBackgroundProps {
  theme: Theme;
}

const LuxuryBackground: React.FC<LuxuryBackgroundProps> = ({ theme }) => {
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
  // Create luxury particles
  useEffect(() => {
    if (!particlesContainerRef.current) return;
    
    const container = particlesContainerRef.current;
    container.innerHTML = '';
    
    // Create particles based on theme
    const particleCount = 40; // Increased count for more visible effect
    
    // Define colors with a default for 'royal' theme
    const colors: Record<Theme, string[]> = {
      light: ['rgba(212, 175, 55, 0.3)', 'rgba(245, 214, 127, 0.25)', 'rgba(233, 213, 168, 0.2)'],
      golden: ['rgba(212, 175, 55, 0.35)', 'rgba(245, 214, 127, 0.3)', 'rgba(233, 213, 168, 0.25)'],
      emerald: ['rgba(16, 185, 129, 0.25)', 'rgba(110, 231, 183, 0.2)', 'rgba(6, 95, 70, 0.15)'],
      dark: ['rgba(139, 92, 246, 0.35)', 'rgba(124, 58, 237, 0.3)', 'rgba(196, 181, 253, 0.25)'],
      royal: ['rgba(103, 58, 183, 0.35)', 'rgba(142, 117, 233, 0.3)', 'rgba(173, 157, 238, 0.25)']
    };
    
    // Make sure we have a valid theme
    const themeColors = colors[theme] || colors.light;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 50 + 10; // 10-60px
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      
      // Position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Animation duration and delay
      const animDuration = 7 + Math.random() * 15; // 7-22s
      const animDelay = Math.random() * 10;
      
      // Apply styles
      particle.className = 'luxury-particle absolute rounded-full pointer-events-none';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.filter = `blur(${size / 3}px)`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = '0';
      particle.style.transform = 'translateY(20px)';
      
      // Animation
      particle.style.animation = `
        float ${animDuration}s ease-in-out ${animDelay}s infinite alternate,
        glow ${animDuration * 0.7}s ease-in-out ${animDelay}s infinite alternate
      `;
      
      container.appendChild(particle);
    }
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [theme]);
  
  // Get pattern based on theme
  const getPatternColor = () => {
    switch (theme) {
      case 'royal':
        return 'rgba(103, 58, 183, 0.35)';
      case 'golden':
        return 'rgba(212, 175, 55, 0.35)'; 
      case 'emerald':
        return 'rgba(16, 185, 129, 0.35)'; 
      case 'dark':
        return 'rgba(139, 92, 246, 0.4)'; 
      default:
        return 'rgba(212, 175, 55, 0.3)'; 
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* SVG Pattern Layer - Floral/Ornamental Pattern */}
      <div className="absolute inset-0 w-full h-full z-0">
        <svg 
          width="100%" 
          height="100%" 
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-30"
        >
          <pattern 
            id="luxury-pattern" 
            x="0" 
            y="0" 
            width="100" 
            height="100" 
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(15)"
          >
            <g fill="none" stroke={getPatternColor()} strokeWidth="1.2">
              {/* Enhanced floral/ornamental pattern elements */}
              <path d="M50 15c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 65c-16.57 0-30-13.43-30-30s13.43-30 30-30 30 13.43 30 30-13.43 30-30 30z"/>
              <path d="M50 25c-13.81 0-25 11.19-25 25s11.19 25 25 25 25-11.19 25-25-11.19-25-25-25zm0 45c-11.05 0-20-8.95-20-20s8.95-20 20-20 20 8.95 20 20-8.95 20-20 20z"/>
              <path d="M50 35c-8.28 0-15 6.72-15 15s6.72 15 15 15 15-6.72 15-15-6.72-15-15-15z"/>
              <path d="M25 0v15m25-15v15m25-15v15M0 25h15m70 0h15M0 50h15m70 0h15M0 75h15m70 0h15M25 100v-15m25 15v-15m25 15v-15"/>
              {/* Additional decorative flourishes */}
              <path d="M50 10c-3 10-15 15-15 25s12 15 15 25m0-50c3 10 15 15 15 25s-12 15-15 25"/>
              <path d="M10 50c10-3 15-15 25-15s15 12 25 15m-50 0c10 3 15 15 25 15s15-12 25-15"/>
              {/* New elegant curved elements */}
              <path d="M0 0c25 25 75 25 100 0M0 100c25-25 75-25 100 0"/>
              <path d="M5 5c20 30 70 30 90 0M5 95c20-30 70-30 90 0"/>
            </g>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#luxury-pattern)" />
        </svg>
      </div>
      
      {/* Gradient Overlay - Enhanced vertical gradient transition */}
      <div 
        className={cn(
          "absolute inset-0 z-1",
          theme === 'dark' 
            ? 'bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/30'
            : theme === 'royal'
              ? 'bg-gradient-to-b from-[#f8f4ff]/60 via-[#f0ebff]/40 to-white/30'
              : theme === 'golden'
                ? 'bg-gradient-to-b from-amber-50/60 via-amber-50/40 to-white/30'
                : theme === 'emerald'
                  ? 'bg-gradient-to-b from-emerald-50/60 via-emerald-50/40 to-white/30'
                  : 'bg-gradient-to-b from-white/60 via-white/40 to-white/30'
        )}
      />
      
      {/* Floating Particles */}
      <div ref={particlesContainerRef} className="absolute inset-0 z-2" />
      
      {/* Add global animations - Fixed the style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(20px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0.7; }
          }
          
          @keyframes glow {
            0% { filter: blur(10px) brightness(1); }
            100% { filter: blur(8px) brightness(1.3); }
          }
          
          .luxury-particle {
            will-change: transform, opacity;
          }
        `
      }} />
    </div>
  );
};

export default LuxuryBackground;
