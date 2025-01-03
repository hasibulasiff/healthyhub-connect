import { User } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types/database";

export type Provider = 'google' | 'facebook' | 'twitter' | 'github' | 'discord' | 'twitch';

type ProfilesRow = Database['public']['Tables']['profiles']['Row'];

export interface UserProfile extends Omit<ProfilesRow, 'last_session'> {
  last_session?: {
    path: string;
    timestamp: string;
  } | null;
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