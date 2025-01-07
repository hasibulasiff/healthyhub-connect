import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, UserProfile } from './auth/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error fetching session:', error);
        setError(error);
        toast({
          title: 'Authentication Error',
          description: error.message,
          variant: 'destructive',
        });
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch user profile and role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast({
            title: 'Profile Error',
            description: profileError.message,
            variant: 'destructive',
          });
        } else {
          // Ensure all UserProfile properties are present
          const fullProfile: UserProfile = {
            id: profileData.id,
            username: profileData.username || null,
            avatar_url: profileData.avatar_url || null,
            created_at: profileData.created_at || new Date().toISOString(),
            role: profileData.role || 'user',
            full_name: profileData.full_name || null,
            phone: profileData.phone || null,
            bio: profileData.bio || null,
            email_verified: profileData.email_verified || false,
            verification_token: profileData.verification_token || null,
            social_provider: profileData.social_provider || null,
            social_id: profileData.social_id || null,
            active_role: profileData.active_role || profileData.role || 'user',
            last_search: profileData.last_search || null,
            theme_preference: profileData.theme_preference || 'light',
            pagination_state: profileData.pagination_state || null,
            last_session: profileData.last_session || null
          };
          
          setProfile(fullProfile);
          setRole(fullProfile.active_role);
        }
      } else {
        setProfile(null);
        setRole(null);
      }

      // Handle specific auth events
      switch (event) {
        case 'SIGNED_IN':
          toast({
            title: 'Signed in successfully',
            description: 'Welcome back!',
          });
          navigate('/dashboard');
          break;
        case 'SIGNED_OUT':
          toast({
            title: 'Signed out successfully',
            description: 'See you soon!',
          });
          navigate('/');
          break;
        case 'USER_UPDATED':
          toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
          });
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error signing out',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({
        title: "Password reset email sent",
        description: "Check your email for the reset link",
      });
    } catch (error) {
      console.error('Error sending password reset:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      toast({
        title: "Password updated",
        description: "Your password has been successfully reset",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reset password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });
      if (error) throw error;
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error verifying email:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify email",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    error,
    signOut,
    role,
    setRole,
    sendPasswordReset,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};