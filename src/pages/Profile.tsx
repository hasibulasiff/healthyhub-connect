import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Award, Activity, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserActivity {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  achieved_at: string;
}

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['user-activities', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserActivity[];
    },
    enabled: !!user?.id,
  });

  const { data: achievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ['achievements', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user?.id)
        .order('achieved_at', { ascending: false });

      if (error) throw error;
      return data as Achievement[];
    },
    enabled: !!user?.id,
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>{profile?.username?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{profile?.username}</h1>
              <p className="text-muted-foreground">{profile?.bio || 'No bio added yet'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity History</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievementsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))
            ) : achievements?.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-4">
            {activitiesLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))
            ) : activities?.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <Activity className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">{activity.activity_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <time className="ml-auto text-sm text-muted-foreground">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </time>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;