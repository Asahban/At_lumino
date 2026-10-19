
import { DbStore, DbStoreCertification } from '@/integrations/supabase/database.types';
import { Store, Certification, CertificationType } from '@/services/storeService';

// Map from database model to application model
export function mapDbStoreToStore(dbStore: DbStore, certifications?: DbStoreCertification[]): Store {
  return {
    id: dbStore.id,
    name: dbStore.name,
    location: dbStore.location,
    region: dbStore.region,
    city: dbStore.city,
    safetyRating: dbStore.safety_rating,
    makingCharges: dbStore.making_charges,
    specialties: dbStore.specialties,
    isVerified: dbStore.is_verified,
    reviewCount: dbStore.review_count,
    position: dbStore.position,
    lastUpdated: dbStore.last_updated,
    certifications: certifications?.map(cert => ({
      type: cert.type as CertificationType,
      number: cert.number,
      issuedDate: cert.issued_date,
      validUntil: cert.valid_until,
      verifiedOn: cert.verified_on
    }))
  };
}

// Map from application model to database model (for store creation)
export function mapStoreToDbStore(store: Omit<Store, 'id' | 'lastUpdated' | 'certifications'>): Omit<DbStore, 'id' | 'last_updated' | 'created_at'> {
  return {
    name: store.name,
    location: store.location,
    region: store.region,
    city: store.city,
    safety_rating: store.safetyRating,
    making_charges: store.makingCharges,
    specialties: store.specialties,
    is_verified: store.isVerified,
    review_count: store.reviewCount,
    position: store.position
  };
}

// Map from certification to database certification
export function mapCertificationToDbCertification(
  storeId: string, 
  certification: Omit<Certification, 'id'>
): Omit<DbStoreCertification, 'id' | 'created_at'> {
  return {
    store_id: storeId,
    type: certification.type,
    number: certification.number,
    issued_date: certification.issuedDate,
    valid_until: certification.validUntil,
    verified_on: certification.verifiedOn
  };
}
