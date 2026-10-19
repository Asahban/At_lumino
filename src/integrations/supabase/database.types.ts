
export type DbStore = {
  id: string;
  name: string;
  location: string;
  region: string;
  city: string;
  safety_rating: number;
  making_charges: {
    gold: number;
    silver?: number;
    diamond?: number;
  };
  specialties: string[];
  is_verified: boolean;
  review_count: number;
  position: {
    lat: number;
    lng: number;
  };
  last_updated: string;
  created_at: string;
}

export type DbStoreCertification = {
  id: string;
  store_id: string;
  type: string;
  number: string;
  issued_date: string;
  valid_until: string;
  verified_on: string;
  created_at: string;
}

export type DbGoldPrice = {
  id: string;
  purity: string;
  price: number;
  currency: string;
  timestamp: string;
  change_percentage?: number;
  source?: string;
}

// Define helper types to extend the Database type
export interface DbTables {
  stores: DbStore;
  store_certifications: DbStoreCertification;
  gold_prices: DbGoldPrice;
}
