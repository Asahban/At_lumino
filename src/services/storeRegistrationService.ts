
import { supabase } from '@/integrations/supabase/client';
import { typedSupabase } from '@/integrations/supabase/typed-client';
import { v4 as uuidv4 } from 'uuid';

// Define the store registration table structure
interface StoreRegistration {
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
  terms_agreed: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface StoreRegistrationData {
  storeInfo: {
    name: string;
    tagline?: string;
    description: string;
    establishedYear?: string;
    logo: File | null;
    coverImage: File | null;
  };
  contactInfo: {
    ownerName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    website?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  verification: {
    license: File | null;
    gstin: string;
    registrationCert: File | null;
    termsAgreed: boolean;
  };
}

export const storeRegistrationService = {
  async uploadFile(file: File, bucket: string, path: string): Promise<string> {
    if (!file) throw new Error('No file provided');
    
    // Create a unique filename based on timestamp and original name
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${timestamp}-${Math.floor(Math.random() * 1000)}.${fileExtension}`;
    const filePath = `${path}/${uniqueFileName}`;

    // Skip file upload for now and return empty string to bypass RLS issues
    // For a full implementation, proper RLS policies need to be configured in Supabase
    console.log('Skipping file upload due to RLS constraints');
    return '';
    
    /* Commented out upload code that would work with proper RLS policies
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
    */
  },

  async registerStore(data: StoreRegistrationData) {
    try {
      // For now, skip file uploads and proceed with registration
      const logoUrl = '';
      const coverImageUrl = '';
      const licenseUrl = '';
      const registrationCertUrl = '';

      // Insert registration data without requiring file uploads
      const { data: insertedData, error } = await supabase
        .from('store_registrations')
        .insert({
          store_name: data.storeInfo.name,
          tagline: data.storeInfo.tagline,
          description: data.storeInfo.description,
          established_year: data.storeInfo.establishedYear,
          logo_url: logoUrl,
          cover_image_url: coverImageUrl,
          owner_name: data.contactInfo.ownerName,
          email: data.contactInfo.email,
          phone: data.contactInfo.phone,
          whatsapp: data.contactInfo.whatsapp,
          website: data.contactInfo.website,
          address: data.contactInfo.address,
          city: data.contactInfo.city,
          state: data.contactInfo.state,
          pincode: data.contactInfo.pincode,
          facebook_url: data.socialMedia.facebook,
          instagram_handle: data.socialMedia.instagram,
          twitter_handle: data.socialMedia.twitter,
          linkedin_url: data.socialMedia.linkedin,
          youtube_url: data.socialMedia.youtube,
          license_url: licenseUrl,
          gstin: data.verification.gstin,
          registration_cert_url: registrationCertUrl,
          terms_agreed: data.verification.termsAgreed,
          status: 'PENDING'
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return insertedData;
    } catch (err) {
      console.error('Store Registration Error:', err);
      throw err;
    }
  }
};

export default storeRegistrationService;
