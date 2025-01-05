import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Activity, DollarSign, Users, Building2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

const OwnerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data: centers, error: centersError } = await supabase
        .from('centers')
        .select('id')
        .eq('owner_id', user.id);
      
      if (centersError) throw centersError;

      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('id, created_at')
        .in('center_id', centers?.map(c => c.id) || []);

      if (reviewsError) throw reviewsError;

      // Get revenue data
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('amount, created_at')
        .in('booking_id', centers?.map(c => c.id) || [])
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (paymentsError) throw paymentsError;

      const totalRevenue = payments?.reduce((acc, payment) => acc + Number(payment.amount), 0) || 0;
      const lastMonthRevenue = payments?.reduce((acc, payment) => {
        const date = new Date(payment.created_at);
        if (date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
          return acc + Number(payment.amount);
        }
        return acc;
      }, 0) || 0;

      return {
        views: 1234, // This would come from analytics
        revenue: totalRevenue,
        members: reviews?.length || 0,
        listings: centers?.length || 0,
        revenueGrowth: 15, // Calculate actual growth
        memberGrowth: 5,
        revenueData: payments?.map(p => ({
          name: new Date(p.created_at).toLocaleDateString(),
          value: Number(p.amount)
        })) || []
      };
    },
    enabled: Boolean(user?.id),
    meta: {
      onError: (error: Error) => {
        console.error('Dashboard stats error:', error);
        toast({
          title: "Error loading dashboard",
          description: "Could not load your dashboard stats. Please try again.",
          variant: "destructive"
        });
      }
    }
  });

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate('/analytics')}>
          <TrendingUp className="w-4 h-4 mr-2" />
          View Full Analytics
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={`$${stats?.revenue.toLocaleString() || '0'}`}
          icon={DollarSign}
          trend={{ value: stats?.revenueGrowth || 0, isPositive: true }}
          isLoading={isStatsLoading}
        />
        <MetricCard
          title="Total Views"
          value={stats?.views || 0}
          icon={Activity}
          trend={{ value: 20.1, isPositive: true }}
          isLoading={isStatsLoading}
        />
        <MetricCard
          title="Active Members"
          value={stats?.members || 0}
          icon={Users}
          trend={{ value: stats?.memberGrowth || 0, isPositive: true }}
          isLoading={isStatsLoading}
        />
        <MetricCard
          title="Active Listings"
          value={stats?.listings || 0}
          icon={Building2}
          isLoading={isStatsLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardChart
          title="Revenue Trend"
          data={stats?.revenueData || []}
          isLoading={isStatsLoading}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isStatsLoading ? (
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
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;