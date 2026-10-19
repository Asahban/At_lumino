
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  X, 
  BookmarkPlus, 
  ArrowDownToLine, 
  Share2, 
  HelpCircle, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CompareItem {
  id: string;
  name: string;
  type: string;
  store: string;
  price: string;
  purity: string;
  safetyRating: number;
  image: string;
}

const sampleItems: CompareItem[] = [
  {
    id: '1',
    name: 'Heritage Pendant',
    type: '22K Gold',
    store: 'Maharani Jewelers',
    price: '₹42,500',
    purity: '91.6% pure',
    safetyRating: 4.8,
    image: '/temple-jewelry.jpg'
  },
  {
    id: '2',
    name: 'Classic Gold Chain',
    type: '24K Gold',
    store: 'Pristine Collections',
    price: '₹36,900',
    purity: '99.9% pure',
    safetyRating: 4.5,
    image: '/gold-purity.jpg'
  }
];

const CompareModeConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [compareItems, setCompareItems] = useState<CompareItem[]>(sampleItems);
  const [showTip, setShowTip] = useState(true);
  
  const removeItem = (id: string) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <>
      {/* Floating compare button - always visible */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => setIsOpen(!isOpen)} 
            className={cn(
              "rounded-full h-14 w-14 shadow-lg flex items-center justify-center transition-all",
              isOpen ? "bg-gold hover:bg-gold-dark" : "bg-white border border-gold/20 text-gold hover:border-gold/40"
            )}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <div className="relative">
                <Scale className="h-5 w-5" />
                {compareItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {compareItems.length}
                  </span>
                )}
              </div>
            )}
          </Button>
        </motion.div>
      </div>
      
      {/* Compare console panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-8 w-full max-w-md z-40"
          >
            <Card className="bg-white/95 backdrop-blur-md border border-gold/20 shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gold/10 to-transparent">
                <CardTitle className="font-serif text-xl flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-gold" />
                  Your Comparison Workspace
                </CardTitle>
                <CardDescription>
                  Compare jewelry with confidence and clarity
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Workspace tip - Omotenashi guidance */}
                <AnimatePresence>
                  {showTip && compareItems.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gold/5 p-4 border-y border-gold/10"
                    >
                      <div className="flex">
                        <div className="mr-3 mt-0.5">
                          <HelpCircle className="h-4 w-4 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm text-graphite/90">
                            You may also want to consider comparing the <span className="text-gold font-medium">safety certification</span> of these pieces.
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-1 h-7 text-xs text-gold/70 hover:text-gold"
                            onClick={() => setShowTip(false)}
                          >
                            Thank you
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <ScrollArea className="h-[300px] p-4">
                  {compareItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <div className="bg-gold/10 rounded-full p-3">
                        <Scale className="h-6 w-6 text-gold/40" />
                      </div>
                      <h4 className="mt-4 text-lg font-serif text-graphite/70">Your workspace is empty</h4>
                      <p className="mt-2 text-sm text-graphite/50">
                        Add items to compare their quality, price, and craftsmanship
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {compareItems.map((item) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex group"
                        >
                          <div 
                            className="w-16 h-16 rounded-md bg-cover bg-center mr-3 flex-shrink-0"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h5 className="font-medium text-graphite">{item.name}</h5>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                              >
                                <X className="h-3 w-3 text-graphite/70" />
                              </button>
                            </div>
                            <p className="text-xs text-graphite/70">{item.type} • {item.store}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm font-medium text-gold">{item.price}</span>
                              <div className="flex items-center">
                                {item.safetyRating >= 4.5 ? (
                                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                                    <span className="w-1 h-1 bg-green-500 rounded-full mr-1"></span>
                                    Safe
                                  </span>
                                ) : item.safetyRating >= 3.5 ? (
                                  <span className="text-xs bg-yellow-50 text-amber-700 px-2 py-0.5 rounded-full flex items-center">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                                    Verified
                                  </span>
                                ) : (
                                  <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full flex items-center">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Caution
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              
              <Separator className="bg-gold/10" />
              
              <CardFooter className="px-4 py-3 bg-gold/5 flex justify-between">
                <Button variant="ghost" size="sm" className="text-xs text-graphite/70">
                  <BookmarkPlus className="h-3.5 w-3.5 mr-1" />
                  Save
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-graphite/70">
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-graphite/70">
                  <ArrowDownToLine className="h-3.5 w-3.5 mr-1" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompareModeConsole;
