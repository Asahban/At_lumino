
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Plus, X, Star, Trophy, Shield, Tag, Map, Gem, AlertTriangle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Store data types
interface StoreRating {
  overall: number;
  quality: number;
  value: number;
  transparency: number;
  service: number;
}

interface Store {
  id: string;
  name: string;
  location: string;
  type: 'Luxury' | 'Mall' | 'Independent' | 'Online';
  priceRange: 'Low' | 'Medium' | 'High' | 'Premium';
  ratings: StoreRating;
  markupRange: string;
  verified: boolean;
  storeImage: string;
  specialties: string[];
}

// Sample store data
const sampleStores: Store[] = [
  {
    id: '1',
    name: 'Tiffany & Co.',
    location: 'New York, NY',
    type: 'Luxury',
    priceRange: 'Premium',
    ratings: {
      overall: 4.7,
      quality: 4.9,
      value: 3.6,
      transparency: 3.8,
      service: 4.8
    },
    markupRange: '220-350%',
    verified: true,
    storeImage: 'https://via.placeholder.com/150',
    specialties: ['Diamond Rings', 'Wedding Bands', 'Statement Pieces']
  },
  {
    id: '2',
    name: 'Blue Nile',
    location: 'Online',
    type: 'Online',
    priceRange: 'Medium',
    ratings: {
      overall: 4.5,
      quality: 4.3,
      value: 4.8,
      transparency: 4.7,
      service: 4.1
    },
    markupRange: '120-180%',
    verified: true,
    storeImage: 'https://via.placeholder.com/150',
    specialties: ['Diamond Engagement Rings', 'Wedding Jewelry', 'Custom Design']
  },
  {
    id: '3',
    name: 'Kay Jewelers',
    location: 'Multiple Locations',
    type: 'Mall',
    priceRange: 'Medium',
    ratings: {
      overall: 3.9,
      quality: 3.7,
      value: 3.5,
      transparency: 3.6,
      service: 4.1
    },
    markupRange: '180-250%',
    verified: true,
    storeImage: 'https://via.placeholder.com/150',
    specialties: ['Bridal Sets', 'Fashion Jewelry', 'Gifts']
  },
  {
    id: '4',
    name: 'Smith Family Jewelers',
    location: 'Chicago, IL',
    type: 'Independent',
    priceRange: 'Medium',
    ratings: {
      overall: 4.8,
      quality: 4.5,
      value: 4.6,
      transparency: 4.9,
      service: 4.9
    },
    markupRange: '110-190%',
    verified: true,
    storeImage: 'https://via.placeholder.com/150',
    specialties: ['Custom Designs', 'Estate Jewelry', 'Repairs']
  }
];

