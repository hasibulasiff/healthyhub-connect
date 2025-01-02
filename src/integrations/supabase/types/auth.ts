import { User } from "@supabase/supabase-js";
import { Json } from "./database";

export type Provider = 'google' | 'facebook' | 'twitter' | 'github' | 'discord' | 'twitch';

export type UserRole = 'user' | 'owner' | 'trainer' | 'admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email_verified?: boolean;
  phone?: string;
  bio?: string;
  active_role?: string;
  social_provider?: string;
  social_id?: string;
  verification_token?: string;
  created_at?: string;
  last_search?: Json;
  theme_preference?: string;
  pagination_state?: Json;
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