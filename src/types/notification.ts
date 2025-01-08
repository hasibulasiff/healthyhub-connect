export interface Notification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  related_id?: string;
  related_type?: string;
}