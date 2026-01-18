export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      business_owners: {
        Row: {
          business_id: string
          created_at: string
          id: string
          is_primary: boolean
          status: Database["public"]["Enums"]["ownership_status"]
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          is_primary?: boolean
          status?: Database["public"]["Enums"]["ownership_status"]
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          status?: Database["public"]["Enums"]["ownership_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_owners_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_owners_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "public_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_subscriptions: {
        Row: {
          business_id: string
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "public_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: Json | null
          average_rating: number | null
          category_id: string
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          description: Json | null
          email: string | null
          hours: Json | null
          id: string
          is_featured: boolean
          logo_url: string | null
          name: Json
          phone: string | null
          review_count: number | null
          show_email: boolean
          show_phone: boolean
          show_whatsapp: boolean
          slug: string
          status: Database["public"]["Enums"]["business_status"]
          updated_at: string
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: Json | null
          average_rating?: number | null
          category_id: string
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          email?: string | null
          hours?: Json | null
          id?: string
          is_featured?: boolean
          logo_url?: string | null
          name: Json
          phone?: string | null
          review_count?: number | null
          show_email?: boolean
          show_phone?: boolean
          show_whatsapp?: boolean
          slug: string
          status?: Database["public"]["Enums"]["business_status"]
          updated_at?: string
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: Json | null
          average_rating?: number | null
          category_id?: string
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          email?: string | null
          hours?: Json | null
          id?: string
          is_featured?: boolean
          logo_url?: string | null
          name?: Json
          phone?: string | null
          review_count?: number | null
          show_email?: boolean
          show_phone?: boolean
          show_whatsapp?: boolean
          slug?: string
          status?: Database["public"]["Enums"]["business_status"]
          updated_at?: string
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: Json | null
          icon: string | null
          id: string
          name: Json
          parent_id: string | null
          slug: string
          sort_order: number
          type: Database["public"]["Enums"]["category_type"]
        }
        Insert: {
          created_at?: string
          description?: Json | null
          icon?: string | null
          id?: string
          name: Json
          parent_id?: string | null
          slug: string
          sort_order?: number
          type?: Database["public"]["Enums"]["category_type"]
        }
        Update: {
          created_at?: string
          description?: Json | null
          icon?: string | null
          id?: string
          name?: Json
          parent_id?: string | null
          slug?: string
          sort_order?: number
          type?: Database["public"]["Enums"]["category_type"]
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          business_id: string
          created_at: string
          deal_price: number | null
          deleted_at: string | null
          description: Json | null
          discount_percent: number | null
          ends_at: string
          id: string
          image_url: string | null
          is_active: boolean
          original_price: number | null
          starts_at: string
          title: Json
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          deal_price?: number | null
          deleted_at?: string | null
          description?: Json | null
          discount_percent?: number | null
          ends_at: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          original_price?: number | null
          starts_at?: string
          title: Json
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          deal_price?: number | null
          deleted_at?: string | null
          description?: Json | null
          discount_percent?: number | null
          ends_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          original_price?: number | null
          starts_at?: string
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "public_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          business_id: string | null
          created_at: string
          deleted_at: string | null
          description: Json | null
          ends_at: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          location: Json | null
          starts_at: string
          title: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: Json | null
          starts_at: string
          title: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: Json | null
          starts_at?: string
          title?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "public_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_listings: {
        Row: {
          category_id: string
          condition: Database["public"]["Enums"]["listing_condition"] | null
          created_at: string
          deleted_at: string | null
          description: Json | null
          id: string
          images: string[] | null
          price: number | null
          status: Database["public"]["Enums"]["listing_status"]
          title: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category_id: string
          condition?: Database["public"]["Enums"]["listing_condition"] | null
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          id?: string
          images?: string[] | null
          price?: number | null
          status?: Database["public"]["Enums"]["listing_status"]
          title: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category_id?: string
          condition?: Database["public"]["Enums"]["listing_condition"] | null
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          id?: string
          images?: string[] | null
          price?: number | null
          status?: Database["public"]["Enums"]["listing_status"]
          title?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          entity_id: string
          entity_type: string
          id: string
          reason: string
          reporter_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: Database["public"]["Enums"]["report_status"]
        }
        Insert: {
          created_at?: string
          details?: string | null
          entity_id: string
          entity_type: string
          id?: string
          reason: string
          reporter_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Update: {
          created_at?: string
          details?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          reason?: string
          reporter_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Relationships: []
      }
      review_responses: {
        Row: {
          body: string
          created_at: string
          id: string
          review_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          review_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          review_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_responses_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: true
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string | null
          business_id: string
          created_at: string
          deleted_at: string | null
          id: string
          rating: number
          status: Database["public"]["Enums"]["review_status"]
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body?: string | null
          business_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          rating: number
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body?: string | null
          business_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          rating?: number
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "public_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_price_map: {
        Row: {
          created_at: string
          id: string
          interval: string
          stripe_price_id: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          created_at?: string
          id?: string
          interval?: string
          stripe_price_id: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          created_at?: string
          id?: string
          interval?: string
          stripe_price_id?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      business_entitlements: {
        Row: {
          business_id: string | null
          can_post_deals: boolean | null
          can_respond_reviews: boolean | null
          is_featured: boolean | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          tier: Database["public"]["Enums"]["subscription_tier"] | null
        }
        Insert: {
          business_id?: string | null
          can_post_deals?: never
          can_respond_reviews?: never
          is_featured?: never
          status?: Database["public"]["Enums"]["subscription_status"] | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
        }
        Update: {
          business_id?: string | null
          can_post_deals?: never
          can_respond_reviews?: never
          is_featured?: never
          status?: Database["public"]["Enums"]["subscription_status"] | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
        }
        Relationships: [
          {
            foreignKeyName: "business_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "public_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      public_businesses: {
        Row: {
          address: Json | null
          average_rating: number | null
          category_id: string | null
          cover_url: string | null
          created_at: string | null
          description: Json | null
          email: string | null
          hours: Json | null
          id: string | null
          is_featured: boolean | null
          logo_url: string | null
          name: Json | null
          phone: string | null
          review_count: number | null
          slug: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: Json | null
          average_rating?: number | null
          category_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: Json | null
          email?: never
          hours?: Json | null
          id?: string | null
          is_featured?: boolean | null
          logo_url?: string | null
          name?: Json | null
          phone?: never
          review_count?: number | null
          slug?: string | null
          website?: string | null
          whatsapp?: never
        }
        Update: {
          address?: Json | null
          average_rating?: number | null
          category_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: Json | null
          email?: never
          hours?: Json | null
          id?: string | null
          is_featured?: boolean | null
          logo_url?: string | null
          name?: Json | null
          phone?: never
          review_count?: number | null
          slug?: string | null
          website?: string | null
          whatsapp?: never
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      public_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      business_can_respond_to_reviews: {
        Args: { _business_id: string }
        Returns: boolean
      }
      create_business_and_set_owner: {
        Args: {
          p_address_en?: string
          p_address_he?: string
          p_category_id: string
          p_description_en?: string
          p_description_he?: string
          p_email?: string
          p_name_en: string
          p_name_he: string
          p_phone?: string
          p_slug: string
          p_website?: string
          p_whatsapp?: string
        }
        Returns: string
      }
      get_business_owner_count: {
        Args: { _business_id: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      link_stripe_customer: {
        Args: { p_business_id: string; p_stripe_customer_id: string }
        Returns: undefined
      }
      make_translation: {
        Args: { en_text: string; he_text: string }
        Returns: unknown
      }
      owns_business: {
        Args: { _business_id: string; _user_id: string }
        Returns: boolean
      }
      search_businesses: {
        Args: {
          p_category_slug?: string
          p_lang?: string
          p_limit?: number
          p_query: string
        }
        Returns: {
          average_rating: number
          description: string
          id: string
          logo_url: string
          name: string
          review_count: number
          similarity: number
          slug: string
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      soft_delete_business: {
        Args: { p_business_id: string }
        Returns: undefined
      }
      soft_delete_deal: { Args: { p_deal_id: string }; Returns: undefined }
      soft_delete_event: { Args: { p_event_id: string }; Returns: undefined }
      soft_delete_listing: {
        Args: { p_listing_id: string }
        Returns: undefined
      }
      soft_delete_review: { Args: { p_review_id: string }; Returns: undefined }
      sync_stripe_subscription: {
        Args: {
          p_current_period_end: string
          p_current_period_start: string
          p_status: Database["public"]["Enums"]["subscription_status"]
          p_stripe_customer_id: string
          p_stripe_subscription_id: string
          p_tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Returns: undefined
      }
      t: { Args: { lang?: string; val: unknown }; Returns: string }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      business_status:
        | "draft"
        | "pending"
        | "approved"
        | "rejected"
        | "suspended"
      category_type: "business" | "community_help" | "public_service" | "mixed"
      listing_condition: "new" | "like_new" | "good" | "fair"
      listing_status: "active" | "sold" | "expired" | "removed"
      ownership_status: "pending" | "approved" | "rejected"
      report_status: "pending" | "reviewed" | "resolved" | "dismissed"
      review_status: "pending" | "approved" | "rejected" | "hidden"
      subscription_status:
        | "active"
        | "past_due"
        | "canceled"
        | "trialing"
        | "incomplete"
        | "unpaid"
      subscription_tier: "free" | "basic" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      business_status: [
        "draft",
        "pending",
        "approved",
        "rejected",
        "suspended",
      ],
      category_type: ["business", "community_help", "public_service", "mixed"],
      listing_condition: ["new", "like_new", "good", "fair"],
      listing_status: ["active", "sold", "expired", "removed"],
      ownership_status: ["pending", "approved", "rejected"],
      report_status: ["pending", "reviewed", "resolved", "dismissed"],
      review_status: ["pending", "approved", "rejected", "hidden"],
      subscription_status: [
        "active",
        "past_due",
        "canceled",
        "trialing",
        "incomplete",
        "unpaid",
      ],
      subscription_tier: ["free", "basic", "premium"],
    },
  },
} as const
