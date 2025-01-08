import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MembershipPlan } from "@/types/membership";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MembershipPurchase() {
  const { centerId } = useParams();
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('membership_plans')
          .select('*')
          .eq('center_id', centerId)
          .eq('is_active', true);

        if (error) throw error;

        // Convert features from JSON to string array if needed
        const formattedPlans = data.map(plan => ({
          ...plan,
          features: Array.isArray(plan.features) ? plan.features : []
        }));

        setPlans(formattedPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast({
          title: "Error fetching plans",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (centerId) {
      fetchPlans();
    }
  }, [centerId, toast]);

  const handlePurchase = async (planId: string) => {
    try {
      const { error } = await supabase
        .from('memberships')
        .insert({
          user_id: supabase.auth.user()?.id,
          center_id: centerId,
          plan_id: planId,
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() // Assuming 1 month duration
        });

      if (error) throw error;

      toast({
        title: "Membership purchased",
        description: "Your membership has been successfully purchased.",
      });
    } catch (error) {
      console.error('Error purchasing plan:', error);
      toast({
        title: "Error purchasing plan",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Choose a Membership Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <p className="text-3xl font-bold mb-4">${plan.price}</p>
            <ul className="mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  • {feature}
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => handlePurchase(plan.id)}
              className="w-full"
            >
              Purchase Plan
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
