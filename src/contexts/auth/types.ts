import { User } from "@supabase/supabase-js";
import { Json } from "@/integrations/supabase/types/database";

export type Provider = 'google' | 'facebook' | 'twitter' | 'github' | 'discord' | 'twitch';

export interface UserProfile {
  id: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  role?: 'user' | 'owner' | 'trainer' | 'admin';
  full_name?: string;
  phone?: string;
  bio?: string;
  email_verified?: boolean;
  verification_token?: string;
  social_provider?: string;
  social_id?: string;
  active_role?: string;
  last_search?: Json;
  theme_preference?: string;
  pagination_state?: Json;
  last_session?: {
    path: string;
    timestamp: string;
  };
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  currentRole: string | null;
  switchRole: (newRole: string) => Promise<void>;
  isOwner: boolean;
  isTrainer: boolean;
  isAdmin: boolean;
  signInWithProvider: (provider: Provider) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}