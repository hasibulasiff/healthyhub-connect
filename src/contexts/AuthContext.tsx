import { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthContextType, UserProfile } from "./auth/types";
import { authReducer } from "./auth/authReducer";
import { initialAuthState } from "./auth/authState";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          dispatch({ type: "SET_USER", payload: session.user });
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profileData) {
            dispatch({ type: "SET_PROFILE", payload: profileData });
            dispatch({ type: "SET_ROLE", payload: profileData.active_role });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: "SET_ERROR", payload: error as Error });
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication",
          variant: "destructive",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          dispatch({ type: "SET_USER", payload: session.user });
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
            toast({
              title: "Error",
              description: "Failed to fetch user profile",
              variant: "destructive",
            });
          } else if (profileData) {
            dispatch({ type: "SET_PROFILE", payload: profileData });
            dispatch({ type: "SET_ROLE", payload: profileData.active_role });
          }
        } else {
          dispatch({ type: "RESET_STATE" });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    currentRole: state.currentRole,
    isOwner: state.profile?.role === 'owner',
    isTrainer: state.profile?.role === 'trainer',
    isAdmin: state.profile?.role === 'admin',
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Retry
          </button>
        </div>
      }
    >
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </ErrorBoundary>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};