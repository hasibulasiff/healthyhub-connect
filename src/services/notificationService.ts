import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const subscribeToNotifications = (userId: string, onNotification: (notification: any) => void) => {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onNotification(payload.new);
        toast({
          title: payload.new.title,
          description: payload.new.message,
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const updateNotificationPreferences = async (userId: string, preferences: any) => {
  const { error } = await supabase
    .from('profiles')
    .update({ notification_preferences: preferences })
    .eq('id', userId);

  if (error) throw error;
};

export const sendNotification = async (notification: {
  user_id: string;
  title: string;
  message: string;
  type: string;
  related_id?: string;
  related_type?: string;
}) => {
  const { error } = await supabase
    .from('notifications')
    .insert([notification]);

  if (error) throw error;
};