import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Shield, Info, Navigation, Filter, Search, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { Store, storeService } from '@/services/storeService';
import CertificationBadge from '@/components/CertificationBadge';
import { useGeolocation } from '@/hooks/use-geolocation';
import { calculateDistance } from '@/utils/distance';
import { useToast } from '@/hooks/use-toast';

const StorySafetyMap = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [filters, setFilters] = useState({
    region: '',
    minSafetyRating: 0,
    isVerified: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: stores, isLoading, error } = useQuery({
    queryKey: ['stores', filters],
    queryFn: () => storeService.filterStores(filters),
    staleTime: 30 * 1000,
  });
  
  const filteredStores = stores?.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];
  
  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setShowInfoPanel(true);
  };
  
  const getSafetyColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-emerald-400';
    if (rating >= 3.5) return 'bg-yellow-400';
    return 'bg-red-500';
  };
  
  const getSafetyHalo = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-400/20';
    if (rating >= 4.0) return 'bg-emerald-400/20';
    if (rating >= 3.5) return 'bg-yellow-400/20';
    return 'bg-red-400/20';
  };
  
  // Helper to convert lat/lng to x/y for display
  const getPositionForDisplay = (store: Store) => {
    // Default to center if position is undefined
    if (!store.position) {
      return { x: 50, y: 50 };
    }
    
    // Convert lat/lng to x/y percentages for display (simple mapping)
    // In a real app, this would use proper map projection
    const x = ((store.position.lng + 180) / 360) * 100; // Convert longitude to percentage
    const y = ((90 - store.position.lat) / 180) * 100;  // Convert latitude to percentage
    
    return { x, y };
  };

  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const { toast } = useToast();
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);

  // Calculate nearby stores when user location or stores data changes
  useEffect(() => {
    if (latitude && longitude && stores) {
      const storesWithDistance = stores.map(store => ({
        ...store,
        distance: calculateDistance(
          latitude,
          longitude,
          store.position.lat,
          store.position.lng
        )
      }));

      const nearby = storesWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Get 5 nearest stores

      setNearbyStores(nearby);
    }
  }, [latitude, longitude, stores]);

  // Show user location status
  useEffect(() => {
    if (geoError) {
      toast({
        title: "Location Access Error",
        description: "Unable to access your location. Some features may be limited.",
        variant: "destructive"
      });
    } else if (latitude && longitude) {
      toast({
        title: "Location Found",
        description: "Showing jewelry stores near you.",
      });
    }
  }, [geoError, latitude, longitude, toast]);
  
  return (
    <section className="py-24 relative bg-graphite/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/antique-paper-texture.jpg')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Jewelry <span className="italic text-gold">Trust Map</span>
          </h2>
          <p className="text-graphite/70 max-w-2xl mx-auto">
            Discover safe and trustworthy jewelry stores across regions, rated by our experts and community.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-graphite/50" />
              <Input 
                type="text" 
                placeholder="Search stores, locations, or specialties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gold/20 focus:border-gold focus:ring-gold/30"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-gold/30 hover:bg-gold/10"
                onClick={() => setFilters(prev => ({ ...prev, isVerified: !prev.isVerified }))}
              >
                <Shield className={cn("h-4 w-4 mr-2", filters.isVerified ? "text-gold" : "text-graphite/50")} />
                Verified Only
              </Button>
              <Button className="bg-gold hover:bg-gold-dark text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* Map visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-2/3 aspect-[4/3] bg-white/60 backdrop-blur-sm rounded-xl border border-gold/10 shadow-lg overflow-hidden"
          >
            {/* Map background */}
            <div className="absolute inset-0 bg-[url('/antique-paper-texture.jpg')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
            
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center text-red-500">
                Error loading store data. Please try again.
              </div>
            ) : (
              <>
                {/* User location indicator */}
                {latitude && longitude && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute z-20"
                    style={{
                      left: `${((longitude + 180) / 360) * 100}%`,
                      top: `${((90 - latitude) / 180) * 100}%`
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 absolute -left-2 -top-2 animate-ping" />
                    </div>
                  </motion.div>
                )}

                {/* Store pins */}
                {filteredStores.map((store) => {
                  const position = getPositionForDisplay(store);
                  return (
                    <motion.div
                      key={store.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, delay: Math.random() * 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute"
                      style={{ left: `${position.x}%`, top: `${position.y}%` }}
                      onClick={() => handleStoreClick(store)}
                    >
                      <div 
                        className={cn(
                          "w-16 h-16 rounded-full absolute -ml-8 -mt-8 animate-pulse",
                          getSafetyHalo(store.safetyRating)
                        )}
                      ></div>
                      <div 
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md",
                          getSafetyColor(store.safetyRating),
                          selectedStore?.id === store.id ? "ring-2 ring-white" : ""
                        )}
                      >
                        <MapPin className="h-3 w-3 text-white" />
                      </div>
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-0.5 rounded shadow-sm">
                          {store.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
            
            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm shadow-md"
                onClick={() => {
                  if (latitude && longitude && selectedStore) {
                    const distance = calculateDistance(
                      latitude,
                      longitude,
                      selectedStore.position.lat,
                      selectedStore.position.lng
                    );
                    toast({
                      title: `Distance to ${selectedStore.name}`,
                      description: `Approximately ${distance.toFixed(1)} km away`,
                    });
                  }
                }}
                disabled={!latitude || !longitude || !selectedStore}
              >
                <Navigation className="h-4 w-4" />
              </Button>
              
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm shadow-md"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        // Re-center map logic would go here
                        toast({
                          title: "Location Updated",
                          description: "Showing stores near your current location.",
                        });
                      },
                      (error) => {
                        toast({
                          title: "Location Error",
                          description: error.message,
                          variant: "destructive"
                        });
                      }
                    );
                  }
                }}
              >
                <Compass className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gold/10 text-xs">
              <div className="mb-2 font-medium">Store Safety Rating</div>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Excellent (4.5-5.0)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
                  <span>Good (4.0-4.4)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span>Fair (3.5-3.9)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Caution (&lt;3.5)</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Store info panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: showInfoPanel ? 1 : 0,
              x: showInfoPanel ? 0 : 20
            }}
            transition={{ duration: 0.4 }}
            className="w-full lg:w-1/3 bg-white/90 backdrop-blur-md rounded-xl border border-gold/10 shadow-lg overflow-hidden"
          >
            {selectedStore ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-xl">{selectedStore.name}</h3>
                  <div 
                    className={cn(
                      "px-2 py-1 rounded-full text-xs text-white flex items-center",
                      getSafetyColor(selectedStore.safetyRating)
                    )}
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {selectedStore.safetyRating.toFixed(1)}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-graphite/70 mb-1">Location</div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gold mr-1" />
                      <span>{selectedStore.location}</span>
                    </div>
                  </div>
                  
                  {selectedStore.certifications && selectedStore.certifications.length > 0 && (
                    <div>
                      <div className="text-sm text-graphite/70 mb-1">Certifications</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedStore.certifications.map((cert, idx) => (
                          <CertificationBadge key={idx} type={cert.type} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-graphite/70 mb-1">Specialties</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStore.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-gold/10 px-2 py-1 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-graphite/70 mb-1">Making Charges</div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedStore.makingCharges).map(([type, charge]) => (
                        <div key={type} className="bg-gold/5 p-2 rounded-md">
                          <div className="capitalize text-xs font-medium">{type}</div>
                          <div className="text-sm">{charge}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-graphite/5 rounded-lg p-3 text-sm">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-gold mt-0.5 mr-2" />
                      <div>
                        <p className="font-medium mb-1">Omotenashi Insight</p>
                        <p className="text-graphite/70">
                          This store is known for its exceptional {' '}
                          {selectedStore.safetyRating >= 4.5 ? 'customer care and authenticity guarantees.' : 
                           selectedStore.safetyRating >= 4.0 ? 'craftsmanship and fair pricing.' :
                           selectedStore.safetyRating >= 3.5 ? 'variety, though authentication process could be more transparent.' :
                           'designs, but we recommend requesting detailed certification.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-graphite/50 flex items-center">
                    <span>Based on {selectedStore.reviewCount} user reviews</span>
                    {selectedStore.isVerified && (
                      <span className="ml-2 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full flex items-center">
                        <Shield className="h-2.5 w-2.5 mr-0.5" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button className="bg-gold hover:bg-gold-dark text-white">
                    <Navigation className="h-4 w-4 mr-1" />
                    Visit Store
                  </Button>
                  <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                    Add to Compare
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="font-serif text-xl mb-4">Nearby Stores</h3>
                {geoLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : geoError ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Enable location services to see nearby stores
                    </p>
                  </div>
                ) : nearbyStores.length > 0 ? (
                  <div className="space-y-4">
                    {nearbyStores.map((store) => (
                      <div
                        key={store.id}
                        className="p-3 bg-white/50 rounded-lg border border-gold/10 cursor-pointer hover:border-gold/30 transition-colors"
                        onClick={() => handleStoreClick(store)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{store.name}</h4>
                            <p className="text-sm text-muted-foreground">{store.location}</p>
                          </div>
                          <span className="text-sm text-gold">
                            {(store as any).distance.toFixed(1)} km
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No stores found nearby
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySafetyMap;
