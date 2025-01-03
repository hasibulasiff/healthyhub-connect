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
      analytics_events: {
        Row: {
          center_id: string | null
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          center_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          center_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_metrics: {
        Row: {
          center_id: string | null
          created_at: string | null
          id: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
        }
        Insert: {
          center_id?: string | null
          created_at?: string | null
          id?: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
        }
        Update: {
          center_id?: string | null
          created_at?: string | null
          id?: string
          metric_type?: string
          metric_value?: number
          period_end?: string
          period_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_metrics_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string | null
          center_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          payment_status: string | null
          price: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          booking_date?: string | null
          center_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          price?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string | null
          center_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          price?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      centers: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location: string | null
          name: string
          owner_id: string | null
          placeholder_image: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          owner_id?: string | null
          placeholder_image?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          owner_id?: string | null
          placeholder_image?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "centers_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          center_id: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          center_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          center_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      form_validation_settings: {
        Row: {
          created_at: string | null
          custom_messages: Json | null
          form_type: string
          id: string
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          custom_messages?: Json | null
          form_type: string
          id?: string
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          custom_messages?: Json | null
          form_type?: string
          id?: string
          validation_rules?: Json | null
        }
        Relationships: []
      }
      membership_analytics: {
        Row: {
          center_id: string | null
          created_at: string | null
          id: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
          plan_id: string | null
        }
        Insert: {
          center_id?: string | null
          created_at?: string | null
          id?: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
          plan_id?: string | null
        }
        Update: {
          center_id?: string | null
          created_at?: string | null
          id?: string
          metric_type?: string
          metric_value?: number
          period_end?: string
          period_start?: string
          plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_analytics_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_analytics_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_plans: {
        Row: {
          center_id: string | null
          created_at: string | null
          description: string | null
          duration_months: number
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          total_revenue: number | null
          total_subscribers: number | null
        }
        Insert: {
          center_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_months: number
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          total_revenue?: number | null
          total_subscribers?: number | null
        }
        Update: {
          center_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_months?: number
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          total_revenue?: number | null
          total_subscribers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_plans_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          center_id: string | null
          created_at: string | null
          end_date: string | null
          id: string
          start_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          center_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          center_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memberships_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          is_read: boolean | null
          sender_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          id: string
          loading_state: string | null
          payment_method_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          loading_state?: string | null
          payment_method_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          loading_state?: string | null
          payment_method_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_role: string | null
          avatar_url: string | null
          bio: string | null
          business_address: string | null
          business_name: string | null
          business_type: string | null
          created_at: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          interests: string[] | null
          last_search: Json | null
          last_session: Json | null
          notification_preferences: Json | null
          pagination_state: Json | null
          payment_details: Json | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          services_offered: string[] | null
          social_id: string | null
          social_provider: string | null
          theme_preference: string | null
          username: string | null
          verification_token: string | null
        }
        Insert: {
          active_role?: string | null
          avatar_url?: string | null
          bio?: string | null
          business_address?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          interests?: string[] | null
          last_search?: Json | null
          last_session?: Json | null
          notification_preferences?: Json | null
          pagination_state?: Json | null
          payment_details?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          services_offered?: string[] | null
          social_id?: string | null
          social_provider?: string | null
          theme_preference?: string | null
          username?: string | null
          verification_token?: string | null
        }
        Update: {
          active_role?: string | null
          avatar_url?: string | null
          bio?: string | null
          business_address?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          interests?: string[] | null
          last_search?: Json | null
          last_session?: Json | null
          notification_preferences?: Json | null
          pagination_state?: Json | null
          payment_details?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          services_offered?: string[] | null
          social_id?: string | null
          social_provider?: string | null
          theme_preference?: string | null
          username?: string | null
          verification_token?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          center_id: string | null
          comment: string | null
          created_at: string
          id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          center_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          center_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          center_id: string | null
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          max_capacity: number | null
          recurrence_pattern: string | null
          recurring: boolean | null
          start_time: string
          title: string
          trainer_id: string | null
        }
        Insert: {
          center_id?: string | null
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          max_capacity?: number | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          start_time: string
          title: string
          trainer_id?: string | null
        }
        Update: {
          center_id?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          max_capacity?: number | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          start_time?: string
          title?: string
          trainer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_profiles: {
        Row: {
          availability: Json | null
          bio: string | null
          certification: string[] | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          specialization: string[] | null
          user_id: string | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          certification?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          specialization?: string[] | null
          user_id?: string | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          certification?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          specialization?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "user" | "owner" | "trainer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
