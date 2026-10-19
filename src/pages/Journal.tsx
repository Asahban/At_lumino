
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Bookmark, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Journal = () => {
  const journalEntries = [
    {
      title: "The Heritage of Temple Jewelry",
      excerpt: "Exploring the ancient craft traditions behind South Indian temple jewelry and its cultural significance.",
      category: "Heritage",
      image: "/temple-jewelry.jpg",
      author: "Priya Sharma",
      date: "April 2, 2025"
    },
    {
      title: "Gold Purity: Beyond the Numbers",
      excerpt: "What really determines the value of gold beyond karat markings and why traditional tests still matter.",
      category: "Education",
      image: "/gold-purity.jpg",
      author: "Rahul Kapoor",
      date: "March 28, 2025"
    },
    {
      title: "Regional Price Variations Explained",
      excerpt: "Understanding why the same jewelry piece might cost differently across regions and cities in India.",
      category: "Price Transparency",
      image: "/price-variations.jpg",
      author: "Ananya Singh",
      date: "March 15, 2025"
    },
    {
      title: "Investing in Gold: Jewelry vs. Bullion",
      excerpt: "A comprehensive comparison of gold jewelry and bullion as investment options in today's market.",
      category: "Investment",
      image: "/gold-standards.jpg",
      author: "Vikram Mehta",
      date: "March 10, 2025"
    },
    {
      title: "Traditional Gold Crafting Techniques",
      excerpt: "Discover the ancient techniques that have been preserved for generations in gold jewelry crafting.",
      category: "Craftsmanship",
      image: "/regional-jewelry.jpg",
      author: "Deepa Gupta",
      date: "February 22, 2025"
    },
    {
      title: "Caring for Your Gold Jewelry",
      excerpt: "Essential tips to maintain the luster and longevity of your precious gold jewelry collection.",
      category: "Maintenance",
      image: "/temple-jewelry.jpg",
      author: "Ravi Patel",
      date: "February 15, 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Jeweler's <span className="italic text-gold">Journal</span>
            </h1>
            <p className="text-graphite/70 max-w-2xl mx-auto">
              Educational articles and insights from experts in the field of jewelry and gemology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {journalEntries.map((entry, index) => (
              <div key={index} className="group relative">
                <div className="aspect-[3/2] rounded-lg overflow-hidden mb-4">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${entry.image})` }}
                  ></div>
                </div>
                
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 mb-3 text-xs text-graphite/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{entry.author}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gold/10 text-gold-dark">
                    {entry.category}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                  {entry.title}
                </h3>
                
                <p className="text-graphite/70 text-sm mb-4">
                  {entry.excerpt}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark"
                >
                  Read Article <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
              Load More Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Journal;
