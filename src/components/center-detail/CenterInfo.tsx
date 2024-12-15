import { MapPin, Star, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8 mb-8"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-3 text-gray-900">{title}</h1>
          <p className="flex items-center text-gray-600 gap-2">
            <MapPin className="w-4 h-4" />
            {location}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <span className="font-semibold text-gray-900">{rating}</span>
            <span className="text-gray-600">({reviews} reviews)</span>
          </div>
          <span className="text-gray-600 flex items-center justify-end gap-1">
            <DollarSign className="w-4 h-4" />
            {price}
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default CenterInfo;