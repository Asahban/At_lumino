
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Tag, Shield, SlidersHorizontal, X, BadgeCheck, 
         DollarSign, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ControlBarProps {
  isTeaMode?: boolean;
}

const ControlBar = ({ isTeaMode = false }: ControlBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');
  
  const regions = ["North India", "South India", "West Bengal", "Gujarat", "Maharashtra"];
  const types = ["Gold", "Silver", "Diamond", "Gemstone", "Platinum"];
  const standards = ["BIS Hallmark", "HUID", "IGI Certified", "GIA Certified", "SGL Certified"];
  
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region === selectedRegion ? '' : region);
  };
  
  const handleTypeSelect = (type: string) => {
    setSelectedType(type === selectedType ? '' : type);
  };
  
  const handleStandardSelect = (standard: string) => {
    setSelectedStandard(standard === selectedStandard ? '' : standard);
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  const handleClearAll = () => {
    setSelectedRegion('');
    setSelectedType('');
    setSelectedStandard('');
    setPriceRange([5000, 50000]);
  };
  
  const filtersCount = [selectedRegion, selectedType, selectedStandard].filter(Boolean).length;
  
  return (
    <div className={cn(
      "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40",
      "w-[90%] max-w-3xl bg-white/95 backdrop-blur-md rounded-full",
      "shadow-lg border border-gold/20 py-3 px-2 md:px-5 transition-all duration-300",
      isExpanded && "rounded-2xl h-auto",
      isTeaMode && "bg-ivory-dark/95 border-gold-dark/20"
    )}>
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="rounded-full p-3 hover:bg-gold/10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <X className="h-5 w-5 text-graphite" />
          ) : (
            <Filter className="h-5 w-5 text-graphite" />
          )}
        </Button>
        
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span 
            className={`control-item ${selectedRegion ? 'active-control' : ''}`}
            onClick={() => setIsExpanded(true)}
          >
            <MapPin className="h-4 w-4" /> Region
            {selectedRegion && <Badge className="ml-1 text-xs py-0 px-1 bg-gold/20">{selectedRegion.split(' ')[0]}</Badge>}
          </span>
          <span 
            className={`control-item ${selectedType ? 'active-control' : ''}`}
            onClick={() => setIsExpanded(true)}
          >
            <Tag className="h-4 w-4" /> Type
            {selectedType && <Badge className="ml-1 text-xs py-0 px-1 bg-gold/20">{selectedType}</Badge>}
          </span>
          <span 
            className={`control-item ${selectedStandard ? 'active-control' : ''}`}
            onClick={() => setIsExpanded(true)}
          >
            <Shield className="h-4 w-4" /> Standard
            {selectedStandard && <Badge className="ml-1 text-xs py-0 px-1 bg-gold/20">✓</Badge>}
          </span>
          <span 
            className="control-item"
            onClick={() => setIsExpanded(true)}
          >
            <DollarSign className="h-4 w-4" /> Price
            {(priceRange[0] !== 5000 || priceRange[1] !== 50000) && 
              <Badge className="ml-1 text-xs py-0 px-1 bg-gold/20">Filter</Badge>
            }
          </span>
          <Link to="/certified-stores" className="control-item bg-gold/10 text-gold">
            <BadgeCheck className="h-4 w-4" /> Certified Stores
          </Link>
        </div>
        
        {filtersCount > 0 ? (
          <Button 
            variant="ghost" 
            className="rounded-full p-3 hover:bg-gold/10"
            onClick={handleClearAll}
          >
            <Badge className="bg-gold text-white">{filtersCount}</Badge>
          </Button>
        ) : (
          <Button variant="ghost" className="rounded-full p-3 hover:bg-gold/10">
            <SlidersHorizontal className="h-5 w-5 text-graphite" />
          </Button>
        )}
      </div>
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div>
              <h4 className="text-sm font-serif mb-2">Regions</h4>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Badge 
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedRegion === region 
                        ? "bg-gold hover:bg-gold/90" 
                        : "hover:bg-gold/10"
                    }`}
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-serif mb-2">Type</h4>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <Badge 
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedType === type 
                        ? "bg-gold hover:bg-gold/90" 
                        : "hover:bg-gold/10"
                    }`}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-serif mb-2">Standard</h4>
              <div className="flex flex-wrap gap-2">
                {standards.map((standard) => (
                  <Badge 
                    key={standard}
                    variant={selectedStandard === standard ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedStandard === standard 
                        ? "bg-gold hover:bg-gold/90" 
                        : "hover:bg-gold/10"
                    }`}
                    onClick={() => handleStandardSelect(standard)}
                  >
                    {standard}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-serif">Price Range</h4>
                <span className="text-xs text-gold font-medium">
                  ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </span>
              </div>
              <Slider
                defaultValue={priceRange}
                min={1000}
                max={100000}
                step={1000}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-graphite/60 mt-1">
                <span>₹1,000</span>
                <span>₹100,000</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearAll}
              className="text-xs"
              disabled={filtersCount === 0 && priceRange[0] === 5000 && priceRange[1] === 50000}
            >
              Clear All
            </Button>
            <Button 
              size="sm"
              className="bg-gold hover:bg-gold/90 text-white text-xs"
            >
              Apply Filters
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ControlBar;
