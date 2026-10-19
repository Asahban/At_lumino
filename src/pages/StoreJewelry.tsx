
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import CertificationBadge from '@/components/CertificationBadge';
import { CertificationType } from '@/services/storeService';
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  Info, 
  Shield,
  ChevronDown,
  CheckCircle,
  X,
  Grid3x3,
  LayoutGrid,
  Layers,
  CircleEllipsis,
  Clock,
  Tag
} from 'lucide-react';

// Mock data for the jewelry collection
const jewelryItems = [
  {
    id: '1',
    name: 'Temple Style Gold Necklace',
    type: 'Necklace',
    category: 'Gold',
    karat: '22K',
    weight: '32.5g',
    price: '₹172,450',
    makingCharges: '12%',
    certification: ['BIS'],
    imageUrl: '/temple-jewelry.jpg',
    isNew: true,
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Traditional Gold Bangles Set',
    type: 'Bangles',
    category: 'Gold',
    karat: '22K',
    weight: '28.2g',
    price: '₹149,600',
    makingCharges: '10%',
    certification: ['BIS'],
    imageUrl: '/gold-standards.jpg',
    isNew: false,
    isBestseller: true,
  },
  {
    id: '3',
    name: 'Diamond Studded Pendant',
    type: 'Pendant',
    category: 'Diamond',
    karat: '18K',
    weight: '12.7g',
    price: '₹87,900',
    makingCharges: '18%',
    certification: ['BIS', 'IGI'],
    imageUrl: '/gemstone-grading.jpg',
    isNew: false,
    isBestseller: false,
  },
  {
    id: '4',
    name: 'Antique Style Gold Earrings',
    type: 'Earrings',
    category: 'Gold',
    karat: '22K',
    weight: '16.3g',
    price: '₹86,400',
    makingCharges: '15%',
    certification: ['BIS'],
    imageUrl: '/antique-background.jpg',
    isNew: false,
    isBestseller: false,
  },
  {
    id: '5',
    name: 'Ruby and Diamond Ring',
    type: 'Ring',
    category: 'Diamond',
    karat: '18K',
    weight: '7.8g',
    price: '₹56,200',
    makingCharges: '20%',
    certification: ['BIS', 'IGI'],
    imageUrl: '/gemstone-grading.jpg',
    isNew: true,
    isBestseller: false,
  },
  {
    id: '6',
    name: 'Gold Chain with Traditional Pendant',
    type: 'Chain',
    category: 'Gold',
    karat: '22K',
    weight: '18.5g',
    price: '₹98,200',
    makingCharges: '8%',
    certification: ['BIS'],
    imageUrl: '/temple-jewelry.jpg',
    isNew: false,
    isBestseller: true,
  },
];

