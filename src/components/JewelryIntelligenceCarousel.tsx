
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface JewelryTypeCard {
  name: string;
  image: string;
  color: string;
  purity: string;
  description: string;
  origin: string;
}

const jewelryTypes: JewelryTypeCard[] = [
  {
    name: "24K Gold",
    image: "/gold-purity.jpg",
    color: "Rich yellow",
    purity: "99.9% pure gold",
    description: "The purest form of gold, soft and malleable, excellent for investment but less practical for everyday wear.",
    origin: "Treasured across ancient civilizations, particularly in India and China."
  },
  {
    name: "Temple Jewelry",
    image: "/temple-jewelry.jpg",
    color: "Traditional gold",
    purity: "Traditional craftsmanship",
    description: "Ornate jewelry inspired by temple architecture, featuring divine motifs and intricate designs.",
    origin: "South India, particularly Tamil Nadu and Kerala temple traditions."
  },
  {
    name: "Platinum",
    image: "/gold-standards.jpg",
    color: "Silvery white",
    purity: "95% pure platinum",
    description: "Dense, durable, and naturally white. Resistant to tarnish and ideal for securing precious gemstones.",
    origin: "Historically rare, gaining popularity in the early 20th century for fine jewelry."
  }
];

const JewelryIntelligenceCarousel = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Jewelry <span className="italic text-gold">Intelligence</span>
          </h2>
          <p className="text-graphite/70 max-w-2xl mx-auto">
            Explore the nuances of different jewelry types. Hover or tap cards to reveal deeper insights.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {jewelryTypes.map((type, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <JewelryCard jewelryType={type} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static border-gold/30 hover:bg-gold/10 hover:border-gold" />
              <CarouselNext className="relative static border-gold/30 hover:bg-gold/10 hover:border-gold" />
            </div>
          </Carousel>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="ghost" className="text-gold/80 hover:text-gold hover:bg-transparent group">
            <span>Explore All Jewelry Types</span>
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

interface JewelryCardProps {
  jewelryType: JewelryTypeCard;
  index: number;
}

const JewelryCard = ({ jewelryType, index }: JewelryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-[450px] rounded-lg overflow-hidden group cursor-pointer"
    >
      {/* Card image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${jewelryType.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Card content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="font-serif text-2xl mb-2">{jewelryType.name}</h3>
        
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0, 
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
            <div>
              <span className="text-gold/80">Origin:</span>
              <p className="text-white/90">{jewelryType.origin}</p>
            </div>
            <div>
              <span className="text-gold/80">Purity:</span>
              <p className="text-white/90">{jewelryType.purity}</p>
            </div>
          </div>
          <p className="text-white/80 text-sm">{jewelryType.description}</p>
        </motion.div>
        
        {!isHovered && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-white/60 mt-2"
          >
            Hover for details
          </motion.p>
        )}
      </div>
      
      {/* Info icon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-2 rounded-full"
      >
        <Info className="h-4 w-4 text-gold" />
      </motion.div>
    </motion.div>
  );
};

export default JewelryIntelligenceCarousel;
