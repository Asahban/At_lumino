
import React from 'react';
import { cn } from '@/lib/utils';
import { Theme } from '@/types/theme';
import Footer from './Footer';
import ControlBar from './ControlBar';
import CompareModeConsole from './CompareModeConsole';

interface FooterWithControlsProps {
  currentTheme: Theme;
}

const FooterWithControls = ({ currentTheme }: FooterWithControlsProps) => {
  const getFooterBackground = () => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-gray-900/30';
      case 'royal':
        return 'bg-indigo-50/30';
      default:
        return 'bg-white/30';
    }
  };

  const getFooterBorder = () => {
    switch (currentTheme) {
      case 'dark':
        return 'border-gray-800';
      case 'royal':
        return 'border-indigo-200/50';
      default:
        return 'border-slate-200/50';
    }
  };

  return (
    <>
      <Footer />
      
      {/* Apply glass morphism to control bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40",
        getFooterBackground(),
        "backdrop-blur-md border-t",
        getFooterBorder()
      )}>
        <ControlBar isTeaMode={currentTheme === 'golden'} />
      </div>
      
      <CompareModeConsole />
    </>
  );
};

export default FooterWithControls;
