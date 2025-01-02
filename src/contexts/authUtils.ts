import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { UserProfile } from "./types";

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const handleEmailVerification = async (email: string, token: string) => {
  try {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ verification_token: token })
      .eq('email', email);

    if (updateError) throw updateError;

    const { error } = await supabase.functions.invoke('send-verification-email', {
      body: { email, token },
    });

    if (error) throw error;

    toast({
      description: "Verification email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    toast({
      description: "Failed to send verification email.",
      variant: "destructive",
    });
  }
};

export const handlePasswordReset = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const { error } = await supabase.functions.invoke('send-password-reset', {
      body: { email, token },
    });

    if (error) throw error;

    toast({
      description: "Password reset email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error('Error sending password reset:', error);
    toast({
      description: "Failed to send password reset email.",
      variant: "destructive",
    });
  }
};

export const handleRoleSwitch = async (userId: string, newRole: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ current_role: newRole })
      .eq('id', userId);

    if (error) throw error;

    toast({
      description: `Successfully switched to ${newRole} mode`,
    });

    return true;
  } catch (error) {
    console.error('Error switching role:', error);
    toast({
      description: "Failed to switch role",
      variant: "destructive",
    });
    return false;
  }
};