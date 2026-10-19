
import { typedSupabase } from '@/integrations/supabase/typed-client';
import { Store, CertificationType, Certification } from '@/services/storeService';
import { storeService } from '@/services/storeService';
import { BaseStoreService } from './baseStoreService';
import { mapDbStoreToStore, mapStoreToDbStore, mapCertificationToDbCertification } from './mappers';

// Service functions for store data management using Supabase
class SupabaseStoreService extends BaseStoreService {
  // Get all stores
  async getStores(): Promise<Store[]> {
    try {
      const { data: stores, error } = await typedSupabase
        .from('stores')
        .select('*');
      
      if (error) {
        console.error('Error fetching stores from Supabase:', error);
        return storeService.getStores();
      }
      
      if (!stores || stores.length === 0) {
        console.log('No stores found in Supabase, falling back to mock data');
        return storeService.getStores();
      }
      
      // Get all certifications for these stores
      const storeIds = stores.map(store => store.id);
      const { data: certifications, error: certError } = await typedSupabase
        .from('store_certifications')
        .select('*')
        .in('store_id', storeIds);
      
      if (certError) {
        console.error('Error fetching certifications:', certError);
      }
      
      // Map to domain model and group certifications by store
      return stores.map(store => {
        const storeCertifications = certifications?.filter(cert => cert.store_id === store.id) || [];
        return mapDbStoreToStore(store, storeCertifications);
      });
    } catch (err) {
      console.error('Unexpected error in getStores:', err);
      return storeService.getStores();
    }
  }
  
