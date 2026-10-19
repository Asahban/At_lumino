
import React from 'react';
import { cn } from '@/lib/utils';
import { Theme } from '@/types/theme';
import { getCardStyle } from './ThemeUtils';
import JewelryIntelligenceCarousel from './JewelryIntelligenceCarousel';
import StorySafetyMap from './StorySafetyMap';
import EducationSection from './EducationSection';
import JournalSection from './JournalSection';
import ParallaxEffects from './ParallaxEffects';
import GoldPriceWidget from './GoldPriceWidget';

interface ContentSectionsProps {
  currentTheme: Theme;
  prefersReducedMotion: boolean;
  parallaxContainerRef: React.RefObject<HTMLDivElement>;
}

const ContentSections = ({ currentTheme, prefersReducedMotion, parallaxContainerRef }: ContentSectionsProps) => {
  return (
    <>
      {/* Below Hero Content with enhanced visibility */}
      <div className="below-hero relative z-10">
        {/* Gold Price Widget - Live data section */}
        <div className={cn("py-12 container mx-auto px-4", getCardStyle('border', currentTheme))}>
          <div className={cn(
            "max-w-3xl mx-auto p-6 rounded-xl fade-with-scroll", 
            getCardStyle('card', currentTheme)
          )}>
            <GoldPriceWidget isTeaMode={currentTheme === 'golden'} />
          </div>
        </div>
        
        {/* Add parallax effect to this section */}
        <div className="relative overflow-hidden">
          <ParallaxEffects 
            parallaxContainerRef={parallaxContainerRef}
            prefersReducedMotion={prefersReducedMotion}
            currentTheme={currentTheme}
          />
          <div className="fade-with-scroll">
            <JewelryIntelligenceCarousel />
          </div>
        </div>
        
        <div className="fade-with-scroll">
          <StorySafetyMap />
        </div>
        
        <div className="fade-with-scroll">
          <EducationSection prefersReducedMotion={prefersReducedMotion} />
        </div>
        
        {/* Properly aligned Journal Section with floating effect */}
        <div className="container mx-auto px-4 py-16">
          <div className={cn(
            "p-6 rounded-xl fade-with-scroll", 
            getCardStyle('card', currentTheme),
            !prefersReducedMotion && "floating"
          )}>
            <JournalSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentSections;
