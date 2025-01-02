import { createContext, useContext, useEffect, useState } from "react";
import { User, Provider } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type UserProfile = {
  id: string;
  role: 'user' | 'owner' | 'trainer' | 'admin';
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email_verified?: boolean;
  phone?: string;
  bio?: string;
  current_role?: string;
};

type AuthContextType = {
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentRole, setCurrentRole] = useState<string | null>(
    localStorage.getItem('currentRole')
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

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
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendVerificationEmail = async () => {
    if (!user?.email) return;

    const token = crypto.randomUUID();
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ verification_token: token })
      .eq('id', user.id);

    if (updateError) throw updateError;

    const { error } = await supabase.functions.invoke('send-verification-email', {
      body: { email: user.email, token },
    });

    if (error) throw error;

    toast({
      title: "Verification email sent",
      description: "Please check your email to verify your account.",
    });
  };

  const verifyEmail = async (token: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ email_verified: true, verification_token: null })
      .eq('verification_token', token)
      .select()
      .single();

    if (error) throw error;

    setProfile(data);
    toast({
      title: "Email verified",
      description: "Your email has been successfully verified.",
    });
  };

  const sendPasswordReset = async (email: string) => {
    const token = crypto.randomUUID();
    const { error } = await supabase.functions.invoke('send-password-reset', {
      body: { email, token },
    });

    if (error) throw error;

    toast({
      title: "Reset email sent",
      description: "Please check your email to reset your password.",
    });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    toast({
      title: "Password updated",
      description: "Your password has been successfully reset.",
    });
  };

  const switchRole = async (newRole: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ current_role: newRole })
        .eq('id', user.id);

      if (error) throw error;

      setCurrentRole(newRole);
      toast({
        title: "Role switched",
        description: `You are now in ${newRole} mode`,
      });

      navigate(newRole === 'owner' ? '/dashboard' : '/user/dashboard');
    } catch (error) {
      console.error('Error switching role:', error);
      toast({
        title: "Error",
        description: "Failed to switch role",
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
