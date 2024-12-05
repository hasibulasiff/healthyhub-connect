import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SubscriptionPricing = () => {
  const { toast } = useToast();

  const handleSubscribe = (plan: string) => {
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${plan} plan. Redirecting to payment...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Subscription Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="text-2xl font-bold">Basic</div>
                <div className="text-3xl font-bold mt-2">$29/mo</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Up to 3 listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleSubscribe("Basic")}
              >
                Subscribe to Basic
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>
                <div className="text-2xl font-bold">Pro</div>
                <div className="text-3xl font-bold mt-2">$79/mo</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Up to 10 listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Featured listings</span>
                </li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleSubscribe("Pro")}
              >
                Subscribe to Pro
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="text-2xl font-bold">Enterprise</div>
                <div className="text-3xl font-bold mt-2">$199/mo</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Unlimited listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>Custom analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>24/7 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  <span>API access</span>
                </li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleSubscribe("Enterprise")}
              >
                Subscribe to Enterprise
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionPricing;