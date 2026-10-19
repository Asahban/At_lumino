
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type StoreRegistrationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL';

export interface StoreRegistration {
  id: string;
  store_name: string;
  tagline?: string;
  description: string;
  established_year?: string;
  logo_url?: string;
  cover_image_url?: string;
  owner_name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  facebook_url?: string;
  instagram_handle?: string;
  twitter_handle?: string;
  linkedin_url?: string;
  youtube_url?: string;
  license_url?: string;
  gstin: string;
  registration_cert_url?: string;
  status: StoreRegistrationStatus;
  created_at: string;
}

export function useStoreRegistrations(status: StoreRegistrationStatus = 'ALL') {
  return useQuery({
    queryKey: ['store-registrations', status],
    queryFn: async () => {
      console.log('Fetching store registrations with status:', status);
      let query = supabase
        .from('store_registrations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (status !== 'ALL') {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching store registrations:', error);
        throw error;
      }
      
      console.log('Fetched registrations:', data);
      return data as StoreRegistration[];
    }
  });
}

export function useStoreRegistration(id: string) {
  return useQuery({
    queryKey: ['store-registration', id],
    queryFn: async () => {
      console.log('Fetching store registration with ID:', id);
      const { data, error } = await supabase
        .from('store_registrations')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Error fetching store registration:', error);
        throw error;
      }
      
      console.log('Fetched registration:', data);
      return data as StoreRegistration;
    },
    enabled: !!id
  });
}

export function useUpdateRegistrationStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      registrationId, 
      status 
    }: { 
      registrationId: string; 
      status: 'APPROVED' | 'REJECTED'; 
    }) => {
      console.log(`Updating registration ${registrationId} status to ${status}`);
      
      const { error } = await supabase
        .from('store_registrations')
        .update({ status })
        .eq('id', registrationId);
        
      if (error) {
        console.error('Error updating registration status:', error);
        throw error;
      }
      
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate relevant queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['store-registrations'] });
    }
  });
}

export function useCreateStore() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (registration: StoreRegistration) => {
      console.log('Creating store from registration:', registration);
      
      // Create a new store in the stores table
      const { data: store, error: storeError } = await supabase
        .from('stores')
        .insert({
          name: registration.store_name,
          location: registration.address,
          city: registration.city,
          region: registration.state,
          safety_rating: 4.0, // Default rating
          review_count: 0,
          is_verified: true,
          specialties: ['Gold Jewelry', 'Custom Designs'], // Default specialties based on registration
          position: { lat: 0, lng: 0 }, // Default position
          making_charges: { gold: 10 } // Default making charges
        })
        .select();

      if (storeError) {
        console.error('Error creating store:', storeError);
        throw storeError;
      }
      
      console.log('Store created successfully:', store);
      return store[0].id;
    },
    onSuccess: () => {
      // Invalidate relevant queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      queryClient.invalidateQueries({ queryKey: ['certifiedStores'] });
    }
  });
}
