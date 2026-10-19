export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      gold_prices: {
        Row: {
          change_percentage: number | null
          currency: string
          id: string
          price: number
          purity: string
          source: string | null
          timestamp: string
        }
        Insert: {
          change_percentage?: number | null
          currency?: string
          id?: string
          price: number
          purity: string
          source?: string | null
          timestamp?: string
        }
        Update: {
          change_percentage?: number | null
          currency?: string
          id?: string
          price?: number
          purity?: string
          source?: string | null
          timestamp?: string
        }
        Relationships: []
      }
      store_certifications: {
        Row: {
          created_at: string
          id: string
          issued_date: string
          number: string
          store_id: string
          type: string
          valid_until: string
          verified_on: string
        }
        Insert: {
          created_at?: string
          id?: string
          issued_date: string
          number: string
          store_id: string
          type: string
          valid_until: string
          verified_on: string
        }
        Update: {
          created_at?: string
          id?: string
          issued_date?: string
          number?: string
          store_id?: string
          type?: string
          valid_until?: string
          verified_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_certifications_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_registrations: {
        Row: {
          address: string
          city: string
          cover_image_url: string | null
          created_at: string
          description: string
          email: string
          established_year: string | null
          facebook_url: string | null
          gstin: string
          id: string
          instagram_handle: string | null
          license_url: string | null
          linkedin_url: string | null
          logo_url: string | null
          owner_name: string
          phone: string
          pincode: string
          registration_cert_url: string | null
          state: string
          status: string
          store_name: string
          tagline: string | null
          terms_agreed: boolean
          twitter_handle: string | null
          website: string | null
          whatsapp: string | null
          youtube_url: string | null
        }
        Insert: {
          address: string
          city: string
          cover_image_url?: string | null
          created_at?: string
          description: string
          email: string
          established_year?: string | null
          facebook_url?: string | null
          gstin: string
          id?: string
          instagram_handle?: string | null
          license_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          owner_name: string
          phone: string
          pincode: string
          registration_cert_url?: string | null
          state: string
          status?: string
          store_name: string
          tagline?: string | null
          terms_agreed: boolean
          twitter_handle?: string | null
          website?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Update: {
          address?: string
          city?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string
          email?: string
          established_year?: string | null
          facebook_url?: string | null
          gstin?: string
          id?: string
          instagram_handle?: string | null
          license_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          owner_name?: string
          phone?: string
          pincode?: string
          registration_cert_url?: string | null
          state?: string
          status?: string
          store_name?: string
          tagline?: string | null
          terms_agreed?: boolean
          twitter_handle?: string | null
          website?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      stores: {
        Row: {
          city: string
          created_at: string
          id: string
          is_verified: boolean
          last_updated: string
          location: string
          making_charges: Json
          name: string
          position: Json
          region: string
          review_count: number
          safety_rating: number
          specialties: string[]
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          is_verified?: boolean
          last_updated?: string
          location: string
          making_charges: Json
          name: string
          position: Json
          region: string
          review_count?: number
          safety_rating: number
          specialties: string[]
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_verified?: boolean
          last_updated?: string
          location?: string
          making_charges?: Json
          name?: string
          position?: Json
          region?: string
          review_count?: number
          safety_rating?: number
          specialties?: string[]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
