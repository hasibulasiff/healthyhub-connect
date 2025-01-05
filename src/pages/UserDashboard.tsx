import { useQuery } from "@tanstack/react-query";
import { Calendar, CreditCard, Star, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['user-dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Fetch user's memberships
      const { data: memberships } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      // Fetch upcoming bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .gte('booking_date', new Date().toISOString())
        .order('booking_date', { ascending: true })
        .limit(5);

      // Fetch user's reviews
      const { data: reviews } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id);

      // Fetch achievements
      const { data: achievements } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id);

      return {
        memberships: memberships?.length || 0,
        upcomingClasses: bookings?.length || 0,
        reviews: reviews?.length || 0,
        achievements: achievements?.length || 0,
        recentBookings: bookings || [],
      };
    },
    enabled: !!user?.id
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">My Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Memberships"
          value={stats?.memberships || 0}
          icon={CreditCard}
          isLoading={isLoading}
        />
        <MetricCard
          title="Upcoming Classes"
          value={stats?.upcomingClasses || 0}
          icon={Calendar}
          description="This week"
          isLoading={isLoading}
        />
        <MetricCard
          title="Reviews Given"
          value={stats?.reviews || 0}
          icon={Star}
          isLoading={isLoading}
        />
        <MetricCard
          title="Achievements"
          value={stats?.achievements || 0}
          icon={Award}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Classes</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/bookings')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : stats?.recentBookings.length ? (
              <div className="space-y-4">
                {stats.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.booking_date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming classes</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            ) : stats?.memberships ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You have {stats.memberships} active membership{stats.memberships !== 1 ? 's' : ''}
                </p>
                <Button
                  className="w-full"
                  onClick={() => navigate('/memberships')}
                >
                  Manage Memberships
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">No active memberships</p>
                <Button
                  className="w-full"
                  onClick={() => navigate('/memberships')}
                >
                  Browse Memberships
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;