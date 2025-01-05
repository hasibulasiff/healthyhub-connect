import { User } from "@supabase/supabase-js";
import { UserProfile } from "./types";
import { AuthState } from "./authState";

type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_PROFILE"; payload: UserProfile | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null }
  | { type: "SET_ROLE"; payload: string | null }
  | { type: "RESET_STATE" };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_ROLE":
      return { ...state, currentRole: action.payload };
    case "RESET_STATE":
      return { ...state, user: null, profile: null, loading: false, error: null };
    default:
      return state;
  }
};