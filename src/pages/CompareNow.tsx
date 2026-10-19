
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import FooterWithControls from '@/components/FooterWithControls';
import JewelryPricingBreakdown from '@/components/JewelryPricingBreakdown';
import EnhancedComparisonTool from '@/components/EnhancedComparisonTool';
import StoreComparisonSection from '@/components/StoreComparisonSection';
import ThemeDecorations from '@/components/ThemeDecorations';
import LuxuryBackground from '@/components/LuxuryBackground';
import { cn } from '@/lib/utils';
import { getThemeClasses } from '@/components/ThemeUtils';

const CompareNow = () => {
  const { currentTheme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const parallaxContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div 
      className={cn(
        "min-h-screen transition-colors duration-700", 
        getThemeClasses(currentTheme)
      )}
      ref={parallaxContainerRef}
    >
      {/* Background and decorations */}
      <LuxuryBackground theme={currentTheme} />
      <ThemeDecorations 
        currentTheme={currentTheme}
        prefersReducedMotion={prefersReducedMotion}
        parallaxContainerRef={parallaxContainerRef}
      />
      
      {/* Sticky navbar with enhanced visibility */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">
        <Navbar />
      </div>
      
      {/* Page header */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Compare Jewelry Prices
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our advanced tools empower you with price transparency, revealing true costs and 
            helping you make informed decisions on your fine jewelry purchases.
          </p>
        </motion.div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-16">
          {/* Jewelry Pricing Breakdown - Moved from Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <JewelryPricingBreakdown />
          </motion.div>
          
          {/* Enhanced Comparison Tool */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/60 backdrop-blur-md rounded-xl border border-gold/20 p-8 shadow-sm"
          >
            <EnhancedComparisonTool />
          </motion.div>
          
          {/* Store Comparison Section - New feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/60 backdrop-blur-md rounded-xl border border-gold/20 p-8 shadow-sm"
          >
            <StoreComparisonSection />
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <FooterWithControls currentTheme={currentTheme} />
    </div>
  );
};

export default CompareNow;
