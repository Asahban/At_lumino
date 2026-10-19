
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Award, Map, Calculator, Shield, Gem, ScrollText, Scale, History, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import LuxuryBackground from '@/components/LuxuryBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Education = () => {
  const educationTopics = [
    {
      id: "jewelry-certification",
      title: "How to Identify Certified & Authentic Jewelry",
      description: "Our expert gemologists explain hallmarks, certification standards, and verification methods to ensure genuine quality.",
      icon: <Shield className="h-8 w-8 text-gold" />,
      imagePath: "/gold-standards.jpg",
      badge: "ESSENTIAL",
      estimatedTime: "25 min",
      skills: ["Authentication", "Hallmark Reading", "Document Verification"]
    },
    {
      id: "gold-purity",
      title: "Understanding Gold Purity Standards",
      description: "Master the knowledge of karats, BIS hallmarking, and purity testing with our comprehensive guide crafted by industry veterans.",
      icon: <BookOpen className="h-8 w-8 text-gold" />,
      imagePath: "/gold-purity.jpg",
      estimatedTime: "20 min",
      skills: ["Karat Identification", "Purity Assessment", "Value Calculation"]
    },
    {
      id: "diamond-certification",
      title: "Diamond Grading & Certification",
      description: "Learn the 4Cs (cut, color, clarity, carat) from certified gemologists and discover how to verify legitimate diamond certificates.",
      icon: <Award className="h-8 w-8 text-gold" />,
      imagePath: "/gemstone-grading.jpg",
      badge: "POPULAR",
      estimatedTime: "30 min",
      skills: ["4Cs Assessment", "Certificate Verification", "Value Comparison"]
    },
    {
      id: "regional-styles",
      title: "Traditional Jewelry Styles Across India",
      description: "Explore the rich heritage and craftsmanship behind regional jewelry styles, with insights from master artisans and historians.",
      icon: <Map className="h-8 w-8 text-gold" />,
      imagePath: "/regional-jewelry.jpg",
      estimatedTime: "35 min",
      skills: ["Cultural Recognition", "Design Appreciation", "Origin Identification"]
    },
    {
      id: "making-charges",
      title: "Jewelry Making Charges Explained",
      description: "Understand how craftsmanship is valued, with a transparent breakdown of what goes into jewelry making charges.",
      icon: <Calculator className="h-8 w-8 text-gold" />,
      imagePath: "/gold-standards.jpg",
      estimatedTime: "15 min",
      skills: ["Cost Analysis", "Negotiation", "Value Assessment"]
    },
    {
      id: "gemstone-guide",
      title: "Precious & Semi-Precious Gemstones",
      description: "An expertly curated guide to identifying, valuing, and caring for various gemstones from our team of certified gemologists.",
      icon: <Gem className="h-8 w-8 text-gold" />,
      imagePath: "/gemstone-grading.jpg",
      estimatedTime: "40 min",
      skills: ["Stone Identification", "Quality Assessment", "Care Techniques"]
    },
    {
      id: "jewelry-care",
      title: "Proper Jewelry Care & Maintenance",
      description: "Master craftsmen share proven techniques to maintain your precious jewelry's brilliance and extend its lifespan.",
      icon: <ScrollText className="h-8 w-8 text-gold" />,
      imagePath: "/gold-purity.jpg",
      estimatedTime: "20 min",
      skills: ["Cleaning Methods", "Storage Solutions", "Restoration Techniques"]
    },
    {
      id: "investment-guide",
      title: "Jewelry as an Investment",
      description: "Financial experts and jewelers provide insights on how to build a valuable jewelry collection with investment potential.",
      icon: <Scale className="h-8 w-8 text-gold" />,
      imagePath: "/price-variations.jpg",
      estimatedTime: "30 min",
      skills: ["Market Analysis", "Value Retention", "Collection Building"]
    },
    {
      id: "historical-significance",
      title: "The Cultural Heritage of Indian Jewelry",
      description: "Explore the rich history and significance of jewelry in Indian culture with perspectives from historians and cultural experts.",
      icon: <History className="h-8 w-8 text-gold" />,
      imagePath: "/temple-jewelry.jpg",
      estimatedTime: "35 min",
      skills: ["Historical Context", "Cultural Significance", "Tradition Recognition"]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0">
        <LuxuryBackground theme="light" />
      </div>
      
      {/* Fixed the z-index here to ensure navbar is clickable */}
      <div className="relative z-20">
        <Navbar />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Jewelry <span className="italic text-gold">Education</span>
            </h1>
            <p className="text-graphite/70 max-w-3xl mx-auto">
              Our educational resources are meticulously prepared by industry experts, certified gemologists, 
              and master craftsmen to empower you with authentic knowledge for making informed jewelry decisions.
            </p>
            <div className="mt-6 inline-flex items-center bg-gold/10 text-gold px-4 py-2 rounded-full text-sm border border-gold/20">
              <Award className="h-4 w-4 mr-2" />
              All guides are reviewed and certified by industry professionals
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {educationTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/education/${topic.id}`}
                  className="group relative block bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  {topic.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-gold px-2.5 py-0.5 text-xs font-medium text-white">
                        {topic.badge}
                      </span>
                    </div>
                  )}
                  <div className="aspect-video relative">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${topic.imagePath})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gold/5 rounded-lg border border-gold/10 group-hover:border-gold/20 transition-colors">
                        {topic.icon}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-serif mb-2 group-hover:text-gold transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-graphite/80 line-clamp-3">{topic.description}</p>
                        
                        <div className="mt-4 flex items-center text-xs text-graphite/60">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{topic.estimatedTime} read</span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {topic.skills && topic.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-white/50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="mt-3 inline-flex items-center text-gold text-sm font-medium">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl border border-gold/10 p-6 md:p-8 mb-16"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                Exclusive Expert Sessions
              </h2>
              <p className="text-graphite/70">
                Join our upcoming live webinars featuring master jewelers and industry experts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border border-gold/10 rounded-lg bg-gold/5 flex flex-col hover:shadow-md hover:border-gold/20 transition-all">
                <div className="mb-4">
                  <span className="text-xs font-medium bg-gold/20 text-gold px-2.5 py-1 rounded-full">UPCOMING</span>
                </div>
                <h3 className="text-xl font-serif mb-2">Gemstone Selection Masterclass</h3>
                <p className="text-sm text-graphite/80 mb-4">Learn how to select the perfect gemstones for your collection from an internationally recognized gemologist.</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium">May 15, 2025 • 4:00 PM</span>
                  <Button variant="outline" size="sm" className="text-gold hover:bg-gold/5 border-gold/20">Register Now</Button>
                </div>
              </div>
              
              <div className="p-5 border border-gold/10 rounded-lg bg-gold/5 flex flex-col hover:shadow-md hover:border-gold/20 transition-all">
                <div className="mb-4">
                  <span className="text-xs font-medium bg-gold/20 text-gold px-2.5 py-1 rounded-full">UPCOMING</span>
                </div>
                <h3 className="text-xl font-serif mb-2">Understanding Diamond Certificates</h3>
                <p className="text-sm text-graphite/80 mb-4">A senior GIA expert explains how to read and interpret diamond grading reports and identify authentic certificates.</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium">May 22, 2025 • 5:30 PM</span>
                  <Button variant="outline" size="sm" className="text-gold hover:bg-gold/5 border-gold/20">Register Now</Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl border border-gold/10 p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  Personal Jewelry Consultation
                </h2>
                <p className="text-graphite/80 mb-6">
                  Have specific questions about jewelry authentication, investment, or selection? 
                  Schedule a one-on-one virtual consultation with our certified jewelry experts.
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Book a Consultation
                </Button>
              </div>
              
              <div className="md:w-1/3 bg-gold/10 p-5 rounded-xl border border-gold/20">
                <h3 className="font-serif text-lg mb-3">Our Expert Panel</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium">Certified Gemologists</h4>
                      <p className="text-xs text-graphite/70">GIA & IGI certified</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                      <BookOpen className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium">Master Craftsmen</h4>
                      <p className="text-xs text-graphite/70">25+ years of experience</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                      <Scale className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium">Jewelry Appraisers</h4>
                      <p className="text-xs text-graphite/70">Independent valuation experts</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Education;
