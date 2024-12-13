import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "./types";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
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
        <CardDescription className="flex items-center gap-2 text-white/90">
          <Calendar className="w-4 h-4" />
          {new Date(event.date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-white/90">{event.description}</p>
        <div className="flex items-center gap-2 mt-4 text-white/90">
          <MapPin className="w-4 h-4" />
          {event.location}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-white/80 flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {event.attendees} attendees
        </span>
        <Button 
          variant="secondary" 
          className="bg-purple-500 hover:bg-purple-600 text-white transition-colors"
        >
          Join Event
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;