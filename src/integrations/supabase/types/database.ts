export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface SearchState {
  [key: string]: string | undefined;
  query?: string;
  location?: string;
  sortBy?: string;
}

export interface Database {
  public: {
    Tables: {
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
          created_at: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          last_search: Json | null
          pagination_state: Json | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
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
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          last_search?: Json | null
          pagination_state?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
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
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          last_search?: Json | null
          pagination_state?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
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
