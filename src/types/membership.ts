export interface MembershipPlan {
  id: string;
  center_id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  features: string[];
  is_active: boolean;
  created_at: string;
  total_subscribers: number;
  total_revenue: number;
}