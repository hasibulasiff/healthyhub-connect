import { supabase } from "@/integrations/supabase/client";

export interface MembershipPlan {
  id: string;
  center_id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  features: string[];
  is_active: boolean;
}

export const membershipService = {
  async createPlan(plan: Omit<MembershipPlan, 'id'>) {
    const { data, error } = await supabase
      .from('membership_plans')
      .insert(plan)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPlans(centerId: string) {
    const { data, error } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('center_id', centerId)
      .eq('is_active', true);

    if (error) throw error;
    return data;
  },

  async subscribeToPlan(userId: string, planId: string, centerId: string) {
    const { data: plan, error: planError } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError) throw planError;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration_months);

    const { data, error } = await supabase
      .from('memberships')
      .insert({
        user_id: userId,
        center_id: centerId,
        plan_id: planId,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserMemberships(userId: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select(`
        *,
        centers:center_id (
          name,
          location
        ),
        plans:plan_id (
          name,
          price,
          features
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
};