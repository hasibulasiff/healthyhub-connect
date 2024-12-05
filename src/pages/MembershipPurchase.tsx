import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

const MembershipPurchase = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePurchase = () => {
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "You must select a membership plan before proceeding.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Initiated",
      description: "Redirecting to payment gateway...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Membership</h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <Card className={`relative ${selectedPlan === 'basic' ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <p className="text-2xl font-bold">$29/mo</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>Access to basic facilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>2 classes per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>Basic support</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6"
                variant={selectedPlan === 'basic' ? 'default' : 'outline'}
                onClick={() => setSelectedPlan('basic')}
              >
                {selectedPlan === 'basic' ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className={`relative ${selectedPlan === 'pro' ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <p className="text-2xl font-bold">$49/mo</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>Access to all facilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>5 classes per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6"
                variant={selectedPlan === 'pro' ? 'default' : 'outline'}
                onClick={() => setSelectedPlan('pro')}
              >
                {selectedPlan === 'pro' ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className={`relative ${selectedPlan === 'premium' ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <p className="text-2xl font-bold">$99/mo</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>Unlimited access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>Unlimited classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  <span>24/7 support</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6"
                variant={selectedPlan === 'premium' ? 'default' : 'outline'}
                onClick={() => setSelectedPlan('premium')}
              >
                {selectedPlan === 'premium' ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={handlePurchase} disabled={!selectedPlan}>
            Proceed to Payment
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MembershipPurchase;