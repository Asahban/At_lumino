
import { supabase } from '@/integrations/supabase/client';
import { typedSupabase } from '@/integrations/supabase/typed-client';

export interface GoldPrice {
  id?: string;
  purity: string;
  price: number;
  currency?: string;
  timestamp?: string;
  change_percentage?: number;
}

export const goldPriceService = {
  async fetchLatestPrices(): Promise<GoldPrice[]> {
    try {
      console.log('Fetching latest gold prices...');
      
      // Use the typed client to access the gold_prices table
      const { data, error } = await typedSupabase
        .from('gold_prices')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(3);  // Limit to latest 3 entries (one for each purity)

      if (error) {
        console.error('Error fetching gold prices:', error);
        throw error;
      }
      
      console.log('Received gold prices:', data);
      
      // Map the returned data to match our GoldPrice interface
      const goldPrices: GoldPrice[] = (data || []).map(item => ({
        id: item.id,
        purity: item.purity,
        price: item.price,
        currency: item.currency || 'INR',
        timestamp: item.timestamp,
        change_percentage: item.change_percentage
      }));
      
      return goldPrices;
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      return [];
    }
  },

  async refreshPrices(): Promise<any> {
    try {
      console.log('Refreshing gold prices...');
      // Trigger the edge function to fetch and store new prices
      const response = await supabase.functions.invoke('fetch-gold-prices');
      console.log('Gold price refresh response:', response);
      return response.data;
    } catch (error) {
      console.error('Error refreshing gold prices:', error);
      throw error;
    }
  }
};
