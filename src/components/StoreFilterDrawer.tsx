
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
import { Slider } from '@/components/ui/slider';
import { X, Trash2, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CertificationType } from '@/services/storeService';

interface StoreFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCertifications: CertificationType[];
  toggleCertification: (type: CertificationType) => void;
  clearAllFilters: () => void;
  certificationTypes: CertificationType[] | undefined;
  regionFilter: string;
  setRegionFilter: (region: string) => void;
  minSafetyRating: number;
  setMinSafetyRating: (rating: number) => void;
  regions: string[];
  applyFilters: () => void;
  filtersCount: number;
}

const StoreFilterDrawer: React.FC<StoreFilterDrawerProps> = ({
  open,
  onOpenChange,
  selectedCertifications,
  toggleCertification,
  clearAllFilters,
  certificationTypes,
  regionFilter,
  setRegionFilter,
  minSafetyRating,
  setMinSafetyRating,
  regions,
  applyFilters,
  filtersCount
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 max-h-[85vh]">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle className="text-xl font-serif flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Stores
            {filtersCount > 0 && (
              <Badge className="ml-2 bg-gold text-white">{filtersCount}</Badge>
            )}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-1 py-2 overflow-y-auto space-y-6">
          {/* Region filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Region</h3>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Badge 
                  key={region}
                  variant={regionFilter === region ? "default" : "outline"}
                  className={`cursor-pointer ${
                    regionFilter === region 
                    ? "bg-gold hover:bg-gold/90" 
                    : "hover:bg-gold/10"
                  }`}
                  onClick={() => setRegionFilter(regionFilter === region ? '' : region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>

          {/* Certification filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {certificationTypes?.map((type) => (
                <motion.div
                  key={type}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant={selectedCertifications.includes(type) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCertifications.includes(type) 
                      ? "bg-gold hover:bg-gold/90" 
                      : "hover:bg-gold/10"
                    }`}
                    onClick={() => toggleCertification(type)}
                  >
                    {type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Safety rating filter */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Minimum Safety Rating</h3>
              <span className="text-sm font-medium">{minSafetyRating.toFixed(1)}</span>
            </div>
            <Slider
              defaultValue={[minSafetyRating]}
              min={0}
              max={5}
              step={0.5}
              onValueChange={(values) => setMinSafetyRating(values[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-graphite/60">
              <span>0.0</span>
              <span>5.0</span>
            </div>
          </div>
        </div>
        
        <DrawerFooter className="flex flex-row gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={clearAllFilters}
            disabled={filtersCount === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
          <Button 
            className="flex-1 bg-gold hover:bg-gold/90 text-white"
            onClick={() => {
              applyFilters();
              onOpenChange(false);
            }}
          >
            Apply Filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default StoreFilterDrawer;
