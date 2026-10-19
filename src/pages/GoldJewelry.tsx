
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Coins, Info } from 'lucide-react';

const GoldJewelry = () => {
  const goldTypes = [
    {
      karat: "24k",
      name: "24K Gold",
      purity: "99.9% pure gold",
      description: "The purest form of gold available. Ideal for investment and special occasions.",
      imagePath: "/gold-purity.jpg"
    },
    {
      karat: "22k",
      name: "22K Gold",
      purity: "91.7% pure gold",
      description: "Traditional gold used in cultural jewelry with excellent value retention.",
      imagePath: "/temple-jewelry.jpg"
    },
    {
      karat: "18k",
      name: "18K Gold",
      purity: "75% pure gold",
      description: "Versatile gold type suitable for everyday wear and fine jewelry.",
      imagePath: "/regional-jewelry.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Gold <span className="italic text-gold">Jewelry</span> Collection
            </h1>
            <p className="text-graphite/70 max-w-2xl mx-auto">
              Explore our premium selection of gold jewelry with verified certification and exceptional craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {goldTypes.map((type) => (
              <Link 
                key={type.karat} 
                to={`/gold-jewelry/${type.karat}`}
                className="group block"
              >
                <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 relative">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${type.imagePath})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-serif">{type.name}</h3>
                    <p className="text-sm text-white/80">{type.purity}</p>
                  </div>
                </div>
                
                <p className="text-sm text-graphite/80 mb-3">{type.description}</p>
                
                <Button variant="outline" className="w-full border-gold/30 hover:bg-gold/10">
                  <span>View {type.name}</span>
                  <Coins className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gold/10 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-xl">Why Choose Gold?</h3>
            </div>
            <p className="text-graphite/70 mb-6">
              Gold has been treasured for millennia for its beauty, rarity, and value. Unlike many other investments, gold jewelry can be worn and enjoyed while maintaining its intrinsic value.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded border border-gold/10">
                <h4 className="font-serif text-lg mb-2">Value Retention</h4>
                <p className="text-sm text-graphite/70">Gold has historically maintained its value over time, often appreciating during economic uncertainty.</p>
              </div>
              <div className="bg-white p-5 rounded border border-gold/10">
                <h4 className="font-serif text-lg mb-2">Cultural Significance</h4>
                <p className="text-sm text-graphite/70">Gold holds deep cultural and traditional significance in many societies around the world.</p>
              </div>
              <div className="bg-white p-5 rounded border border-gold/10">
                <h4 className="font-serif text-lg mb-2">Versatility</h4>
                <p className="text-sm text-graphite/70">Gold can be crafted into countless designs, from delicate chains to statement pieces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GoldJewelry;