  // Get store by ID
  async getStoreById(id: string): Promise<Store | null> {
    try {
      const { data: store, error } = await typedSupabase
        .from('stores')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !store) {
        console.log(`Store with id ${id} not found in Supabase, checking mock data`);
        return storeService.getStoreById(id);
      }
      
      // Get certifications for this store
      const { data: certifications, error: certError } = await typedSupabase
        .from('store_certifications')
        .select('*')
        .eq('store_id', id);
      
      if (certError) {
        console.error('Error fetching certifications:', certError);
      }
      
      return mapDbStoreToStore(store, certifications || []);
    } catch (err) {
      console.error('Unexpected error in getStoreById:', err);
      return storeService.getStoreById(id);
    }
  }
  
  // Filter stores
  async filterStores(filters: {
    region?: string;
    city?: string;
    specialties?: string[];
    minSafetyRating?: number;
    isVerified?: boolean;
    certifications?: CertificationType[];
  }): Promise<Store[]> {
    try {
      let query = typedSupabase
        .from('stores')
        .select('*');
      
      // Apply filters
      if (filters.region) {
        query = query.eq('region', filters.region);
      }
      
      if (filters.city) {
        query = query.eq('city', filters.city);
      }
      
      if (filters.minSafetyRating !== undefined) {
        query = query.gte('safety_rating', filters.minSafetyRating);
      }
      
      if (filters.isVerified) {
        query = query.eq('is_verified', true);
      }
      
      const { data: stores, error } = await query;
      
      if (error || !stores || stores.length === 0) {
        console.log('No stores matching filters in Supabase, falling back to mock data');
        return storeService.filterStores(filters);
      }
      
      // Get all certifications for these stores
      const storeIds = stores.map(store => store.id);
      const { data: certifications, error: certError } = await typedSupabase
        .from('store_certifications')
        .select('*')
        .in('store_id', storeIds);
      
      if (certError) {
        console.error('Error fetching certifications:', certError);
      }
      
      // Filter by specialties (array contains)
      let filteredStores = stores;
      if (filters.specialties && filters.specialties.length > 0) {
        filteredStores = filteredStores.filter(store => 
          filters.specialties!.some(specialty => 
            store.specialties.includes(specialty)
          )
        );
      }
      
      // Filter by certifications
      if (filters.certifications && filters.certifications.length > 0 && certifications) {
        const storesWithMatchingCerts = certifications
          .filter(cert => filters.certifications!.includes(cert.type as CertificationType))
          .map(cert => cert.store_id);
        
        filteredStores = filteredStores.filter(store => 
          storesWithMatchingCerts.includes(store.id)
        );
      }
      
      // Map to domain model and group certifications by store
      return filteredStores.map(store => {
        const storeCertifications = certifications?.filter(cert => cert.store_id === store.id) || [];
        return mapDbStoreToStore(store, storeCertifications);
      });
    } catch (err) {
      console.error('Unexpected error in filterStores:', err);
      return storeService.filterStores(filters);
    }
  }
  
  // Get certified stores
  async getCertifiedStores(): Promise<Store[]> {
    try {
      const { data: certifications, error: certError } = await typedSupabase
        .from('store_certifications')
        .select('*');
      
      if (certError || !certifications || certifications.length === 0) {
        console.log('No certifications found in Supabase, falling back to mock data');
        return storeService.getCertifiedStores();
      }
      
      // Get unique store IDs that have certifications
      const certifiedStoreIds = [...new Set(certifications.map(cert => cert.store_id))];
      
      // Fetch certified stores
      const { data: stores, error } = await typedSupabase
        .from('stores')
        .select('*')
        .in('id', certifiedStoreIds);
      
      if (error || !stores || stores.length === 0) {
        console.log('No certified stores found in Supabase, falling back to mock data');
        return storeService.getCertifiedStores();
      }
      
      // Map to domain model and group certifications by store
      return stores.map(store => {
        const storeCertifications = certifications.filter(cert => cert.store_id === store.id);
        return mapDbStoreToStore(store, storeCertifications);
      });
    } catch (err) {
      console.error('Unexpected error in getCertifiedStores:', err);
      return storeService.getCertifiedStores();
    }
  }
  
  // Get available certification types
  async getCertificationTypes(): Promise<CertificationType[]> {
    try {
      const { data, error } = await typedSupabase
        .from('store_certifications')
        .select('type');
      
      if (error || !data || data.length === 0) {
        return storeService.getCertificationTypes();
      }
      
      // Extract unique certification types
      const types = [...new Set(data.map(cert => cert.type))] as CertificationType[];
      return types;
    } catch (err) {
      console.error('Unexpected error in getCertificationTypes:', err);
      return storeService.getCertificationTypes();
    }
  }

  // Create a new store
  async createStore(store: Omit<Store, 'id' | 'lastUpdated' | 'certifications'>): Promise<Store> {
    try {
      const dbStore = mapStoreToDbStore(store);
      
      const { data, error } = await typedSupabase
        .from('stores')
        .insert(dbStore)
        .select()
        .single();
      
      if (error || !data) {
        throw new Error(`Failed to create store: ${error?.message || 'Unknown error'}`);
      }
      
      return mapDbStoreToStore(data);
    } catch (err) {
      console.error('Error in createStore:', err);
      throw err;
    }
  }

  // Add certification to a store
  async addCertification(storeId: string, certification: Omit<Certification, 'id'>): Promise<void> {
    try {
      const dbCertification = mapCertificationToDbCertification(storeId, certification);
      
      const { error } = await typedSupabase
        .from('store_certifications')
        .insert(dbCertification);
      
      if (error) {
        throw new Error(`Failed to add certification: ${error.message}`);
      }
    } catch (err) {
      console.error('Error in addCertification:', err);
      throw err;
    }
  }

  // Upload store image
  async uploadStoreImage(storeId: string, file: File): Promise<string> {
    try {
      const filePath = `store-images/${storeId}/${file.name}`;
      
      // This would use Supabase Storage in a real implementation
      // For now, just return a mock URL
      console.log(`Would upload image to ${filePath}`);
      return `https://example.com/${filePath}`;
    } catch (err) {
      console.error('Error in uploadStoreImage:', err);
      throw err;
    }
  }
}

export const storeServiceSupabase = new SupabaseStoreService();
export default storeServiceSupabase;