const StoreComparisonSection = () => {
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStores, setSelectedStores] = useState<Store[]>([sampleStores[0], sampleStores[1]]);
  const [expandedStore, setExpandedStore] = useState<string | null>(null);
  
  // Theme-specific styles
  const getButtonClass = () => {
    if (currentTheme === 'dark') return "bg-purple-600 hover:bg-purple-700 text-white";
    if (currentTheme === 'royal') return "bg-indigo-600 hover:bg-indigo-700 text-white";
    return "bg-gold hover:bg-gold-dark text-white"; // default golden theme
  };
  
  const getTableHeaderClass = () => {
    if (currentTheme === 'dark') return "bg-gray-800 text-white";
    if (currentTheme === 'royal') return "bg-indigo-100/80";
    return "bg-gold/10"; // default golden theme
  };
  
  // Filtered stores based on search
  const filteredStores = sampleStores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Add store to comparison
  const addStore = (store: Store) => {
    if (selectedStores.length >= 4) {
      toast({
        title: "Maximum stores reached",
        description: "You can compare up to 4 stores at once. Remove a store to add another.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedStores.some(s => s.id === store.id)) {
      toast({
        title: "Store already added",
        description: `${store.name} is already in your comparison.`,
        variant: "default",
      });
      return;
    }
    
    setSelectedStores([...selectedStores, store]);
    toast({
      title: "Store added",
      description: `${store.name} has been added to your comparison.`,
      variant: "default",
    });
  };
  
  // Remove store from comparison
  const removeStore = (storeId: string) => {
    setSelectedStores(selectedStores.filter(store => store.id !== storeId));
  };
  
  // Toggle expanded store details
  const toggleExpandStore = (storeId: string) => {
    if (expandedStore === storeId) {
      setExpandedStore(null);
    } else {
      setExpandedStore(storeId);
    }
  };
  
  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={cn(
              "h-3 w-3", 
              star <= Math.round(rating) 
                ? "text-amber-400 fill-amber-400" 
                : "text-gray-300"
            )} 
          />
        ))}
        <span className="ml-1 text-xs">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-center mb-8">
        <Store className="text-gold mr-2 h-6 w-6" />
        <h2 className="text-3xl font-serif text-center">Store Comparison</h2>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Compare jewelry retailers to find the best value and service
          </p>
        </div>
        
        {/* Store search and selection */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl border border-gold/20 p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Search className="h-4 w-4 mr-2 text-gold" />
            Find Stores to Compare
          </h3>
          
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Search by store name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button 
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="border-gold/30 hover:bg-gold/10"
            >
              Clear
            </Button>
          </div>
          
          {/* Store results */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {filteredStores.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No stores found matching your search
              </div>
            ) : (
              filteredStores.map(store => (
                <div 
                  key={store.id} 
                  className="border border-gold/10 rounded-lg p-4 bg-white/70 hover:border-gold/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{store.name}</h4>
                        {store.verified && (
                          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Map className="h-3 w-3 mr-1" />
                        {store.location}
                      </div>
                      <div className="mt-2">
                        {renderStars(store.ratings.overall)}
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="mr-2 h-8 flex items-center gap-1"
                        onClick={() => toggleExpandStore(store.id)}
                      >
                        Details
                        {expandedStore === store.id ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="ghost"
                        className={`h-8 ${getButtonClass()}`}
                        onClick={() => addStore(store)}
                        disabled={selectedStores.some(s => s.id === store.id)}
                      >
                        {selectedStores.some(s => s.id === store.id) ? (
                          "Added"
                        ) : (
                          <>
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Expanded store details */}
                  {expandedStore === store.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-gold/10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Store Details</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type:</span>
                              <span>{store.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Price Range:</span>
                              <span>{store.priceRange}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Markup Range:</span>
                              <span>{store.markupRange}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2">Specialties</h5>
                          <div className="flex flex-wrap gap-2">
                            {store.specialties.map((specialty, i) => (
                              <Badge key={i} variant="outline" className="bg-white/70">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Detailed Ratings</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="text-center p-2 bg-white/50 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Quality</div>
                            {renderStars(store.ratings.quality)}
                          </div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Value</div>
                            {renderStars(store.ratings.value)}
                          </div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Transparency</div>
                            {renderStars(store.ratings.transparency)}
                          </div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Service</div>
                            {renderStars(store.ratings.service)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Store comparison table */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl border border-gold/20 p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-gold" />
            Stores Comparison ({selectedStores.length}/4)
          </h3>
          
          {selectedStores.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gold/30 rounded-lg bg-white/50">
              <Store className="h-10 w-10 mx-auto text-gold/40 mb-3" />
              <h4 className="text-lg font-medium text-gold-dark/70">No Stores Selected</h4>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Search and add stores above to compare their pricing, quality, and service. You can add up to 4 stores at once.
              </p>
            </div>
          ) : (
            <>
              {/* Selected stores */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedStores.map(store => (
                  <Badge key={store.id} variant="outline" className="bg-white/70 flex items-center gap-1 p-1 pl-2">
                    {store.name}
                    <button 
                      className="ml-1 rounded-full hover:bg-gray-100 p-0.5"
                      onClick={() => removeStore(store.id)}
                    >
                      <X className="h-3 w-3 text-gray-500" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className={getTableHeaderClass()}>
                      <TableHead className="w-[200px]">Criteria</TableHead>
                      {selectedStores.map(store => (
                        <TableHead key={store.id}>{store.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Overall Rating</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>
                          {renderStars(store.ratings.overall)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Type</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>{store.type}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Location</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>{store.location}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Price Range</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>{store.priceRange}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Average Markup</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>{store.markupRange}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Quality Rating</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>
                          {renderStars(store.ratings.quality)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Value Rating</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>
                          {renderStars(store.ratings.value)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Transparency Rating</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>
                          {renderStars(store.ratings.transparency)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Service Rating</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id}>
                          {renderStars(store.ratings.service)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Specialties</TableCell>
                      {selectedStores.map(store => (
                        <TableCell key={store.id} className="max-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {store.specialties.map((specialty, i) => (
                              <Badge key={i} variant="outline" className="text-[10px]">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50/70 border border-amber-100/50 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-amber-800">Our Analysis</h5>
                    <p className="text-sm text-amber-700 mt-1">
                      Based on our analysis of these stores, {
                        selectedStores.length > 1 
                          ? `${selectedStores.sort((a, b) => b.ratings.value - a.ratings.value)[0].name} offers the best overall value with a balance of quality and reasonable markup percentages.` 
                          : "add more stores to get a comprehensive comparison analysis."
                      }
                    </p>
                    {selectedStores.length > 1 && (
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="bg-white/80 rounded-lg p-2 text-sm">
                          <span className="font-medium text-green-700">Best Value:</span>{' '}
                          <span>{selectedStores.sort((a, b) => b.ratings.value - a.ratings.value)[0].name}</span>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2 text-sm">
                          <span className="font-medium text-blue-700">Best Quality:</span>{' '}
                          <span>{selectedStores.sort((a, b) => b.ratings.quality - a.ratings.quality)[0].name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreComparisonSection;
