
import { useQuery } from '@tanstack/react-query';
import { storeServiceSupabase } from '@/services/storeService/supabaseStoreService';
import { Store, CertificationType } from '@/services/storeService';

export function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: () => storeServiceSupabase.getStores(),
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching stores:', error);
      }
    }
  });
}

export function useStore(id: string) {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => storeServiceSupabase.getStoreById(id),
    enabled: !!id,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error(`Error fetching store ${id}:`, error);
      }
    }
  });
}

export function useCertifiedStores() {
  return useQuery({
    queryKey: ['certifiedStores'],
    queryFn: () => storeServiceSupabase.getCertifiedStores(),
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching certified stores:', error);
      }
    }
  });
}

export function useFilteredStores(filters: {
  region?: string;
  city?: string;
  specialties?: string[];
  minSafetyRating?: number;
  isVerified?: boolean;
  certifications?: CertificationType[];
}) {
  return useQuery({
    queryKey: ['filteredStores', filters],
    queryFn: () => storeServiceSupabase.filterStores(filters),
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error('Error filtering stores:', error);
      }
    }
  });
}

export function useCertificationTypes() {
  return useQuery({
    queryKey: ['certificationTypes'],
    queryFn: () => storeServiceSupabase.getCertificationTypes(),
    staleTime: Infinity, // Certification types don't change often
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching certification types:', error);
      }
    }
  });
}
