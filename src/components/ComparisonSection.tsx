
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Diamond, ShoppingBag, GemIcon, Sparkles, Star, Tag, Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const ComparisonSection = () => {
  const [selectedType, setSelectedType] = useState<string>("Rings");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Gold");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 2500]);
  const { toast } = useToast();

  const handleCompare = () => {
    toast({
      title: "Price Comparison Started",
      description: `Comparing ${selectedType} made of ${selectedMaterial} within $${priceRange[0]}-$${priceRange[1]} price range.`,
      variant: "default",
    });
  };
  
  const jewelryTypes = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches', 'Sets'];
  const materials = ['Gold', 'Silver', 'Platinum', 'Diamonds', 'Gems', 'Mixed'];

  return (
    <div id="comparison-section" className="py-8">
      <div className="flex items-center justify-center mb-8">
        <Diamond className="text-gold mr-2 h-6 w-6" />
        <h2 className="text-3xl font-serif text-center">Compare Jewelry Prices</h2>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Our advanced comparison tool reveals pricing secrets across retailers
          </p>
          <div className="flex items-center justify-center mt-2 text-sm space-x-2">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1 text-green-600" />
              Updated Today
            </span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center">
              <Tag className="h-3 w-3 mr-1 text-amber-600" />
              21,340 Price Points
            </span>
          </div>
        </div>
        
        {/* Enhanced Comparison Tool */}
        <div className="bg-background/50 backdrop-blur-sm rounded-xl border border-gold/20 p-6 shadow-sm relative overflow-hidden">
          {/* Animated sparkle effect */}
          <motion.div 
            className="absolute -top-10 -right-10 w-20 h-20 opacity-25"
            animate={{ 
              rotate: [0, 180],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <Sparkles className="w-full h-full text-gold" />
          </motion.div>
          
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="comparison">Quick Compare</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <GemIcon className="h-4 w-4 mr-2 text-gold" />
                    Select Jewelry Type
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {jewelryTypes.map((type, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedType(type)}
                        className={`border ${selectedType === type ? 'bg-gold/10 border-gold text-gold-dark' : 'border-gold/30'} rounded-lg p-3 text-center cursor-pointer hover:bg-gold/5 transition-colors`}
                      >
                        {type}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-medium mb-3 flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-gold" />
                      Material
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {materials.map((material, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMaterial(material)}
                          className={`border ${selectedMaterial === material ? 'bg-gold/10 border-gold text-gold-dark' : 'border-gold/30'} rounded-lg p-3 text-center cursor-pointer hover:bg-gold/5 transition-colors`}
                        >
                          {material}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-sm">
                    <div className="font-medium text-amber-800 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-amber-600" />
                      Expert Analysis
                    </div>
                    <p className="text-amber-700">
                      Gold jewelry markups vary dramatically by retailer. Our unique algorithm compares 
                      true material value against retail prices to identify the best deals.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-gold" />
                    Price Range
                  </h3>
                  <div className="p-6 border border-gold/20 rounded-lg">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>$50</span>
                      <span>$5,000+</span>
                    </div>
                    <div className="mb-6">
                      <Slider 
                        defaultValue={[50, 2500]} 
                        max={5000} 
                        min={50} 
                        step={50}
                        onValueChange={(values) => setPriceRange(values as [number, number])}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Min Price</div>
                        <div className="font-medium">${priceRange[0]}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Max Price</div>
                        <div className="font-medium">${priceRange[1]}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-lg transition-colors group relative overflow-hidden"
                    onClick={handleCompare}
                  >
                    <span className="relative z-10 flex items-center">
                      Compare Prices
                      <ShoppingBag className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-gold via-gold-dark to-gold opacity-0 group-hover:opacity-100 transition-opacity" 
                      animate={{ 
                        x: ["-100%", "100%"],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                      }}
                    />
                  </Button>
                  
                  {/* Added new information section */}
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Featured Insights:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-gold/10 rounded-lg p-3 hover:bg-gold/5 transition-colors">
                        <div className="text-xs text-muted-foreground">Gold Rings</div>
                        <div className="font-medium text-sm">Ave. Markup: 215%</div>
                      </div>
                      <div className="border border-gold/10 rounded-lg p-3 hover:bg-gold/5 transition-colors">
                        <div className="text-xs text-muted-foreground">Diamond Rings</div>
                        <div className="font-medium text-sm">Ave. Markup: 283%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="min-h-[300px] flex items-center justify-center">
              <div className="text-center p-6">
                <Sparkles className="h-10 w-10 mx-auto mb-4 text-gold/50" />
                <h3 className="text-xl font-medium mb-2">Advanced Comparison Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Create an account to access advanced filtering, store-specific comparisons, 
                  and personalized price alerts.
                </p>
                <Button onClick={handleCompare}>
                  Try Basic Comparison
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* What users are saying */}
          <div className="mt-8 pt-8 border-t border-gold/10">
            <h4 className="text-sm font-medium mb-4 flex items-center">
              <Star className="h-4 w-4 mr-2 text-gold" />
              What Our Users Are Saying
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Sarah M.", text: "Saved $430 on my engagement ring purchase. The markup breakdown was eye-opening!", rating: 5 },
                { name: "James T.", text: "The price comparison helped me negotiate better at a local jeweler.", rating: 5 },
                { name: "Aisha P.", text: "Found identical gold earrings for 40% less at another retailer. Amazing tool!", rating: 4 }
              ].map((review, i) => (
                <div key={i} className="bg-white/40 p-3 rounded-lg border border-gold/5 text-sm">
                  <div className="flex items-center mb-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{review.text}"</p>
                  <p className="text-xs text-gray-500 mt-1">- {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
