import { MapPin, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "../events/types";

interface CenterCardProps {
  center: Event;
}

const CenterCard = ({ center }: CenterCardProps) => {
  return (
    <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-md border-gray-200">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={center.image} 
          alt={center.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600">
          {center.category}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors">
          {center.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          {center.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700">{center.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-600">4.8 (120 reviews)</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-600 flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {center.attendees} members
        </span>
        <Button 
          variant="secondary" 
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          View Center
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CenterCard;