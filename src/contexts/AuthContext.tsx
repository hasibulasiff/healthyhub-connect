import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AuthContextType, UserProfile, Provider } from "./auth/types";
import { handleRoleSwitch, handleEmailVerification, handlePasswordReset } from "./auth/authUtils";

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  currentRole: null,
  switchRole: async () => {},
  isOwner: false,
  isTrainer: false,
  isAdmin: false,
  signInWithProvider: async () => {},
  sendVerificationEmail: async () => {},
  verifyEmail: async () => {},
  sendPasswordReset: async () => {},
  resetPassword: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState<string | null>(
    localStorage.getItem('currentRole')
  );
  const navigate = useNavigate();
  const location = useLocation();

  // Persist navigation state
  useEffect(() => {
    if (user && location.pathname !== '/login') {
      const sessionData = {
        path: location.pathname,
        timestamp: new Date().toISOString()
      };
      
      // Update last session in profile
      supabase
        .from('profiles')
        .update({ last_session: sessionData })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error updating session:', error);
        });
    }
  }, [user, location.pathname]);

  // Enhanced session management
  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileData) {
          setProfile(profileData as UserProfile);
          if (profileData.last_session?.path && location.pathname === '/login') {
            navigate(profileData.last_session.path);
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setProfile(profileData as UserProfile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const signInWithProvider = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const switchRole = async (newRole: string) => {
    if (!user) return;
    const success = await handleRoleSwitch(user.id, newRole);
    if (success) {
      setCurrentRole(newRole);
      navigate(newRole === 'owner' ? '/dashboard' : '/user/dashboard');
    }
  };

  const sendVerificationEmail = async () => {
    if (!user?.email) return;
    await handleEmailVerification(user.email, crypto.randomUUID());
  };

  const verifyEmail = async (token: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ email_verified: true, verification_token: null })
        .eq('verification_token', token)
        .select()
        .single();

      if (error) throw error;
      setProfile(data as UserProfile);
      toast({
        description: "Email verified successfully.",
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      toast({
        description: "Failed to verify email.",
        variant: "destructive",
      });
    }
  };

  const sendPasswordReset = async (email: string) => {
    await handlePasswordReset(email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      toast({
        description: "Password reset successful.",
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        description: "Failed to reset password.",
        variant: "destructive",
      });
    }
  };

  const isOwner = profile?.role === 'owner';
  const isTrainer = profile?.role === 'trainer';
  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signOut,
      currentRole,
      switchRole,
      isOwner,
      isTrainer,
      isAdmin,
      signInWithProvider,
      sendVerificationEmail,
      verifyEmail,
      sendPasswordReset,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};