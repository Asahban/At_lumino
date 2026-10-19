
import { Store, CertificationType, Certification } from '@/services/storeService';

export interface IStoreService {
  getStores(): Promise<Store[]>;
  getStoreById(id: string): Promise<Store | null>;
  filterStores(filters: {
    region?: string;
    city?: string;
    specialties?: string[];
    minSafetyRating?: number;
    isVerified?: boolean;
    certifications?: CertificationType[];
  }): Promise<Store[]>;
  getCertifiedStores(): Promise<Store[]>;
  getCertificationTypes(): Promise<CertificationType[]>;
  createStore(store: Omit<Store, 'id' | 'lastUpdated' | 'certifications'>): Promise<Store>;
  addCertification(storeId: string, certification: Omit<Certification, 'id'>): Promise<void>;
  uploadStoreImage(storeId: string, file: File): Promise<string>;
}

export abstract class BaseStoreService implements IStoreService {
  abstract getStores(): Promise<Store[]>;
  abstract getStoreById(id: string): Promise<Store | null>;
  abstract filterStores(filters: {
    region?: string;
    city?: string;
    specialties?: string[];
    minSafetyRating?: number;
    isVerified?: boolean;
    certifications?: CertificationType[];
  }): Promise<Store[]>;
  abstract getCertifiedStores(): Promise<Store[]>;
  abstract getCertificationTypes(): Promise<CertificationType[]>;
  abstract createStore(store: Omit<Store, 'id' | 'lastUpdated' | 'certifications'>): Promise<Store>;
  abstract addCertification(storeId: string, certification: Omit<Certification, 'id'>): Promise<void>;
  abstract uploadStoreImage(storeId: string, file: File): Promise<string>;
}
