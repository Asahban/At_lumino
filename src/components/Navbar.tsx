
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Menu,
  Sun,
  Moon,
  Sparkles,
  Gem,
  BookOpen,
  BadgeCheck,
  Search,
  ArrowRight,
  X
} from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-mobile';
import UserMenu from './UserMenu';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // Implement search functionality
  };
  
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-gold">
              Atlumino
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/gold-jewelry"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gold ${
                location.pathname.includes('/gold-jewelry') ? 'text-gold' : 'text-foreground/80'
              }`}
            >
              Gold Jewelry
            </Link>
            <Link
              to="/certified-stores"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gold ${
                location.pathname.includes('/certified-stores') ? 'text-gold' : 'text-foreground/80'
              }`}
            >
              Certified Stores
            </Link>
            <Link
              to="/education"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gold ${
                location.pathname.includes('/education') ? 'text-gold' : 'text-foreground/80'
              }`}
            >
              Education
            </Link>
            <Link
              to="/journal"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gold ${
                location.pathname.includes('/journal') ? 'text-gold' : 'text-foreground/80'
              }`}
            >
              Journal
            </Link>
            <Link
              to="/compare-now"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gold ${
                location.pathname.includes('/compare-now') ? 'text-gold' : 'text-foreground/80'
              }`}
            >
              Compare Now
            </Link>
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {searchVisible && !isMobile ? (
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search for jewelry, stores..."
                  className="w-[200px] border-gold/20 focus:border-gold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <ThemeSwitcher 
              currentTheme={theme} 
              setTheme={setTheme} 
            />
            
            {/* User menu or sign in button */}
            <UserMenu />
            
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex-1 py-6">
                    <form 
                      onSubmit={handleSearch} 
                      className="mb-8 relative"
                    >
                      <Input
                        type="search"
                        placeholder="Search for jewelry, stores..."
                        className="pr-10 border-gold/20 focus:border-gold"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </form>
                    
                    <nav className="space-y-1">
                      <Link
                        to="/gold-jewelry"
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gold/5 transition-colors"
                      >
                        <Gem className="h-5 w-5 mr-3 text-gold" />
                        <span className="text-foreground">Gold Jewelry</span>
                      </Link>
                      <Link
                        to="/certified-stores"
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gold/5 transition-colors"
                      >
                        <BadgeCheck className="h-5 w-5 mr-3 text-gold" />
                        <span className="text-foreground">Certified Stores</span>
                      </Link>
                      <Link
                        to="/education"
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gold/5 transition-colors"
                      >
                        <BookOpen className="h-5 w-5 mr-3 text-gold" />
                        <span className="text-foreground">Education</span>
                      </Link>
                      <Link
                        to="/journal"
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gold/5 transition-colors"
                      >
                        <Sparkles className="h-5 w-5 mr-3 text-gold" />
                        <span className="text-foreground">Journal</span>
                      </Link>
                      <Link
                        to="/compare-now"
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gold/5 transition-colors"
                      >
                        <CheckCircle className="h-5 w-5 mr-3 text-gold" />
                        <span className="text-foreground">Compare Now</span>
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
