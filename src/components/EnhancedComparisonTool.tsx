
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Diamond, ShoppingBag, GemIcon, Sparkles, Star, Tag, Settings, Info, X, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const EnhancedComparisonTool = () => {
  const { currentTheme } = useTheme();
  const [selectedType, setSelectedType] = useState<string>("Rings");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Gold");
  const [selectedKarat, setSelectedKarat] = useState<string>("18K");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 2500]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();

  const handleCompare = () => {
    toast({
      title: "Price Comparison Started",
      description: `Comparing ${selectedType} made of ${selectedMaterial} ${selectedKarat} within $${priceRange[0]}-$${priceRange[1]} price range.`,
      variant: "default",
    });
  };
  
  const jewelryTypes = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches', 'Sets'];
  const materials = ['Gold', 'Silver', 'Platinum', 'Diamonds', 'Gems', 'Mixed'];
  const karats = ['10K', '14K', '18K', '22K', '24K'];
  
  // Theme-specific styles
  const getButtonClass = () => {
    if (currentTheme === 'dark') return "bg-purple-600 hover:bg-purple-700 text-white";
    if (currentTheme === 'royal') return "bg-indigo-600 hover:bg-indigo-700 text-white";
    return "bg-gold hover:bg-gold-dark text-white"; // default golden theme
  };
  
  const getCardClass = () => {
    if (currentTheme === 'dark') return "bg-gray-800/90 border-purple-500/30";
    if (currentTheme === 'royal') return "bg-indigo-50/80 border-indigo-300/50";
    return "bg-white/80 border-gold/20"; // default golden theme
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-center mb-8">
        <Diamond className="text-gold mr-2 h-6 w-6" />
        <h2 className="text-3xl font-serif text-center">Advanced Comparison Tool</h2>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Compare prices across retailers with our powerful tool
          </p>
          <div className="flex flex-wrap items-center justify-center mt-2 text-sm space-x-2">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1 text-green-600" />
              Updated Today
            </span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center">
              <Tag className="h-3 w-3 mr-1 text-amber-600" />
              21,340+ Price Points
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
              <Search className="h-3 w-3 mr-1 text-blue-600" />
              340+ Retailers
            </span>
          </div>
        </div>
        
        {/* Enhanced Comparison Tool */}
        <div className={`rounded-xl border ${getCardClass()} p-6 shadow-sm relative overflow-hidden`}>
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
                  
                  {/* New: Karat selection for gold */}
                  {selectedMaterial === 'Gold' && (
                    <div className="pt-4">
                      <h3 className="text-xl font-medium mb-3 flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-gold" />
                        Gold Karat
                      </h3>
                      <div className="grid grid-cols-5 gap-2">
                        {karats.map((karat, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedKarat(karat)}
                            className={`border ${selectedKarat === karat ? 'bg-gold/10 border-gold text-gold-dark' : 'border-gold/30'} rounded-lg p-2 text-center cursor-pointer hover:bg-gold/5 transition-colors`}
                          >
                            {karat}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-sm">
                    <div className="font-medium text-amber-800 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-amber-600" />
                      Expert Analysis
                    </div>
                    <p className="text-amber-700">
                      {selectedMaterial === 'Gold' 
                        ? `${selectedKarat} gold jewelry typically has a retail markup of ${selectedKarat === '24K' ? '180-220%' : selectedKarat === '18K' ? '215-250%' : '170-200%'}.` 
                        : `${selectedMaterial} jewelry markup varies from 150% to 300% depending on the retailer type.`} Our algorithm helps identify the best deals.
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
                  
                  {/* Search for specific item */}
                  <div className="pt-2">
                    <h3 className="text-md font-medium mb-2 flex items-center">
                      <Search className="h-4 w-4 mr-2 text-gold" />
                      Search for Specific Item
                    </h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., 'Diamond tennis bracelet'"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full py-3 rounded-lg transition-colors group relative overflow-hidden ${getButtonClass()}`}
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
                  
                  {/* Summary of current selection */}
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Your Selection:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-white/50">{selectedType}</Badge>
                      <Badge variant="outline" className="bg-white/50">{selectedMaterial}</Badge>
                      {selectedMaterial === 'Gold' && (
                        <Badge variant="outline" className="bg-white/50">{selectedKarat}</Badge>
                      )}
                      <Badge variant="outline" className="bg-white/50">${priceRange[0]} - ${priceRange[1]}</Badge>
                      {searchQuery && (
                        <Badge variant="outline" className="bg-white/50 flex items-center gap-1">
                          "{searchQuery}"
                          <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="min-h-[300px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-gold" />
                    Advanced Filters
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Store Types</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['Luxury Brands', 'Mall Jewelers', 'Independent Jewelers', 'Online Only'].map((store, i) => (
                          <div key={i} className="flex items-center">
                            <input type="checkbox" id={`store-${i}`} className="mr-2" />
                            <label htmlFor={`store-${i}`} className="text-sm">{store}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Certification</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['GIA Certified', 'IGI Certified', 'AGS Certified', 'Non-certified'].map((cert, i) => (
                          <div key={i} className="flex items-center">
                            <input type="checkbox" id={`cert-${i}`} className="mr-2" />
                            <label htmlFor={`cert-${i}`} className="text-sm">{cert}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Location</h4>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Popular Locations</SelectLabel>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="nyc">New York City</SelectItem>
                            <SelectItem value="la">Los Angeles</SelectItem>
                            <SelectItem value="chi">Chicago</SelectItem>
                            <SelectItem value="mia">Miami</SelectItem>
                            <SelectItem value="online">Online Only</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm">
                    <div className="font-medium text-blue-800 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-blue-600" />
                      Pro Feature
                    </div>
                    <p className="text-blue-700">
                      Advanced comparison includes historical price tracking, alert notifications for price drops, and detailed certification verification.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <Star className="h-4 w-4 mr-2 text-gold" />
                    Premium Features
                  </h3>
                  
                  <div className="border border-gold/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-gold/5 rounded-lg transition-colors">
                      <div className="p-2 bg-amber-100 rounded-full">
                        <Star className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Price Drop Alerts</h4>
                        <p className="text-xs text-muted-foreground">Get notified when prices drop for your saved items</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 hover:bg-gold/5 rounded-lg transition-colors">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Diamond className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Certification Verification</h4>
                        <p className="text-xs text-muted-foreground">Verify the authenticity of jewelry certifications</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 hover:bg-gold/5 rounded-lg transition-colors">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Tag className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Price History</h4>
                        <p className="text-xs text-muted-foreground">View historical pricing data for any jewelry item</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full py-3 rounded-lg transition-colors"
                    variant="outline"
                    onClick={() => window.location.href = '/auth'}
                  >
                    <span className="flex items-center">
                      Create Account to Access
                      <Plus className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                  
                  <Card className="p-4 bg-gray-50/50">
                    <div className="text-sm text-center text-muted-foreground">
                      "The price history feature saved me $430 on my engagement ring purchase by showing me when prices typically drop."
                      <div className="mt-2 flex items-center justify-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-3 w-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs ml-2">- Sarah M.</span>
                      </div>
                    </div>
                  </Card>
                </div>
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

export default EnhancedComparisonTool;
