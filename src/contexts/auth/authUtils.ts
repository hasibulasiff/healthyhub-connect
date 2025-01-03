import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Provider } from "./types";

export const handleRoleSwitch = async (userId: string, newRole: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ active_role: newRole })
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
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
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