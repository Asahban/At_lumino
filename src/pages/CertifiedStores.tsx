
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Search, 
  Filter, 
  Info, 
  Store as StoreIcon, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ChevronDown, 
  BadgeCheck,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuSeparator, 
  DropdownMenuLabel 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CertificationBadge from '@/components/CertificationBadge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { storeService, Store as StoreType, CertificationType } from '@/services/storeService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import StoreFilterDrawer from '@/components/StoreFilterDrawer';
import StoreComparisonDrawer from '@/components/StoreComparisonDrawer';

const CertifiedStores = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<CertificationType[]>([]);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [comparisonDrawerOpen, setComparisonDrawerOpen] = useState(false);
  const [comparisonList, setComparisonList] = useState<StoreType[]>([]);
  const [minSafetyRating, setMinSafetyRating] = useState(0);
  const [regionFilter, setRegionFilter] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  // Fetch filter options
  const { data: certificationTypes } = useQuery({
    queryKey: ['certification-types'],
    queryFn: storeService.getCertificationTypes,
  });
  
  // Fetch regions
  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const stores = await storeService.getStores();
      const uniqueRegions = [...new Set(stores.map(store => store.region))];
      return uniqueRegions;
    },
  });
  
  // Get all certified stores with filters
  const { data: stores, isLoading: storesLoading, refetch } = useQuery({
    queryKey: ['certified-stores', selectedFilters, minSafetyRating, regionFilter],
    queryFn: () => storeService.filterStores({ 
      certifications: selectedFilters.length > 0 ? selectedFilters : undefined,
      minSafetyRating: minSafetyRating > 0 ? minSafetyRating : undefined,
      region: regionFilter || undefined,
      isVerified: true 
    }),
  });
  
  // Filter stores based on search term
  const filteredStores = stores?.filter(store => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      store.name.toLowerCase().includes(search) ||
      store.city.toLowerCase().includes(search) ||
      store.region.toLowerCase().includes(search) ||
      store.specialties.some(s => s.toLowerCase().includes(search)) ||
      store.certifications?.some(c => c.type.toLowerCase().includes(search))
    );
  });
  
  // Handler for certification filter
  const toggleCertificationFilter = (type: CertificationType) => {
    setSelectedFilters(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters([]);
    setMinSafetyRating(0);
    setRegionFilter('');
  };
  
  // Apply filters (for mobile drawer)
  const applyFilters = () => {
    refetch();
  };
  
  // Navigate to store profile page
  const goToStoreProfile = (storeId: string) => {
    navigate(`/certified-stores/${storeId}`);
  };
  
  // Comparison handlers
  const handleCompare = (store: StoreType) => {
    if (comparisonList.some(s => s.id === store.id)) {
      toast.info(`${store.name} is already in your comparison list`);
      return;
    }
    
    if (comparisonList.length >= 3) {
      toast.warning("You can compare up to 3 stores at a time");
      return;
    }
    
    setComparisonList(prev => [...prev, store]);
    toast.success(`Added ${store.name} to comparison list`);
  };
  
  const removeFromComparison = (storeId: string) => {
    setComparisonList(prev => prev.filter(store => store.id !== storeId));
  };
  
  const clearComparison = () => {
    setComparisonList([]);
    toast.info("Comparison list cleared");
  };
  
  const saveComparison = () => {
    // In a real app, this would save to user's account/localStorage
    toast.success("Comparison saved to your account");
    // Could also generate a shareable link
  };
  
  // Helper to get safety badge
  const getSafetyBadge = (rating: number) => {
    if (rating >= 4.5) return <Badge className="bg-green-500">Excellent</Badge>;
    if (rating >= 4.0) return <Badge className="bg-emerald-400">Good</Badge>;
    if (rating >= 3.5) return <Badge className="bg-yellow-400">Fair</Badge>;
    return <Badge className="bg-red-500">Caution</Badge>;
  };
  
  // Count active filters for mobile drawer badge
  const filtersCount = selectedFilters.length + (minSafetyRating > 0 ? 1 : 0) + (regionFilter ? 1 : 0);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                Verified & Certified Stores
              </h1>
              <p className="text-graphite/70 max-w-2xl">
                Browse jewelry stores that meet rigorous certification standards and regulatory compliance.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => setInfoModalOpen(true)}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                Why Certification Matters
              </Button>
              
              {comparisonList.length > 0 && (
                <Button
                  onClick={() => setComparisonDrawerOpen(true)}
                  className="bg-gold hover:bg-gold/90 text-white flex items-center gap-2"
                >
                  <BadgeCheck className="h-4 w-4 mr-1" />
                  Compare ({comparisonList.length})
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-gold/5 border border-gold/10 rounded-lg p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-graphite/50" />
                <Input
                  placeholder="Search by name, city, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gold/20 focus:border-gold focus:ring-gold/30"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {/* Desktop filters */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        Certifications
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[220px]">
                      <DropdownMenuLabel>Filter by Certification</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {certificationTypes?.map((type) => (
                        <DropdownMenuCheckboxItem
                          key={type}
                          checked={selectedFilters.includes(type)}
                          onCheckedChange={() => toggleCertificationFilter(type)}
                        >
                          {type}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Region
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[220px]">
                      <DropdownMenuLabel>Filter by Region</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {regions?.map((region) => (
                        <DropdownMenuCheckboxItem
                          key={region}
                          checked={regionFilter === region}
                          onCheckedChange={() => setRegionFilter(prev => prev === region ? '' : region)}
                        >
                          {region}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Mobile filter trigger */}
                <Button 
                  className="md:hidden bg-gold hover:bg-gold/90 text-white relative"
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {filtersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-gold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {filtersCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Active filters display */}
            {(selectedFilters.length > 0 || minSafetyRating > 0 || regionFilter) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-graphite/70">Active filters:</span>
                
                {selectedFilters.map(filter => (
                  <Badge 
                    key={filter} 
                    variant="outline" 
                    className="bg-white cursor-pointer"
                    onClick={() => toggleCertificationFilter(filter)}
                  >
                    {filter} &times;
                  </Badge>
                ))}
                
                {minSafetyRating > 0 && (
                  <Badge 
                    variant="outline" 
                    className="bg-white cursor-pointer"
                    onClick={() => setMinSafetyRating(0)}
                  >
                    Safety ≥ {minSafetyRating.toFixed(1)} &times;
                  </Badge>
                )}
                
                {regionFilter && (
                  <Badge 
                    variant="outline" 
                    className="bg-white cursor-pointer"
                    onClick={() => setRegionFilter('')}
                  >
                    {regionFilter} &times;
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-6"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
          
          {storesLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-graphite/70">
                  {filteredStores?.length || 0} certified stores found
                </p>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-gold/10 border-gold/20">
                        <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                        Omotenashi Verified
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">All stores on this page have been manually verified by our team for certification authenticity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStores?.map(store => (
                    <motion.div
                      key={store.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <Card 
                        className="border-gold/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col cursor-pointer"
                        onClick={() => goToStoreProfile(store.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl font-serif">{store.name}</CardTitle>
                            {getSafetyBadge(store.safetyRating)}
                          </div>
                          <CardDescription>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-gold" />
                              {store.location}, {store.city}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="flex-grow">
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs text-graphite/60 mb-1">Certifications</p>
                              <div className="flex flex-wrap gap-2">
                                {store.certifications?.map((cert, idx) => (
                                  <CertificationBadge key={idx} type={cert.type} />
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-graphite/60 mb-1">Specialties</p>
                              <div className="flex flex-wrap gap-2">
                                {store.specialties.map((specialty, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="pt-2 flex items-center text-xs text-graphite/50">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>Verified {new Date(store.lastUpdated).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gold hover:bg-gold-dark text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToStoreProfile(store.id);
                            }}
                          >
                            View Store
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-gold/30 hover:bg-gold/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompare(store);
                            }}
                          >
                            Compare
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
              
              {filteredStores?.length === 0 && (
                <div className="text-center py-16">
                  <StoreIcon className="h-12 w-12 text-gold/30 mx-auto mb-4" />
                  <h3 className="text-xl font-serif mb-2">No certified stores found</h3>
                  <p className="text-graphite/70 max-w-md mx-auto">
                    Try adjusting your search or filters to find stores that match your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
      
      {/* Why Certification Matters Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Why Certification Matters</DialogTitle>
            <DialogDescription>
              Understanding jewelry certifications helps you make safer purchasing decisions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-graphite/80">
              Jewelry certifications are formal guarantees that the pieces you're purchasing meet specific standards for quality, purity, and authenticity. Here's why they matter:
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certification</TableHead>
                  <TableHead>Importance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      BIS Hallmark
                    </div>
                  </TableCell>
                  <TableCell>
                    Guarantees gold purity as per Indian standards. Mandatory for gold jewelry sold in India.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center gap-2">
                      <Badge className="h-4 w-4 text-blue-500" />
                      GIA
                    </div>
                  </TableCell>
                  <TableCell>
                    The gold standard for diamond certification, providing accurate grading for the 4Cs.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center gap-2">
                      <Badge className="h-4 w-4 text-violet-500" />
                      IGI
                    </div>
                  </TableCell>
                  <TableCell>
                    Popular for diamond certification, especially in Asia. Provides detailed gemstone analysis.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-slate-500" />
                      Platinum Guild
                    </div>
                  </TableCell>
                  <TableCell>
                    Ensures platinum purity and craftsmanship standards for platinum jewelry.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="bg-gold/5 p-4 rounded-lg border border-gold/10">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-gold" />
                Buyer Protection
              </h4>
              <p className="text-sm text-graphite/70">
                Certified jewelry provides legal recourse in case of disputes about purity or quality. Always request and save certification documents when making jewelry purchases.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Mobile Filter Drawer */}
      <StoreFilterDrawer
        open={filterDrawerOpen}
        onOpenChange={setFilterDrawerOpen}
        selectedCertifications={selectedFilters}
        toggleCertification={toggleCertificationFilter}
        clearAllFilters={clearAllFilters}
        certificationTypes={certificationTypes}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        minSafetyRating={minSafetyRating}
        setMinSafetyRating={setMinSafetyRating}
        regions={regions || []}
        applyFilters={applyFilters}
        filtersCount={filtersCount}
      />
      
      {/* Comparison Drawer */}
      <StoreComparisonDrawer
        open={comparisonDrawerOpen}
        onOpenChange={setComparisonDrawerOpen}
        comparisonStores={comparisonList}
        removeFromComparison={removeFromComparison}
        clearComparison={clearComparison}
        saveComparison={saveComparison}
      />
      
      <Footer />
    </div>
  );
};

export default CertifiedStores;
