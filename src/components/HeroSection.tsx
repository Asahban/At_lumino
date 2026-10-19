
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Scale, User, Diamond, Shield, Eye, Heart, Gem, Award, TrendingUp, Sparkles, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const HeroSection = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const heroRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Interactive elements for animations
  const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Contextual welcome based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  // Animate diamonds on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      // Calculate relative position
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Apply different movement speeds to each diamond for parallax effect
      diamondRefs.current.forEach((diamond, index) => {
        if (!diamond) return;
        
        const speed = 20 - (index * 4); // Different speeds for each diamond
        const moveX = x * speed;
        const moveY = y * speed;
        
        diamond.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignIn = () => {
    // Navigate to auth page for account creation
    window.location.href = '/auth';
  };

  const scrollToEducation = () => {
    const educationSection = document.getElementById('discover');
    if (educationSection) {
      educationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const welcomeMessage = {
    morning: "Good morning. Begin your jewelry pricing journey with clarity.",
    afternoon: "Good afternoon. Discover true jewelry value with confidence.",
    evening: "Good evening. Explore jewelry pricing truth in tranquility."
  };

  return (
    <>
      <div id="hero-section" className="hero-section relative min-h-screen flex items-center overflow-hidden" ref={heroRef}>
        {/* Enhanced gradient background with subtle animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/95"
          animate={{ 
            background: [
              "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.9), rgba(255,255,255,0.95))",
              "linear-gradient(to bottom, rgba(255,253,240,0.8), rgba(255,253,240,0.9), rgba(255,253,240,0.95))",
              "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.9), rgba(255,255,255,0.95))",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        {/* Floating elements in background for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold/5 border border-gold/10"
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [i % 2 === 0 ? -15 : 15, i % 2 === 0 ? 15 : -15],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        {/* Main hero content */}
        <div className="container mx-auto px-4 pt-24 pb-12 relative z-10 hero-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block font-serif italic text-sm text-gold/90 mb-4 font-medium"
              >
                {welcomeMessage[timeOfDay]}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-graphite-dark"
              >
                <span className="block">Discover the</span>
                <span className="block">True Value</span>
                <span className="block">of Jewelry</span>
                <span className="block mt-2 text-xl md:text-2xl font-light text-graphite">
                  Compare prices across premium retailers
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-graphite font-medium mb-8 leading-relaxed"
              >
                Atlumino reveals the <i>true cost</i> of fine jewelry, empowering your purchase 
                decisions with transparent pricing data and expert insights.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-5"
              >
                <Link to="/compare-now">
                  <Button 
                    className="premium-button royal-button shine-effect px-8 py-6 rounded-full group transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto relative overflow-hidden"
                  >
                    <span className="mr-2 relative z-10">Compare Now</span>
                    <Scale className="h-4 w-4 group-hover:animate-pulse relative z-10" />
                    
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/80 via-gold to-gold/80 opacity-90 z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/60 via-gold/90 to-gold/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="elegant-border border-gold/30 hover:bg-gold/10 text-graphite-dark px-8 py-6 rounded-full group w-full sm:w-auto"
                  onClick={handleSignIn}
                >
                  <span className="mr-2">Create Account</span>
                  <User className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </motion.div>
              
              {/* Added scroll down indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                  opacity: { delay: 1.2, duration: 0.5 },
                  y: { repeat: Infinity, duration: 1.5 } 
                }}
                className="mt-10 flex justify-center sm:justify-start cursor-pointer"
                onClick={scrollToEducation}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm text-graphite mb-2 font-medium">Discover More</span>
                  <ArrowDown className="h-5 w-5 text-gold animate-bounce" />
                </div>
              </motion.div>
            </div>
            
            {/* Right animation */}
            <div className="hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="p-4 relative z-10"
              >
                <img 
                  src="/gold-standards.jpg" 
                  alt="Fine Jewelry" 
                  className="rounded-2xl shadow-2xl w-full object-cover max-h-[450px]"
                />
                
                {/* Animated decorative elements */}
                <motion.div 
                  className="absolute -top-5 -right-5 bg-gold/80 h-20 w-20 rounded-full z-0 opacity-30"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-8 -left-8 bg-purple-400/50 h-28 w-28 rounded-full z-0 opacity-20"
                  animate={{ scale: [1.1, 1, 1.1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Moved sections - Trust & Expert Analysis & Why Compare */}
      <div className="bg-gradient-to-b from-white/90 to-white relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl border border-gold/10 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif flex items-center text-graphite-dark">
                  <Shield className="h-6 w-6 mr-2 text-gold" />
                  Trust & Verification
                </h3>
                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  Verified
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center justify-center p-4 bg-white/90 rounded-lg border border-gold/5">
                  <div className="text-4xl font-light text-gold mb-1">99%</div>
                  <div className="text-sm text-center text-graphite font-medium">Price Accuracy Rate</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/90 rounded-lg border border-gold/5">
                  <div className="text-4xl font-light text-gold mb-1">83K+</div>
                  <div className="text-sm text-center text-graphite font-medium">Verified Comparisons</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-graphite">
                <span className="font-medium">Data refreshed: Today at 08:45 AM</span>
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">+2.5k Today</span>
                </span>
              </div>
            </motion.div>
            
            {/* Expert credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl border border-gold/10 p-6 shadow-lg"
            >
              <h3 className="text-2xl font-serif mb-4 flex items-center text-graphite-dark">
                <Gem className="h-6 w-6 mr-2 text-gold" />
                Expert Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/80 transition-colors">
                  <div className="bg-gold/10 rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-graphite-dark">GIA Certified Evaluations</h4>
                    <p className="text-graphite">Our team includes 3 GIA certified gemologists who validate all price comparisons</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/80 transition-colors">
                  <div className="bg-gold/10 rounded-full p-2">
                    <Scale className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-graphite-dark">Transparent Methodology</h4>
                    <p className="text-graphite">Our pricing algorithm considers material cost, craftsmanship, and regional pricing factors</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/80 transition-colors">
                  <div className="bg-gold/10 rounded-full p-2">
                    <Eye className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-graphite-dark">Independent & Unbiased</h4>
                    <p className="text-graphite">We don't accept payments from retailers to influence our price comparisons</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Why Compare With Us? section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gold/10 p-8 shadow-lg">
              <h3 className="text-2xl font-serif mb-6 text-center flex items-center justify-center text-graphite-dark">
                <Award className="h-6 w-6 mr-2 text-gold" />
                Why Compare With Us?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Diamond className="h-10 w-10 text-gold" />,
                    title: "Real Market Data",
                    description: "Verified pricing data from over 40 premium jewelry retailers across India"
                  },
                  {
                    icon: <Scale className="h-10 w-10 text-gold" />,
                    title: "Price Transparency",
                    description: "Clear breakdown of material costs vs. craftsmanship markup"
                  },
                  {
                    icon: <Shield className="h-10 w-10 text-gold" />,
                    title: "Quality Verification",
                    description: "Expert gemologist verification of all quality claims and certifications"
                  },
                  {
                    icon: <Heart className="h-10 w-10 text-gold" />,
                    title: "Customer Trust",
                    description: "Trusted by 22,000+ shoppers to make confident jewelry purchases"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center text-center p-5 bg-white/90 rounded-lg border border-gold/5 hover:border-gold/20 hover:shadow-md transition-all"
                  >
                    <div className="mb-4 p-3 bg-gold/5 rounded-full">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-serif mb-2 text-graphite-dark">{item.title}</h4>
                    <p className="text-graphite font-medium">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/compare-now">
                  <Button className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full font-medium">
                    Start Comparing Prices
                    <ArrowDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Benefits section below moved sections */}
      <div id="discover" className="container mx-auto px-4 pt-20 pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gold/10 p-6 md:p-8 shadow-lg">
            <h3 className="text-2xl font-serif mb-6 text-center flex items-center justify-center text-graphite-dark">
              <Award className="h-6 w-6 mr-2 text-gold" />
              More Ways We Help You
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Diamond className="h-10 w-10 text-gold" />,
                  title: "Education Center",
                  description: "Learn about jewelry quality, materials, and craftsmanship from our experts"
                },
                {
                  icon: <Shield className="h-10 w-10 text-gold" />,
                  title: "Store Verification",
                  description: "We authenticate and verify all partner jewelers for quality assurance"
                },
                {
                  icon: <Scale className="h-10 w-10 text-gold" />,
                  title: "Market Reports",
                  description: "Access monthly reports on jewelry market trends and pricing fluctuations"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center p-5 bg-white/80 rounded-lg border border-gold/5 hover:border-gold/20 hover:shadow-md transition-all"
                >
                  <div className="mb-4 p-3 bg-gold/5 rounded-full">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-serif mb-2 text-graphite-dark">{item.title}</h4>
                  <p className="text-graphite font-medium">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;
