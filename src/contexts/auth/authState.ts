import { User } from "@supabase/supabase-js";
import { UserProfile } from "./types";

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  currentRole: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  profile: null,
  loading: true,
  error: null,
  currentRole: null,
};