import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as CalendarIcon, Users, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

const TrainerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());

  const { data: stats, isLoading } = useQuery({
    queryKey: ['trainer-dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      // Fetch trainer's schedule
      const { data: schedule } = await supabase
        .from('schedules')
        .select('*')
        .eq('trainer_id', user.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(5);

      // Fetch trainer profile data
      const { data: trainerProfile } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Calculate metrics
      const totalSessions = schedule?.length || 0;
      const averageRating = 4.5; // This would come from reviews

      return {
        activeClients: trainerProfile?.total_clients || 0,
        upcomingSessions: totalSessions,
        rating: averageRating,
        revenueGrowth: 10,
        schedule: schedule || [],
        trainerProfile: trainerProfile || null
      };
    },
    enabled: !!user?.id,
    meta: {
      onError: (error: Error) => {
        console.error('Trainer dashboard error:', error);
        toast({
          title: "Error loading dashboard",
          description: "Could not load your dashboard stats. Please try again.",
          variant: "destructive"
        });
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Trainer Dashboard</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Active Clients"
              value={stats?.activeClients || 0}
              icon={Users}
              isLoading={isLoading}
            />
            <MetricCard
              title="Upcoming Sessions"
              value={stats?.upcomingSessions || 0}
              icon={CalendarIcon}
              isLoading={isLoading}
            />
            <MetricCard
              title="Average Rating"
              value={stats?.rating || 0}
              icon={Star}
              isLoading={isLoading}
            />
            <MetricCard
              title="Revenue Growth"
              value={`${stats?.revenueGrowth || 0}%`}
              icon={TrendingUp}
              isLoading={isLoading}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : stats?.schedule.length ? (
                <div className="space-y-4">
                  {stats.schedule.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.start_time).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sessions scheduled</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardChart
                title="Sessions Overview"
                data={[
                  { name: 'Mon', value: 4 },
                  { name: 'Tue', value: 3 },
                  { name: 'Wed', value: 5 },
                  { name: 'Thu', value: 2 },
                  { name: 'Fri', value: 4 },
                  { name: 'Sat', value: 6 },
                  { name: 'Sun', value: 3 },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;