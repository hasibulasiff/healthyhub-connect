import { MapPin, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "../events/types";

interface TrainerCardProps {
  trainer: Event;
}

const TrainerCard = ({ trainer }: TrainerCardProps) => {
  return (
    <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={trainer.image} 
          alt={trainer.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-teal-600">
          {trainer.category}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-gray-900 group-hover:text-green-600 transition-colors">
          {trainer.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-gray-600">
          <Star className="w-4 h-4 text-yellow-500" />
          4.9 (85 reviews)
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700">{trainer.description}</p>
        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <MapPin className="w-4 h-4" />
          {trainer.location}
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          Available from {new Date(trainer.date).toLocaleDateString()}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-900">
          $50/hour
        </span>
        <Button 
          variant="secondary" 
          className="bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          Book Session
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainerCard;