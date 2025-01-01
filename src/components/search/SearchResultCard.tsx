import { Link } from "react-router-dom";
import { MapPin, Star, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SearchResultCardProps {
  result: {
    id: number;
    title: string;
    type: string;
    sponsored?: boolean;
    rating?: number;
    reviews?: number;
    location: string;
    image: string;
    description: string;
    amenities?: string[];
  };
}

const SearchResultCard = ({ result }: SearchResultCardProps) => {
  const handleRequestInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Request sent! We'll get back to you soon.");
  };

  return (
    <Link to={`/center/${result.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-64 h-48 relative overflow-hidden">
            <img 
              src={result.image} 
              alt={result.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
            {result.sponsored && (
              <Badge className="absolute top-2 left-2 bg-accent text-white">
                Sponsored
              </Badge>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{result.title}</h3>
                <p className="text-muted-foreground text-sm">{result.type}</p>
              </div>
              {result.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="font-semibold">{result.rating}</span>
                  <span className="text-muted-foreground">({result.reviews})</span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-muted-foreground">{result.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {result.location}
              </div>

              <div className="flex gap-2 mt-2">
                {result.amenities?.map((amenity, index) => (
                  <Badge key={index} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
              <Button onClick={handleRequestInfo}>
                Request Information
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SearchResultCard;