export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  type: 'event' | 'center' | 'trainer';
}