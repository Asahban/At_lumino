
import React from 'react';
import { Moon, Sun, Paintbrush, Palette, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Theme } from '@/types/theme';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/10 backdrop-blur-sm">
          {currentTheme === 'light' && <Sun className="h-5 w-5 text-gold" />}
          {currentTheme === 'golden' && <Moon className="h-5 w-5 text-gold-dark" />}
          {currentTheme === 'emerald' && <Paintbrush className="h-5 w-5 text-emerald-600" />}
          {currentTheme === 'dark' && <Palette className="h-5 w-5 text-purple-400" />}
          {currentTheme === 'royal' && <Crown className="h-5 w-5 text-indigo-600" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`backdrop-blur-md border ${
          currentTheme === 'dark' 
            ? 'bg-gray-800/90 border-purple-500/20 text-white' 
            : currentTheme === 'golden'
              ? 'bg-amber-50/95 border-gold/20 text-graphite'
              : currentTheme === 'emerald'
                ? 'bg-emerald-50/95 border-emerald-500/20 text-slate-800'
                : currentTheme === 'royal'
                  ? 'bg-indigo-50/95 border-indigo-500/20 text-indigo-950'
                  : 'bg-white/95 border-gold/20 text-foreground'
        }`}
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')} 
          className={`flex items-center gap-2 cursor-pointer ${
            currentTheme === 'light' 
              ? 'bg-gold/10' 
              : currentTheme === 'dark' ? 'hover:bg-gray-700' : ''
          }`}
        >
          <Sun className="h-4 w-4 text-gold" />
          <span>Light Theme</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('golden')} 
          className={`flex items-center gap-2 cursor-pointer ${
            currentTheme === 'golden' 
              ? 'bg-gold/10' 
              : currentTheme === 'dark' ? 'hover:bg-gray-700' : ''
          }`}
        >
          <Moon className="h-4 w-4 text-gold-dark" />
          <span>Golden Theme</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('emerald')} 
          className={`flex items-center gap-2 cursor-pointer ${
            currentTheme === 'emerald' 
              ? 'bg-emerald-50' 
              : currentTheme === 'dark' ? 'hover:bg-gray-700' : ''
          }`}
        >
          <Paintbrush className="h-4 w-4 text-emerald-600" />
          <span>Emerald Theme</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')} 
          className={`flex items-center gap-2 cursor-pointer ${
            currentTheme === 'dark' 
              ? 'bg-purple-900/30' 
              : ''
          }`}
        >
          <Palette className="h-4 w-4 text-purple-500" />
          <span>Dark Modern</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('royal')} 
          className={`flex items-center gap-2 cursor-pointer ${
            currentTheme === 'royal' 
              ? 'bg-indigo-100/30' 
              : ''
          }`}
        >
          <Crown className="h-4 w-4 text-indigo-600" />
          <span>Royal Theme</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
