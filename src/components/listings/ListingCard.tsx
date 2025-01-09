import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users } from "lucide-react";
import { memo } from "react";
import { Listing } from "./types";

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = memo(({ listing }: ListingCardProps) => {
  return (
    <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {listing.sponsored && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600">
            {listing.category}
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="flex justify-between items-start text-white">
          <span className="group-hover:text-purple-400 transition-colors">{listing.title}</span>
          <span className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            {listing.rating}
          </span>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-white/70">
          <MapPin className="w-4 h-4" />
          {listing.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-white/70">{listing.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-white/50 flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {listing.reviews} reviews
        </span>
        <Button variant="secondary" className="bg-purple-500/20 hover:bg-purple-500/30 text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
});

ListingCard.displayName = "ListingCard";