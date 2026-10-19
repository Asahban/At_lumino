
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowCursorProps {
  className?: string;
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

const GlowCursor: React.FC<GlowCursorProps> = ({
  className,
  color = 'rgba(255, 215, 0, 0.4)', // Default to gold color
  size = 400,
  blur = 80,
  opacity = 0.4,
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(0);

  useEffect(() => {
    // Wait a moment before showing to prevent initial flash
    const visibilityTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      setLastMoveTime(Date.now());
      
      // Fade out effect when mouse stops moving
      setTimeout(() => {
        if (Date.now() - lastMoveTime >= 150) {
          setIsMoving(false);
        }
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Hide cursor when mouse leaves the window
    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 });
      setIsMoving(false);
    };

    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(visibilityTimeout);
    };
  }, [lastMoveTime]);

  return (
    <div
      className={cn(
        'fixed pointer-events-none z-[999] rounded-full transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
        isMoving ? 'scale-100' : 'scale-75',
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        filter: `blur(${blur}px)`,
        opacity: isMoving ? opacity : opacity * 0.5,
        transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
        transition: 'transform 0.15s ease-out, opacity 0.3s ease, scale 0.3s ease',
      }}
    />
  );
};

export default GlowCursor;
