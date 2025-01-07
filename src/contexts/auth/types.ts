import { User } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types/database";

export type Provider = 'google' | 'facebook' | 'twitter' | 'github' | 'discord' | 'twitch';

type ProfilesRow = Database['public']['Tables']['profiles']['Row'];

export interface LastSession {
  timestamp: string;
  activity: string;
  device?: string;
}

export interface UserProfile extends Omit<ProfilesRow, 'last_session'> {
  last_session?: LastSession | null;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  role: string | null;
  setRole: (role: string) => void;
  sendPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}