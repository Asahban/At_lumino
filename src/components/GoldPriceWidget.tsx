
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { goldPriceService, GoldPrice } from '@/services/goldPriceService';

interface GoldPriceWidgetProps {
  isTeaMode?: boolean;
}

const GoldPriceWidget = ({ isTeaMode = false }: GoldPriceWidgetProps) => {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const { data: goldPrices, isLoading, error, refetch } = useQuery({
    queryKey: ['goldPrices'],
    queryFn: goldPriceService.fetchLatestPrices,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000 // Auto refresh every 5 minutes
  });
  
  useEffect(() => {
    if (goldPrices?.length) {
      setLastUpdated(new Date());
      console.log('Gold prices updated:', goldPrices);
    }
  }, [goldPrices]);
  
  // Manual refresh handler
  const handleRefresh = async () => {
    toast({
      title: "Refreshing gold prices",
      description: "Getting the latest market rates for you.",
      duration: 2000,
    });
    
    try {
      await goldPriceService.refreshPrices();
      await refetch();
      toast({
        title: "Gold prices updated",
        description: "Latest rates have been fetched.",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error refreshing prices:", error);
      toast({
        title: "Failed to refresh prices",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  if (error) {
    console.error("Error fetching gold prices:", error);
  }
  
  return (
    <Card className={cn(
      "overflow-hidden border border-gold/20 shadow-sm",
      isTeaMode ? "bg-ivory-dark/80" : "bg-white/95 backdrop-blur-sm"
    )}>
      <CardHeader className="bg-gradient-to-r from-gold/10 to-transparent py-3">
        <CardTitle className="text-lg font-serif flex items-center justify-between">
          <span>Live Gold Prices</span>
          <button 
            onClick={handleRefresh}
            className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors"
          >
            <Clock className="h-3 w-3" />
            Refresh
          </button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="py-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : goldPrices && goldPrices.length > 0 ? (
          <>
            <div className="space-y-3">
              {goldPrices.map((gold) => (
                <div key={gold.purity} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      gold.purity === '24K' ? "bg-gold/20" : 
                      gold.purity === '22K' ? "bg-amber-100" : "bg-amber-50"
                    )}>
                      <span className="font-serif text-xs">{gold.purity}</span>
                    </div>
                    <div>
                      <div className="text-lg font-medium">₹{gold.price.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-graphite/60">per 10 grams</div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "flex items-center gap-1 text-sm",
                    (gold.change_percentage || 0) >= 0 ? "text-emerald-600" : "text-red-600"
                  )}>
                    {(gold.change_percentage || 0) >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {(gold.change_percentage || 0) >= 0 ? '+' : ''}
                      {(gold.change_percentage || 0).toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-2 border-t border-gold/10 text-xs text-graphite/60 flex justify-between items-center">
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <span className="text-gold/80">Mumbai market rates</span>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-graphite/60">
            Could not load gold prices. Please try again.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoldPriceWidget;
