import { User, Provider } from "@supabase/supabase-js";

export type UserRole = 'user' | 'owner' | 'trainer' | 'admin';

export type UserProfile = {
  id: string;
  role: UserRole;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email_verified?: boolean;
  phone?: string;
  bio?: string;
  current_role?: string;
  social_provider?: string;
  social_id?: string;
  verification_token?: string;
};

export type AuthContextType = {
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
};