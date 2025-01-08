export interface Event {
  id: string | number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  type: 'event' | 'center' | 'trainer';
}