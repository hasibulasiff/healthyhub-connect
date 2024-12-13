import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const PaymentsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const { data: payments, isLoading, error } = useQuery({
    queryKey: ['payments', user.id],
    queryFn: async () => {
      // This would be replaced with actual payments data
      return [
        { id: "TX123", date: "2024-02-20", amount: 150, status: "completed" },
        { id: "TX124", date: "2024-02-19", amount: 75, status: "pending" },
        { id: "TX125", date: "2024-02-18", amount: 200, status: "completed" },
      ];
    },
    enabled: Boolean(user?.id)
  });

  if (error) {
    return (
      <div className="text-center text-destructive">
        <p>Error loading payments. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments</h1>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">15.2%</div>
                <p className="text-xs text-muted-foreground">Compared to last month</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {payments?.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:shadow-md">
                  <div>
                    <h3 className="font-semibold">Transaction #{transaction.id}</h3>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${transaction.amount}</p>
                    <span className={`text-sm ${
                      transaction.status === "completed" ? "text-green-500" : "text-yellow-500"
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;