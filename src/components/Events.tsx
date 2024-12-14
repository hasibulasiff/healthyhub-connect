import { useNavigate } from "react-router-dom";
import EventCarousel from "./events/EventCarousel";
import { Event } from "./events/types";

const dummyEvents: Event[] = [
  {
    id: 1,
    title: "Summer Fitness Festival",
    description: "Join us for a day of fitness challenges and wellness workshops",
    date: "2024-07-15",
    location: "Central Park, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80",
    attendees: 500,
    type: "event"
  },
  {
    id: 2,
    title: "Elite Fitness Center",
    description: "State-of-the-art equipment and expert trainers",
    date: "2024-06-21",
    location: "Downtown LA",
    category: "Center",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 200,
    type: "center"
  },
  {
    id: 3,
    title: "John Smith - Personal Trainer",
    description: "Certified trainer specializing in strength and conditioning",
    date: "2024-08-10",
    location: "Various Locations",
    category: "Trainer",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
    attendees: 150,
    type: "trainer"
  },
  {
    id: 4,
    title: "Yoga on the Beach",
    description: "Sunrise yoga session with expert instructors",
    date: "2024-06-21",
    location: "Venice Beach, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 200,
    type: "event"
  },
  {
    id: 5,
    title: "Marathon Training Camp",
    description: "Professional training for upcoming marathon",
    date: "2024-08-10",
    location: "Sports Complex, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
    attendees: 150,
    type: "event"
  },
  {
    id: 6,
    title: "Wellness Workshop",
    description: "Learn about nutrition and mental wellness",
    date: "2024-07-28",
    location: "Convention Center, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    attendees: 300,
    type: "event"
  },
  {
    id: 7,
    title: "CrossFit Competition",
    description: "Annual CrossFit championship event",
    date: "2024-08-15",
    location: "Arena Center, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80",
    attendees: 400,
    type: "event"
  },
  {
    id: 8,
    title: "Dance Fitness Party",
    description: "High-energy dance workout session",
    date: "2024-07-30",
    location: "Community Hall, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 250,
    type: "event"
  },
  {
    id: 9,
    title: "Mindfulness Retreat",
    description: "Weekend retreat for mental wellness",
    date: "2024-09-05",
    location: "Mountain Resort, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    attendees: 100,
    type: "event"
  },
  {
    id: 10,
    title: "Sports Nutrition Seminar",
    description: "Expert talks on athletic nutrition",
    date: "2024-08-20",
    location: "Science Center, California",
    category: "Event",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
    attendees: 180,
    type: "event"
  }
];

const Events = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join exciting fitness and wellness events near you
          </p>
        </div>
        
        <EventCarousel events={dummyEvents} />
      </div>
    </section>
  );
};

export default Events;