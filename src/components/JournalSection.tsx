
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JournalSection = () => {
  const journalEntries = [
    {
      title: "The Heritage of Temple Jewelry",
      excerpt: "Exploring the ancient craft traditions behind South Indian temple jewelry and its cultural significance.",
      category: "Heritage",
      image: "/temple-jewelry.jpg"
    },
    {
      title: "Gold Purity: Beyond the Numbers",
      excerpt: "What really determines the value of gold beyond karat markings and why traditional tests still matter.",
      category: "Education",
      image: "/gold-purity.jpg"
    },
    {
      title: "Regional Price Variations Explained",
      excerpt: "Understanding why the same jewelry piece might cost differently across regions and cities in India.",
      category: "Price Transparency",
      image: "/price-variations.jpg"
    }
  ];
  
  return (
    <section id="journal" className="journal-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Jeweler's <span className="italic text-gold">Journal</span>
            </h2>
            <p className="text-graphite/70 max-w-xl">
              Educational articles and insights from experts in the field of jewelry and gemology.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-gold/30 hover:bg-gold/10">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalEntries.map((entry, index) => (
            <div key={index} className="group relative">
              <div className="aspect-[3/2] rounded-lg overflow-hidden mb-4">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${entry.image || '/placeholder.svg'})` }}
                ></div>
              </div>
              
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
                  <Bookmark className="h-4 w-4" />
                </Button>
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
      </div>
    </section>
  );
};

export default JournalSection;
