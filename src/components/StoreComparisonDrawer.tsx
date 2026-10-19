
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Trash2, 
  ArrowLeftRight, 
  Shield, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CertificationBadge from '@/components/CertificationBadge';
import { Store } from '@/services/storeService';

interface StoreComparisonDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comparisonStores: Store[];
  removeFromComparison: (storeId: string) => void;
  clearComparison: () => void;
  saveComparison?: () => void;
}

const StoreComparisonDrawer: React.FC<StoreComparisonDrawerProps> = ({
  open,
  onOpenChange,
  comparisonStores,
  removeFromComparison,
  clearComparison,
  saveComparison
}) => {
  // Function to get safety badge color
  const getSafetyBadgeColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-500";
    if (rating >= 4.0) return "bg-emerald-400";
    if (rating >= 3.5) return "bg-yellow-400";
    return "bg-red-500";
  };

  // Helper to find the best/lowest making charge among compared stores
  const findBestMakingCharge = (type: 'gold' | 'silver' | 'diamond') => {
    const charges = comparisonStores
      .map(store => store.makingCharges[type])
      .filter(charge => charge !== undefined) as number[];
    
    return charges.length > 0 ? Math.min(...charges) : null;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 max-h-[85vh]">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle className="text-xl font-serif flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Compare Stores
            <Badge className="ml-2 bg-gold text-white">{comparisonStores.length}</Badge>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-1 py-2 overflow-y-auto">
          {comparisonStores.length === 0 ? (
            <div className="text-center py-10">
              <ArrowLeftRight className="h-12 w-12 mx-auto text-gold/30 mb-4" />
              <h3 className="text-lg font-serif mb-2">No stores to compare</h3>
              <p className="text-graphite/70 text-sm max-w-xs mx-auto">
                Add stores to your comparison list by clicking the "Compare" button on store cards.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Store comparison grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {comparisonStores.map((store) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border border-gold/10 rounded-lg p-4 relative"
                  >
                    <button 
                      onClick={() => removeFromComparison(store.id)}
                      className="absolute top-2 right-2 text-graphite/40 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-serif text-lg">{store.name}</h3>
                        <div className="flex items-center text-sm text-graphite/70">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {store.location}, {store.city}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded-full text-xs text-white flex items-center ${getSafetyBadgeColor(store.safetyRating)}`}>
                          <Shield className="h-3 w-3 mr-1" />
                          {store.safetyRating.toFixed(1)}
                        </div>
                        
                        {store.isVerified && (
                          <Badge variant="outline" className="bg-gold/10 border-gold/20 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      {/* Certifications */}
                      {store.certifications && store.certifications.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs text-graphite/60">Certifications</span>
                          <div className="flex flex-wrap gap-1.5">
                            {store.certifications.map((cert, idx) => (
                              <CertificationBadge key={idx} type={cert.type} />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Making charges */}
                      <div className="space-y-1">
                        <span className="text-xs text-graphite/60">Making Charges</span>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(store.makingCharges).map(([type, charge]) => {
                            const bestCharge = findBestMakingCharge(type as any);
                            const isLowest = bestCharge !== null && charge === bestCharge;
                            
                            return (
                              <div 
                                key={type} 
                                className={`bg-gold/5 p-2 rounded-md ${isLowest ? 'ring-1 ring-green-500' : ''}`}
                              >
                                <div className="capitalize text-xs font-medium flex justify-between">
                                  <span>{type}</span>
                                  {isLowest && <span className="text-green-500 text-[10px]">Lowest</span>}
                                </div>
                                <div className="text-sm font-medium">{charge}%</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-gold hover:bg-gold/90 text-white"
                        onClick={() => {
                          // In a real app, this would navigate to the store's page or open a dialog
                          window.open(`tel:${store.id}`, '_blank');
                        }}
                      >
                        <Phone className="h-3.5 w-3.5 mr-1.5" />
                        Contact Store
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Comparison insights */}
              {comparisonStores.length >= 2 && (
                <div className="bg-gold/5 border border-gold/10 rounded-lg p-4">
                  <h3 className="font-serif text-lg mb-2">Comparison Insights</h3>
                  
                  <div className="space-y-3">
                    {/* Safety comparison */}
                    <div>
                      <span className="text-sm font-medium">Safety Ratings</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Shield className="h-4 w-4 text-gold" />
                        <span className="text-sm">
                          {comparisonStores.sort((a, b) => b.safetyRating - a.safetyRating)[0].name} 
                          {' '}has the highest safety rating ({comparisonStores.sort((a, b) => b.safetyRating - a.safetyRating)[0].safetyRating.toFixed(1)}/5.0)
                        </span>
                      </div>
                    </div>
                    
                    {/* Making charges comparison */}
                    <div>
                      <span className="text-sm font-medium">Making Charges</span>
                      <ul className="space-y-1 mt-1">
                        {['gold', 'silver', 'diamond'].map(type => {
                          const bestCharge = findBestMakingCharge(type as any);
                          if (bestCharge === null) return null;
                          
                          const bestStore = comparisonStores.find(
                            store => store.makingCharges[type as keyof typeof store.makingCharges] === bestCharge
                          );
                          
                          if (!bestStore) return null;
                          
                          return (
                            <li key={type} className="text-sm flex items-center gap-2">
                              <span className="w-16 capitalize">{type}:</span>
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                {bestCharge}%
                              </Badge>
                              <span>best at {bestStore.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    
                    {/* Certification comparison */}
                    <div>
                      <span className="text-sm font-medium">Certifications</span>
                      {comparisonStores.some(store => store.certifications && store.certifications.length > 0) ? (
                        <ul className="space-y-1 mt-1">
                          {comparisonStores
                            .filter(store => store.certifications && store.certifications.length > 0)
                            .map((store) => (
                              <li key={store.id} className="text-sm">
                                {store.name} has {store.certifications?.length} certification(s)
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-graphite/70 mt-1">No certification data available</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DrawerFooter className="flex flex-row gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={clearComparison}
            disabled={comparisonStores.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
          {saveComparison && (
            <Button 
              className="flex-1 bg-gold hover:bg-gold/90 text-white"
              disabled={comparisonStores.length < 2}
              onClick={saveComparison}
            >
              Save Comparison
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default StoreComparisonDrawer;
