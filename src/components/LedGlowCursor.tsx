
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LedGlowCursorProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  delay?: number;
  disabled?: boolean;
}

const LedGlowCursor: React.FC<LedGlowCursorProps> = ({
  color = 'rgba(212, 175, 55, 0.6)',
  size = 300,
  blur = 60,
  opacity = 0.6,
  delay = 0.1,
  disabled = false
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (disabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update the target position immediately for smooth tracking
      mousePositionRef.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };

    // Animation loop for smooth cursor following
    const updateCursorPosition = () => {
      if (!cursorRef.current) return;
      
      // Calculate the position with easing
      targetPositionRef.current = {
        x: targetPositionRef.current.x + (mousePositionRef.current.x - targetPositionRef.current.x) * 0.15,
        y: targetPositionRef.current.y + (mousePositionRef.current.y - targetPositionRef.current.y) * 0.15
      };
      
      // Apply the position to the cursor
      cursorRef.current.style.transform = `translate(${targetPositionRef.current.x}px, ${targetPositionRef.current.y}px)`;
      
      // Continue the animation loop
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(updateCursorPosition);
    
    // Set initial position to center of screen if not yet moved
    if (targetPositionRef.current.x === 0 && targetPositionRef.current.y === 0) {
      targetPositionRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div 
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'translate(0, 0)',
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
        opacity: 0,
        transition: `opacity 0.5s ease`
      }}
      className="led-glow-cursor"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: opacity, 
          scale: 1,
          transition: { 
            opacity: { duration: 0.8, delay },
            scale: { duration: 1.2, delay }
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: color,
          filter: `blur(${blur}px)`,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Inner glow for more definition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: opacity * 1.3, 
          scale: 0.6,
          transition: { 
            opacity: { duration: 0.5, delay: delay + 0.1 },
            scale: { duration: 0.7, delay: delay + 0.1 }
          }
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: color,
          filter: `blur(${blur * 0.6}px)`,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default LedGlowCursor;
