import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Lock, Palette } from "lucide-react";
import { NotificationPreferences } from "@/components/notifications/NotificationPreferences";

interface PrivacySettings {
  profile_visible: boolean;
  activity_visible: boolean;
}

const Settings = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [theme, setTheme] = useState(profile?.theme_preference || 'light');
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profile_visible: true,
    activity_visible: true,
  });

  const handleThemeChange = async (newTheme: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ theme_preference: newTheme })
        .eq('id', user?.id);

      if (error) throw error;

      setTheme(newTheme);
      toast({
        title: "Theme updated",
        description: "Your theme preference has been saved.",
      });
    } catch (error) {
      console.error('Error updating theme:', error);
      toast({
        title: "Error",
        description: "Failed to update theme preference.",
        variant: "destructive",
      });
    }
  };

  const handlePrivacyChange = async (key: keyof PrivacySettings, value: boolean) => {
    const newSettings = { ...privacySettings, [key]: value };
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ privacy_settings: newSettings })
        .eq('id', user?.id);

      if (error) throw error;

      setPrivacySettings(newSettings);
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been saved.",
      });
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      toast({
        title: "Error",
        description: "Failed to update privacy settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="theme">
            <Palette className="h-4 w-4 mr-2" />
            Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <NotificationPreferences />
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to other users
                  </p>
                </div>
                <Switch
                  checked={privacySettings.profile_visible}
                  onCheckedChange={(checked) => handlePrivacyChange('profile_visible', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Activity History</h4>
                  <p className="text-sm text-muted-foreground">
                    Show your activity history on your profile
                  </p>
                </div>
                <Switch
                  checked={privacySettings.activity_visible}
                  onCheckedChange={(checked) => handlePrivacyChange('activity_visible', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('light')}
                >
                  Light Mode
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;