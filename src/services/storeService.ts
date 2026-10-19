
export type CertificationType = 
  | 'BIS Hallmark' 
  | 'GIA' 
  | 'IGI' 
  | 'SGL' 
  | 'Platinum Guild' 
  | 'Lab-Certified Gemstones' 
  | 'ISO' 
  | 'BIS';

export interface Certification {
  type: CertificationType;
  number: string;
  issuedDate: string;
  validUntil: string;
  verifiedOn: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  region: string;
  city: string;
  safetyRating: number;
  makingCharges: {
    gold: number;
    silver?: number;
    diamond?: number;
  };
  specialties: string[];
  isVerified: boolean;
  reviewCount: number;
  position: {
    lat: number;
    lng: number;
  };
  lastUpdated: string;
  certifications?: Certification[];
}

// Mock data service for development until we have database tables
export const storeService = {
  getStores: async (): Promise<Store[]> => {
    return mockStores;
  },
  
  getStoreById: async (id: string): Promise<Store | null> => {
    return mockStores.find(store => store.id === id) || null;
  },
  
  getCertifiedStores: async (): Promise<Store[]> => {
    return mockStores.filter(store => store.certifications && store.certifications.length > 0);
  },
  
  filterStores: async (filters: {
    region?: string;
    city?: string;
    specialties?: string[];
    minSafetyRating?: number;
    isVerified?: boolean;
    certifications?: CertificationType[];
  }): Promise<Store[]> => {
    let filteredStores = [...mockStores];
    
    if (filters.region) {
      filteredStores = filteredStores.filter(store => store.region === filters.region);
    }
    
    if (filters.city) {
      filteredStores = filteredStores.filter(store => store.city === filters.city);
    }
    
    if (filters.minSafetyRating !== undefined) {
      filteredStores = filteredStores.filter(store => store.safetyRating >= filters.minSafetyRating);
    }
    
    if (filters.isVerified) {
      filteredStores = filteredStores.filter(store => store.isVerified);
    }
    
    if (filters.specialties && filters.specialties.length > 0) {
      filteredStores = filteredStores.filter(store => 
        filters.specialties!.some(specialty => 
          store.specialties.includes(specialty)
        )
      );
    }
    
    if (filters.certifications && filters.certifications.length > 0) {
      filteredStores = filteredStores.filter(store => {
        if (!store.certifications) return false;
        
        return filters.certifications!.some(certType => 
          store.certifications!.some(cert => cert.type === certType)
        );
      });
    }
    
    return filteredStores;
  },
  
  getCertificationTypes: async (): Promise<CertificationType[]> => {
    return [
      'BIS Hallmark',
      'GIA',
      'IGI',
      'SGL',
      'Platinum Guild',
      'Lab-Certified Gemstones',
      'ISO',
      'BIS'
    ];
  }
};

// Mock data
const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Golden Heritage Jewelers',
    location: 'South Mumbai',
    region: 'Maharashtra',
    city: 'Mumbai',
    safetyRating: 4.8,
    makingCharges: {
      gold: 8.5,
      silver: 12,
      diamond: 20
    },
    specialties: ['Traditional', 'Temple Jewelry', 'Diamond Setting'],
    isVerified: true,
    reviewCount: 248,
    position: {
      lat: 18.9322,
      lng: 72.8264
    },
    lastUpdated: '2025-02-15T10:30:00Z',
    certifications: [
      {
        type: 'BIS Hallmark',
        number: 'HM-12345',
        issuedDate: '2024-01-15',
        validUntil: '2026-01-15',
        verifiedOn: '2024-01-20'
      },
      {
        type: 'IGI',
        number: 'IGI-6789',
        issuedDate: '2024-02-20',
        validUntil: '2026-02-20',
        verifiedOn: '2024-02-25'
      }
    ]
  },
  {
    id: 'store-2',
    name: 'Royal Diamond Emporium',
    location: 'Chandni Chowk',
    region: 'Delhi',
    city: 'New Delhi',
    safetyRating: 4.5,
    makingCharges: {
      gold: 10,
      diamond: 25
    },
    specialties: ['Diamond Jewelry', 'Bridal Sets', 'Custom Designs'],
    isVerified: true,
    reviewCount: 186,
    position: {
      lat: 28.6539,
      lng: 77.2283
    },
    lastUpdated: '2025-03-01T14:45:00Z',
    certifications: [
      {
        type: 'GIA',
        number: 'GIA-5432',
        issuedDate: '2023-12-10',
        validUntil: '2025-12-10',
        verifiedOn: '2023-12-15'
      }
    ]
  },
  {
    id: 'store-3',
    name: 'Elegant Gold Works',
    location: 'T. Nagar',
    region: 'Tamil Nadu',
    city: 'Chennai',
    safetyRating: 4.9,
    makingCharges: {
      gold: 7.5,
      silver: 15
    },
    specialties: ['South Indian Traditional', 'Temple Jewelry'],
    isVerified: true,
    reviewCount: 310,
    position: {
      lat: 13.0410,
      lng: 80.2357
    },
    lastUpdated: '2025-01-25T09:15:00Z',
    certifications: [
      {
        type: 'BIS Hallmark',
        number: 'HM-67890',
        issuedDate: '2024-01-05',
        validUntil: '2026-01-05',
        verifiedOn: '2024-01-10'
      },
      {
        type: 'SGL',
        number: 'SGL-1234',
        issuedDate: '2024-02-10',
        validUntil: '2026-02-10',
        verifiedOn: '2024-02-15'
      }
    ]
  }
];
