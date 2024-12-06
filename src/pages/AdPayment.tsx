import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const AdPayment = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Successful",
      description: "Your ad campaign has been activated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 page-padding">
        <h1 className="text-4xl font-bold mb-8">Payment Details</h1>
        
        <div className="max-w-3xl mx-auto">
          <Card className="glass-effect mb-6">
            <CardHeader>
              <CardTitle>Campaign Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ad Campaign</span>
                  <span>Premium Gym Promotion</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>30 days</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>$500.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input placeholder="123" type="password" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
                
                <Button type="submit" className="w-full btn-hover-effect">
                  Pay $500.00
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdPayment;