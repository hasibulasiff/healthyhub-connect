import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar as CalendarIcon, 
  Users, 
  Star, 
  TrendingUp,
  Clock,
  BookOpen,
  MessageSquare,
  Percent,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { cn } from "@/lib/utils";

const TrainerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: stats, isLoading } = useQuery({
    queryKey: ['trainer-dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      // Fetch trainer's schedule
      const { data: schedule, error: scheduleError } = await supabase
        .from('schedules')
        .select('*')
        .eq('trainer_id', user.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(5);

      if (scheduleError) throw scheduleError;

      // Fetch trainer profile data
      const { data: trainerProfile, error: profileError } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      // Calculate active clients (unique clients in the last month)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: uniqueClients, error: clientsError } = await supabase
        .from('schedules')
        .select('DISTINCT user_id')
        .eq('trainer_id', user.id)
        .gte('start_time', thirtyDaysAgo.toISOString());

      if (clientsError) throw clientsError;

      // Fetch client progress data
      const { data: progressData, error: progressError } = await supabase
        .from('client_progress')
        .select('*')
        .eq('trainer_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(10);

      if (progressError) throw progressError;

      // Calculate session completion rate
      const { data: completedSessions, error: completionError } = await supabase
        .from('schedules')
        .select('*')
        .eq('trainer_id', user.id)
        .lt('end_time', new Date().toISOString());

      if (completionError) throw completionError;

      const completionRate = completedSessions 
        ? (completedSessions.length / (schedule?.length || 1)) * 100 
        : 0;

      return {
        activeClients: uniqueClients?.length || 0,
        upcomingSessions: schedule?.length || 0,
        rating: 4.5, // This would come from reviews table in a real implementation
        completionRate,
        schedule: schedule || [],
        trainerProfile: trainerProfile || null,
        progressData: progressData || [],
        revenueGrowth: 10, // This would be calculated from actual payment data
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trainer Dashboard</h1>
        <Button onClick={() => window.print()} className="print:hidden">
          Export Overview
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Clients"
          value={stats?.activeClients || 0}
          icon={Users}
          description="Last 30 days"
          isLoading={isLoading}
        />
        <MetricCard
          title="Session Rate"
          value={`${Math.round(stats?.completionRate || 0)}%`}
          icon={Percent}
          description="Completion rate"
          isLoading={isLoading}
        />
        <MetricCard
          title="Rating"
          value={stats?.rating || 0}
          icon={Star}
          description="Average rating"
          isLoading={isLoading}
        />
        <MetricCard
          title="Revenue Growth"
          value={`${stats?.revenueGrowth || 0}%`}
          icon={DollarSign}
          description="This month"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
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
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.start_time).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sessions scheduled</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Client Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : stats?.progressData.length ? (
                <div className="space-y-4">
                  {stats.progressData.map((progress) => (
                    <div
                      key={progress.id}
                      className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Session Progress</p>
                          <p className="text-sm text-gray-500">
                            {new Date(progress.recorded_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No progress data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Availability Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardChart
                title="Weekly Sessions"
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