import { supabase } from "@/integrations/supabase/client";
import { Notification } from "@/types/notification";

export const subscribeToNotifications = (userId: string, callback: (notification: Notification) => void) => {
  const subscription = supabase
    .channel('public:notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        callback(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

export const updateNotificationPreferences = async (userId: string, preferences: any) => {
  const { error } = await supabase
    .from('profiles')
    .update({ notification_preferences: preferences })
    .eq('id', userId);

  if (error) throw error;
};

export const createNotification = async (notification: {
  user_id: string;
  title: string;
  message: string;
  type: string;
  related_id?: string;
  related_type?: string;
}) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      ...notification,
      read: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};