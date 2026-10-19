
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Scale, BookOpen } from 'lucide-react';

const GoldJewelryDetail = () => {
  const { karat } = useParams();
  
  // Gold type details based on karat parameter
  const getGoldTypeDetails = () => {
    switch(karat) {
      case '24k':
        return {
          name: "24K Gold",
          purity: "99.9% pure gold",
          color: "Rich yellow",
          durability: "Soft and malleable",
          priceRange: "Highest",
          description: "24K gold is the purest form of gold available in the market. It contains 99.9% pure gold with minimal to no additional metals. This makes it extremely valuable and visually striking with its rich yellow color. Due to its high purity, 24K gold is relatively soft and malleable, making it less suitable for everyday jewelry that might experience wear and tear. It's ideal for investment pieces, special occasion jewelry, and items of cultural significance.",
          bestFor: "Investment, special occasions, traditional ceremonies",
          imagePath: "/gold-purity.jpg"
        };
      case '22k':
        return {
          name: "22K Gold",
          purity: "91.7% pure gold",
          color: "Deep yellow",
          durability: "Good balance of purity and strength",
          priceRange: "Very high",
          description: "22K gold contains 91.7% pure gold mixed with small amounts of other metals like silver, copper, or zinc. This composition creates jewelry that maintains the beautiful yellow luster of gold while adding enough strength for everyday wear. 22K gold is particularly popular for traditional and cultural jewelry, especially in South Asian communities. It offers excellent value retention while being more durable than 24K gold.",
          bestFor: "Traditional jewelry, bridal sets, cultural pieces",
          imagePath: "/temple-jewelry.jpg"
        };
      case '18k':
        return {
          name: "18K Gold",
          purity: "75% pure gold",
          color: "Yellow to rose (depending on alloys)",
          durability: "Strong and versatile",
          priceRange: "High",
          description: "18K gold contains 75% pure gold combined with 25% other metals. This composition creates a versatile material that's strong enough for everyday wear while maintaining significant gold content and value. 18K gold is available in various colors depending on the metals added to the alloy - yellow gold typically contains silver and copper, white gold contains nickel and zinc, and rose gold contains a higher proportion of copper.",
          bestFor: "Fine jewelry, everyday wear, engagement rings",
          imagePath: "/regional-jewelry.jpg"
        };
      default:
        return {
          name: "Gold Jewelry",
          purity: "Varies by karat",
          color: "Various",
          durability: "Depends on karat",
          priceRange: "Varies",
          description: "Gold jewelry comes in various purities and compositions, offering different benefits depending on your needs.",
          bestFor: "Depends on the specific karat and composition",
          imagePath: "/gold-standards.jpg"
        };
    }
  };
  
  const goldTypeDetails = getGoldTypeDetails();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/gold-jewelry" className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gold Jewelry
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div 
                className="aspect-square rounded-lg overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${goldTypeDetails.imagePath})` }}
              ></div>
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {goldTypeDetails.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="text-sm px-3 py-1 rounded-full bg-gold/10 text-gold-dark font-medium">
                  {goldTypeDetails.purity}
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-graphite/70">Color:</span>
                  <span className="font-medium">{goldTypeDetails.color}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-graphite/70">Durability:</span>
                  <span className="font-medium">{goldTypeDetails.durability}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-graphite/70">Price Range:</span>
                  <span className="font-medium">{goldTypeDetails.priceRange}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-graphite/70">Best For:</span>
                  <span className="font-medium">{goldTypeDetails.bestFor}</span>
                </div>
              </div>
              
              <p className="text-graphite/80 mb-8">
                {goldTypeDetails.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gold hover:bg-gold-dark text-white border-none">
                  <Shield className="mr-2 h-4 w-4" /> Find Certified Stores
                </Button>
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  <Scale className="mr-2 h-4 w-4" /> Compare Prices
                </Button>
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  <BookOpen className="mr-2 h-4 w-4" /> Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GoldJewelryDetail;
