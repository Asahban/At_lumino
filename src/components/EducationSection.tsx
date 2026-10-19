
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, GraduationCap, History, Shield, ArrowUpDown, CheckCircle, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface EducationSectionProps {
  prefersReducedMotion?: boolean;
}

const EducationSection = ({ prefersReducedMotion = false }: EducationSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const educationItems = [
    {
      title: "Jewelry Certification Guide",
      description: "Learn how to identify authentic, certified jewelry with confidence.",
      icon: Shield,
      imageSrc: "/gold-standards.jpg",
      link: "/education/jewelry-certification",
      isNew: true,
      content: {
        whatYouWillLearn: [
          "How to identify authentic BIS hallmarks on gold jewelry",
          "Understanding IGI, GIA, and SGL diamond certifications",
          "Verifying the authenticity of certification documents",
          "What certification details matter most when buying jewelry"
        ],
        whyItMatters: "Understanding jewelry certification helps protect your investment and ensures you receive authentic pieces with verified quality. This knowledge empowers you to shop with confidence and recognize genuine value."
      }
    },
    {
      title: "Gold Purity Standards",
      description: "Understanding the Karat system and how it affects jewelry quality and value.",
      icon: Award,
      imageSrc: "/gold-standards.jpg",
      link: "/education/gold-purity",
      content: {
        whatYouWillLearn: [
          "The difference between 10K, 14K, 18K, and 24K gold",
          "How to read hallmarks and purity stamps",
          "The relationship between karat and durability",
          "Price implications of different gold purities"
        ],
        whyItMatters: "Gold purity knowledge helps you make informed decisions when purchasing gold jewelry, ensuring you get exactly what you're paying for and understand the value proposition of different karat options."
      }
    },
    {
      title: "Gemstone Grading",
      description: "Learn the 4Cs of diamond grading and how to assess colored gemstones.",
      icon: GraduationCap,
      imageSrc: "/gemstone-grading.jpg",
      link: "/education/diamond-certification",
      content: {
        whatYouWillLearn: [
          "The 4Cs: Cut, Color, Clarity, and Carat weight",
          "How laboratory grading works and what the reports mean",
          "Identifying common treatments and enhancements",
          "Value factors for colored gemstones vs. diamonds"
        ],
        whyItMatters: "Gemstone grading knowledge protects you from overpaying and helps you identify high-quality stones. Understanding these standards allows you to compare options across different jewelers with confidence."
      }
    },
    {
      title: "Historical Techniques",
      description: "Explore ancient jewelry making techniques still used by master craftspeople today.",
      icon: History,
      imageSrc: "/antique-background.jpg",
      link: "/education/regional-styles",
      content: {
        whatYouWillLearn: [
          "Traditional metalworking techniques from different cultures",
          "Historical gemstone cutting and setting methods",
          "How ancient techniques influence modern jewelry",
          "Identifying handcrafted vs. machine-made pieces"
        ],
        whyItMatters: "Understanding historical techniques gives you a deeper appreciation for craftsmanship and helps you recognize the value of traditional methods. This knowledge enhances your ability to identify truly special pieces."
      }
    },
    {
      title: "Regional Styles",
      description: "Discover how different cultures and regions have developed unique jewelry traditions.",
      icon: BookOpen,
      imageSrc: "/regional-jewelry.jpg",
      link: "/education/regional-styles",
      content: {
        whatYouWillLearn: [
          "Distinctive characteristics of Indian, Middle Eastern, European, and Asian jewelry",
          "Cultural significance behind regional design elements",
          "How geography and local resources influence styles",
          "Recognizing authentic regional craftsmanship"
        ],
        whyItMatters: "Knowledge of regional styles helps you appreciate the cultural heritage behind different jewelry traditions and make more informed purchasing decisions when seeking authentic pieces from specific traditions."
      }
    },
    {
      title: "Making Charges Explained",
      description: "Learn what influences jewelry making charges and how to compare them effectively.",
      icon: ArrowUpDown,
      imageSrc: "/price-variations.jpg",
      link: "/education/making-charges",
      isNew: true,
      content: {
        whatYouWillLearn: [
          "How making charges are calculated by different jewelers",
          "Regional variations in making charges across India",
          "Impact of design complexity on jewelry pricing",
          "Negotiation strategies for better making charge rates"
        ],
        whyItMatters: "Understanding making charges helps you get fair prices when shopping for jewelry. It empowers you to compare offers between different jewelers and recognize when you're getting good value for your investment."
      }
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Motion settings based on user preference
  const motionSettings = prefersReducedMotion ? {
    variants: {},
    initial: {},
    animate: {},
    whileInView: {},
    transition: {}
  } : {
    variants: itemVariants,
    initial: "hidden",
    animate: "visible",
    whileInView: "visible",
    transition: { duration: 0.5 }
  };
  
  return (
    <section id="discover" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Jewelry <span className="italic text-gold">Education</span>
          </h2>
          <p className="text-graphite/70 max-w-2xl mx-auto">
            Empowering your jewelry journey with knowledge and insights from experts and cultural traditions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Navigation sidebar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-gold/10 rounded-xl p-6 shadow-md">
              <h3 className="font-serif text-xl mb-6 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-gold" />
                Learning Paths
              </h3>
              
              <div className="space-y-3">
                {educationItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={motionSettings.variants}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "flex items-center p-3 rounded-lg cursor-pointer transition-all",
                      activeIndex === index 
                        ? "bg-gold/10 border-l-2 border-gold" 
                        : "hover:bg-gold/5"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                      activeIndex === index ? "bg-gold text-white" : "bg-gold/10 text-gold"
                    )}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium text-graphite">{item.title}</h4>
                        {item.isNew && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-gold/80 px-2 py-0.5 text-xs font-medium text-white">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-graphite/70 line-clamp-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gold/10">
                <div className="flex items-center text-sm text-graphite/70 mb-4">
                  <Clock className="h-4 w-4 mr-2 text-gold/60" />
                  <span>Recently viewed</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-graphite/60 hover:text-gold/80 cursor-pointer">
                    Understanding Gold Certification
                  </div>
                  <div className="text-xs text-graphite/60 hover:text-gold/80 cursor-pointer">
                    Diamond Quality Assessment
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content area */}
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 bg-white/80 backdrop-blur-sm border border-gold/10 rounded-xl overflow-hidden shadow-md"
          >
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${educationItems[activeIndex].imageSrc})` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center">
                    <h3 className="font-serif text-2xl mb-2">{educationItems[activeIndex].title}</h3>
                    {educationItems[activeIndex].isNew && (
                      <span className="ml-3 inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-white">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-white/80">{educationItems[activeIndex].description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-serif mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-gold" />
                    What You'll Learn
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {educationItems[activeIndex].content.whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mr-2 h-5 w-5 text-gold flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {activeIndex === 5 && (
                  <div className="bg-gold/5 rounded-lg p-5 border border-gold/10 mt-4">
                    <h4 className="flex items-center gap-2 mb-4 font-serif text-lg">
                      <ArrowUpDown className="h-5 w-5 text-gold" />
                      Making Charges Comparison
                    </h4>
                    <p className="text-graphite/70 mb-4">
                      Making charges vary significantly across jewelers and regions. Here's what influences them:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border border-gold/10">
                        <h5 className="font-serif text-base mb-2">Craftsmanship</h5>
                        <p className="text-sm text-graphite/70">Handcrafted pieces demand higher making charges than machine-made items. Heritage techniques can increase costs by 15-30%.</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-gold/10">
                        <h5 className="font-serif text-base mb-2">Region</h5>
                        <p className="text-sm text-graphite/70">Metropolitan cities often have higher making charges. Traditional jewelry hubs might offer better rates for specific styles.</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-gold/10">
                        <h5 className="font-serif text-base mb-2">Design Complexity</h5>
                        <p className="text-sm text-graphite/70">Intricate designs require more labor and skill, resulting in higher making charges, sometimes 20-40% above basic designs.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-xl font-serif mb-3 flex items-center">
                    <Gem className="h-5 w-5 mr-2 text-gold" />
                    Why This Matters
                  </h4>
                  <p className="bg-white/50 p-4 rounded-lg border border-gold/5 leading-relaxed">
                    {educationItems[activeIndex].content.whyItMatters}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start gap-4 pt-3">
                  <div>
                    <Badge variant="outline" className="mb-2">Expert-verified content</Badge>
                    <h5 className="text-sm font-medium">Course Duration</h5>
                    <p className="text-xs text-muted-foreground">20 minutes read • 3 interactive lessons</p>
                  </div>
                  
                  <div className="sm:ml-auto">
                    <h5 className="text-sm font-medium">Learning Format</h5>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">Articles</Badge>
                      <Badge variant="secondary">Videos</Badge>
                      <Badge variant="secondary">Quizzes</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <Link to={educationItems[activeIndex].link}>
                  <Button className="bg-gold hover:bg-gold-dark text-white">
                    Start Learning
                  </Button>
                </Link>
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  Download Guide
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
