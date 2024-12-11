import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, Users, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const OwnerDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch real stats from Supabase
      const { data: centers } = await supabase
        .from('centers')
        .select('id');
      
      const { data: reviews } = await supabase
        .from('reviews')
        .select('id');

      return {
        views: 1234, // This would come from analytics
        revenue: 12345, // This would come from payments
        members: reviews?.length || 0,
        listings: centers?.length || 0
      };
    }
  });

  const StatCard = ({ title, value, icon: Icon, subtitle }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <>
            <div className="text-2xl font-bold">
              {typeof value === 'number' && title.toLowerCase().includes('revenue') 
                ? `$${value.toLocaleString()}`
                : value.toLocaleString()}
            </div>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Views"
          value={stats?.views || 0}
          icon={Activity}
          subtitle="+20.1% from last month"
        />
        <StatCard
          title="Revenue"
          value={stats?.revenue || 0}
          icon={DollarSign}
          subtitle="+15% from last month"
        />
        <StatCard
          title="Active Members"
          value={stats?.members || 0}
          icon={Users}
          subtitle="+5% from last month"
        />
        <StatCard
          title="Active Listings"
          value={stats?.listings || 0}
          icon={Building2}
          subtitle="No change from last month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Latest Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent reviews</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;