const StoreJewelry = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'large' | 'rows'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredItems, setFilteredItems] = useState(jewelryItems);
  const [activeMagnifier, setActiveMagnifier] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const categories = ['All', 'Gold', 'Diamond', 'Gemstone', 'Silver'];
  const jewelryTypes = ['All Types', 'Necklace', 'Earrings', 'Bangles', 'Rings', 'Chains', 'Bracelets'];
  
  useEffect(() => {
    const filtered = jewelryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory]);

  const goBack = () => {
    navigate(-1);
  };
  
  // Function to toggle magnifier on mobile touch
  const toggleMagnifier = (itemId: string) => {
    if (activeMagnifier === itemId) {
      setActiveMagnifier(null);
    } else {
      setActiveMagnifier(itemId);
    }
  };
  
  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -10,
      transition: { duration: 0.3 }
    }
  };
  
  // Get column count based on view mode
  const getGridCols = () => {
    switch(viewMode) {
      case 'large':
        return 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2';
      case 'rows':
        return 'grid-cols-1';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back button */}
      <div className="container mx-auto px-4 pt-6">
        <button 
          onClick={goBack}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Store Profile
        </button>
      </div>
      
      {/* Store Jewelry Header */}
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl font-serif font-bold">Rangaswami Jewelers</h1>
            <p className="text-muted-foreground">Crafting elegance since 1973</p>
          </div>
          
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gold/20 shadow-sm"
            >
              <CheckCircle className="h-3.5 w-3.5 text-gold mr-1.5" />
              <span>BIS Verified</span>
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gold/20 shadow-sm"
            >
              <Star className="h-3.5 w-3.5 fill-gold text-gold mr-1.5" />
              <span>4.8 Rated</span>
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gold/20 shadow-sm"
            >
              <Shield className="h-3.5 w-3.5 text-gold mr-1.5" />
              <span>Certified</span>
            </motion.span>
          </div>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gold/20 p-5 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Search jewelry..." 
                className="pl-10 border-gold/20 focus-visible:ring-gold/30 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter toggle button (mobile) */}
            <div className="lg:hidden w-full">
              <Button 
                variant="outline" 
                className="border-gold/20 w-full flex items-center justify-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </Button>
            </div>
            
            {/* Desktop filters */}
            <div className="hidden lg:flex gap-3 items-center">
              <div className="relative">
                <Button variant="outline" className="border-gold/20 flex items-center gap-2 rounded-full">
                  <Filter className="h-4 w-4" />
                  <span>Category</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Button variant="outline" className="border-gold/20 flex items-center gap-2 rounded-full">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Price Range</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Button variant="outline" className="border-gold/20 flex items-center gap-2 rounded-full">
                  <Tag className="h-4 w-4" />
                  <span>Sort By</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              {/* View mode toggle */}
              <div className="border border-gold/20 rounded-full p-1 flex bg-white/50 backdrop-blur-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-gold text-white' : 'hover:bg-gold/10'}`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode('large')}
                  className={`p-1.5 rounded-full ${viewMode === 'large' ? 'bg-gold text-white' : 'hover:bg-gold/10'}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode('rows')}
                  className={`p-1.5 rounded-full ${viewMode === 'rows' ? 'bg-gold text-white' : 'hover:bg-gold/10'}`}
                >
                  <Layers className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile filters (expandable) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="py-2 space-y-4">
                  {/* View mode toggle (mobile) */}
                  <div className="border border-gold/20 rounded-full p-1 flex bg-white/50 backdrop-blur-sm self-center w-fit mx-auto">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-gold text-white' : 'hover:bg-gold/10'}`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode('large')}
                      className={`p-1.5 rounded-full ${viewMode === 'large' ? 'bg-gold text-white' : 'hover:bg-gold/10'}`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode('rows')}
                      className={`p-1.5 rounded-full ${viewMode === 'rows' ? 'bg-gold text-white' : 'hover:bg-gold/10'}`}
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <select className="w-full border border-gold/20 rounded-full p-2 bg-white/50 focus:ring-gold/30 outline-none">
                      <option>Sort By: Price (Low to High)</option>
                      <option>Sort By: Price (High to Low)</option>
                      <option>Sort By: Newest First</option>
                      <option>Sort By: Most Popular</option>
                    </select>
                    
                    <select className="w-full border border-gold/20 rounded-full p-2 bg-white/50 focus:ring-gold/30 outline-none">
                      <option>Price Range: All</option>
                      <option>Price Range: Under ₹50,000</option>
                      <option>Price Range: ₹50,000 - ₹100,000</option>
                      <option>Price Range: Above ₹100,000</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Category Pills */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white/70 border border-gold/20 hover:bg-gold/10'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Jewelry Grid */}
        <div className={`grid ${getGridCols()} gap-6`}>
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={viewMode !== 'rows' ? "hover" : undefined}
                variants={itemVariants}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`${
                  viewMode === 'rows' 
                    ? 'flex flex-col sm:flex-row gap-5 items-center sm:items-stretch'
                    : viewMode === 'large'
                      ? 'flex flex-col'
                      : 'flex flex-col'
                } bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gold/20 overflow-hidden group transition-all duration-300 hover:shadow-lg`}
              >
                {/* Image container with hover effects */}
                <div className={`
                  relative overflow-hidden
                  ${viewMode === 'rows' ? 'w-full sm:w-1/3 aspect-square' : 'aspect-square w-full'}
                `}>
                  <div 
                    className="w-full h-full relative overflow-hidden"
                    onClick={() => toggleMagnifier(item.id)}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className={`
                        w-full h-full object-cover transition-all duration-500
                        ${hoveredItem === item.id || activeMagnifier === item.id ? 'scale-110' : 'scale-100'}
                      `}
                    />
                    
                    {/* Magnifier glass effect on hover/touch */}
                    {(hoveredItem === item.id || activeMagnifier === item.id) && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
                      />
                    )}
                  </div>
                  
                  {/* Quick action buttons */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full bg-white/90 backdrop-blur-sm border-gold/20 h-8 w-8 flex items-center justify-center shadow-md"
                    >
                      <Heart className="h-4 w-4 text-gold-dark" />
                    </motion.button>
                    
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full bg-white/90 backdrop-blur-sm border-gold/20 h-8 w-8 flex items-center justify-center shadow-md"
                    >
                      <CircleEllipsis className="h-4 w-4 text-gold-dark" />
                    </motion.button>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {item.isNew && (
                      <motion.span 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-2 py-1 bg-gold text-white text-xs font-medium rounded-full shadow-md"
                      >
                        New
                      </motion.span>
                    )}
                    
                    {item.isBestseller && !item.isNew && (
                      <motion.span 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-2 py-1 bg-gold-dark text-white text-xs font-medium rounded-full shadow-md"
                      >
                        Bestseller
                      </motion.span>
                    )}
                  </div>
                  
                  {/* View product button that appears on hover */}
                  {(hoveredItem === item.id || activeMagnifier === item.id) && viewMode !== 'rows' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <Button className="bg-gold hover:bg-gold-dark shadow-lg text-white px-6">
                        View Details
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                {/* Content */}
                <div className={`
                  p-4 flex flex-col
                  ${viewMode === 'rows' ? 'flex-1 text-left' : ''}
                  ${viewMode === 'large' ? 'p-6' : ''}
                `}>
                  <div className="flex items-start justify-between">
                    <div>
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`
                          font-serif font-medium mb-1 group-hover:text-gold transition-colors
                          ${viewMode === 'large' ? 'text-xl' : ''}
                        `}
                      >
                        {item.name}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        className="text-sm text-muted-foreground"
                      >
                        {item.type} • {item.karat} • {item.weight}
                      </motion.p>
                    </div>
                    <div className="flex">
                      {item.certification.map((cert) => (
                        <CertificationBadge key={cert} type={cert as CertificationType} size="xs" />
                      ))}
                    </div>
                  </div>
                  
                  {viewMode === 'large' && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      className="mt-3 text-sm text-muted-foreground"
                    >
                      This exquisite piece showcases intricate craftsmanship with traditional motifs, perfect for special occasions and everyday luxury.
                    </motion.p>
                  )}
                  
                  <Separator className="my-3 bg-gold/10" />
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.2 } }}
                        className="flex items-center gap-2"
                      >
                        <p className="text-xs text-muted-foreground">Price</p>
                        {viewMode === 'large' && (
                          <span className="flex items-center text-xs text-gold">
                            <Clock className="h-3 w-3 mr-1" />
                            7-day price match
                          </span>
                        )}
                      </motion.div>
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                        className={`font-medium ${viewMode === 'large' ? 'text-2xl' : 'text-lg'}`}
                      >
                        {item.price}
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.4 } }}
                        className="text-xs text-muted-foreground"
                      >
                        Making: {item.makingCharges}
                      </motion.p>
                    </div>
                    
                    {viewMode === 'rows' && (
                      <Button className="bg-gold hover:bg-gold-dark text-white">
                        View Details
                      </Button>
                    )}
                  </div>
                  
                  {viewMode === 'large' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                      className="mt-4 flex gap-3"
                    >
                      <Button className="bg-gold hover:bg-gold-dark text-white flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" className="border-gold/20 hover:bg-gold/10">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-xl"
          >
            <Info className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No matching items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline" 
              className="mt-4 border-gold/20"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </motion.div>
        )}
        
        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button 
              variant="outline" 
              className="border-gold/20 px-8 py-6 rounded-full hover:bg-gold/5"
            >
              Load More Items
            </Button>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreJewelry;
