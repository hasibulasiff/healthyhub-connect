import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { updateNotificationPreferences } from "@/services/notificationService";

interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
}

const defaultPreferences: NotificationPreferences = {
  email_notifications: true,
  push_notifications: true,
  marketing_emails: false,
};

export const NotificationPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('notification_preferences')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching preferences:', error);
        return;
      }

      if (data?.notification_preferences) {
        // Ensure the data matches our expected structure
        const fetchedPrefs = data.notification_preferences as NotificationPreferences;
        setPreferences({
          email_notifications: Boolean(fetchedPrefs.email_notifications),
          push_notifications: Boolean(fetchedPrefs.push_notifications),
          marketing_emails: Boolean(fetchedPrefs.marketing_emails),
        });
      }
    };

    fetchPreferences();
  }, [user]);

  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean) => {
    if (!user) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    try {
      await updateNotificationPreferences(user.id, newPreferences);
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={preferences.email_notifications}
            onCheckedChange={(checked) =>
              handlePreferenceChange('email_notifications', checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Receive notifications in your browser
            </p>
          </div>
          <Switch
            checked={preferences.push_notifications}
            onCheckedChange={(checked) =>
              handlePreferenceChange('push_notifications', checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Marketing Emails</h4>
            <p className="text-sm text-muted-foreground">
              Receive updates about new features and promotions
            </p>
          </div>
          <Switch
            checked={preferences.marketing_emails}
            onCheckedChange={(checked) =>
              handlePreferenceChange('marketing_emails', checked)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};