import { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthContextType, UserProfile, Provider } from "./auth/types";
import { authReducer } from "./auth/authReducer";
import { initialAuthState } from "./auth/authState";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

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
            const userProfile: UserProfile = {
              ...profileData,
              last_session: profileData.last_session ? JSON.parse(profileData.last_session as string) : null
            };
            dispatch({ type: "SET_PROFILE", payload: userProfile });
            dispatch({ type: "SET_ROLE", payload: userProfile.active_role });
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
            const userProfile: UserProfile = {
              ...profileData,
              last_session: profileData.last_session ? JSON.parse(profileData.last_session as string) : null
            };
            dispatch({ type: "SET_PROFILE", payload: userProfile });
            dispatch({ type: "SET_ROLE", payload: userProfile.active_role });
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

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const switchRole = async (newRole: string) => {
    if (!state.user?.id) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active_role: newRole })
        .eq('id', state.user.id);

      if (error) throw error;
      dispatch({ type: "SET_ROLE", payload: newRole });
    } catch (error) {
      console.error('Role switch error:', error);
      toast({
        title: "Error",
        description: "Failed to switch role",
        variant: "destructive",
      });
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Error",
        description: "Failed to sign in",
        variant: "destructive",
      });
    }
  };

  const sendVerificationEmail = async () => {
    // Implementation
  };

  const verifyEmail = async (token: string) => {
    // Implementation
  };

  const sendPasswordReset = async (email: string) => {
    // Implementation
  };

  const resetPassword = async (token: string, newPassword: string) => {
    // Implementation
  };

  const value: AuthContextType = {
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    currentRole: state.currentRole,
    isOwner: state.profile?.role === 'owner',
    isTrainer: state.profile?.role === 'trainer',
    isAdmin: state.profile?.role === 'admin',
    signOut,
    switchRole,
    signInWithProvider,
    sendVerificationEmail,
    verifyEmail,
    sendPasswordReset,
    resetPassword,
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