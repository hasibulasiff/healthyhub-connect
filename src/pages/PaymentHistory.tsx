import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, Calendar } from "lucide-react";

const PaymentHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment History</h1>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Fitness Zone, Yoga Heaven</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 15, 2024</div>
            <p className="text-xs text-muted-foreground">$49.99</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "INV001",
                date: "Feb 20, 2024",
                description: "Fitness Zone - Monthly Membership",
                amount: 49.99,
                status: "Paid",
              },
              {
                id: "INV002",
                date: "Feb 15, 2024",
                description: "Yoga Heaven - Class Package",
                amount: 89.99,
                status: "Paid",
              },
              {
                id: "INV003",
                date: "Feb 01, 2024",
                description: "Personal Training Session",
                amount: 75.00,
                status: "Paid",
              },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{transaction.description}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Invoice #{transaction.id}</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount}</p>
                  <span className="text-sm text-green-500">{transaction.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;