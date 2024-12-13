import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const dummyEvents = [
  {
    id: 1,
    title: "Summer Fitness Festival",
    description: "Join us for a day of fitness challenges and wellness workshops",
    date: "2024-07-15",
    location: "Central Park, California",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80",
    attendees: 500,
  },
  {
    id: 2,
    title: "Yoga on the Beach",
    description: "Sunrise yoga session with expert instructors",
    date: "2024-06-21",
    location: "Venice Beach, California",
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 200,
  },
  {
    id: 3,
    title: "Marathon Training Camp",
    description: "Professional training for upcoming marathon",
    date: "2024-08-10",
    location: "Sports Complex, California",
    category: "Training",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
    attendees: 150,
  },
  {
    id: 4,
    title: "Wellness Workshop",
    description: "Learn about nutrition and mental wellness",
    date: "2024-07-28",
    location: "Convention Center, California",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    attendees: 300,
  },
  {
    id: 5,
    title: "CrossFit Competition",
    description: "Annual CrossFit championship event",
    date: "2024-08-15",
    location: "Arena Center, California",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80",
    attendees: 400,
  },
  {
    id: 6,
    title: "Dance Fitness Party",
    description: "High-energy dance workout session",
    date: "2024-07-30",
    location: "Community Hall, California",
    category: "Dance",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 250,
  },
  {
    id: 7,
    title: "Mindfulness Retreat",
    description: "Weekend retreat for mental wellness",
    date: "2024-09-05",
    location: "Mountain Resort, California",
    category: "Retreat",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    attendees: 100,
  },
  {
    id: 8,
    title: "Sports Nutrition Seminar",
    description: "Expert talks on athletic nutrition",
    date: "2024-08-20",
    location: "Science Center, California",
    category: "Seminar",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
    attendees: 180,
  },
  {
    id: 9,
    title: "Power Lifting Competition",
    description: "Annual strength showcase event",
    date: "2024-09-15",
    location: "Fitness Arena, California",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80",
    attendees: 300,
  },
  {
    id: 10,
    title: "Wellness Expo 2024",
    description: "Largest wellness exhibition in the region",
    date: "2024-10-01",
    location: "Convention Center, California",
    category: "Expo",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    attendees: 1000,
  },
  {
    id: 11,
    title: "Meditation Masterclass",
    description: "Learn advanced meditation techniques",
    date: "2024-09-20",
    location: "Zen Center, California",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 50,
  },
  {
    id: 12,
    title: "Sports Medicine Conference",
    description: "Latest developments in sports medicine",
    date: "2024-10-15",
    location: "Medical Center, California",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
    attendees: 250,
  },
  {
    id: 13,
    title: "Nutrition Workshop",
    description: "Healthy eating and meal planning",
    date: "2024-09-25",
    location: "Wellness Hub, California",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    attendees: 75,
  },
  {
    id: 14,
    title: "Fitness Tech Showcase",
    description: "Latest fitness technology and gadgets",
    date: "2024-10-10",
    location: "Tech Center, California",
    category: "Expo",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80",
    attendees: 400,
  },
  {
    id: 15,
    title: "Wellness Retreat",
    description: "Weekend of mindfulness and relaxation",
    date: "2024-09-30",
    location: "Mountain Resort, California",
    category: "Retreat",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    attendees: 30,
  },
];

const Events = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-900/50 via-black/50 to-pink-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Upcoming Events</h2>
        <p className="text-white/70 text-center mb-12">Join exciting fitness and wellness events near you</p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {dummyEvents.map((event) => (
              <CarouselItem key={event.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600">
                      {event.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-white/70">{event.description}</p>
                    <div className="flex items-center gap-2 mt-4 text-white/70">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-sm text-white/50 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees} attendees
                    </span>
                    <Button variant="secondary" className="bg-purple-500/20 hover:bg-purple-500/30 text-white">
                      Join Event
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Events;
