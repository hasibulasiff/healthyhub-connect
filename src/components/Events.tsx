import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
];

const Events = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-900 to-[#0a0118]">
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
              <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50">
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
                  
                  <CardFooter className="text-sm text-white/50">
                    <Users className="w-4 h-4 mr-1" />
                    {event.attendees} attendees
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