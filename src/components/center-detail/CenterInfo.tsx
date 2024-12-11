import { MapPin, Star, DollarSign } from "lucide-react";

interface CenterInfoProps {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
}

const CenterInfo = ({ title, location, rating, reviews, price, description }: CenterInfoProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
          <p className="flex items-center text-white/70 gap-2">
            <MapPin className="w-4 h-4" />
            {location}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <span className="font-semibold text-white">{rating}</span>
            <span className="text-white/70">({reviews} reviews)</span>
          </div>
          <span className="text-white/70 flex items-center justify-end gap-1">
            <DollarSign className="w-4 h-4" />
            {price}
          </span>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};

export default CenterInfo;