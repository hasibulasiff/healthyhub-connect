import { Star, Dumbbell, Coffee, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import { Database } from "@/integrations/supabase/types";
import { motion } from "framer-motion";

type ReviewWithProfile = Database['public']['Tables']['reviews']['Row'] & {
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

interface DetailTabsProps {
  amenities: string[];
  hours: Record<string, string>;
  reviews: ReviewWithProfile[] | undefined;
  centerId: string;
  onReviewSuccess: () => void;
}

const getAmenityIcon = (amenity: string) => {
  const icons: Record<string, any> = {
    "Free Weights": Dumbbell,
    "Cafe": Coffee,
    "Wifi": Wifi,
  };
  return icons[amenity] || Dumbbell;
};

const DetailTabs = ({ amenities, hours, reviews, centerId, onReviewSuccess }: DetailTabsProps) => {
  return (
    <Tabs defaultValue="amenities" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-white">
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="amenities">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Amenities & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {amenities.map((amenity) => {
                const IconComponent = getAmenityIcon(amenity);
                return (
                  <motion.div 
                    key={amenity} 
                    className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{amenity}</span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="schedule">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Opening Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="capitalize text-gray-700 font-medium">{day}</span>
                  <span className="text-gray-600">{hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reviews">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ReviewForm centerId={centerId} onSuccess={onReviewSuccess} />
            
            <div className="space-y-4 mt-8">
              {reviews?.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="font-semibold text-gray-900">
                              {review.profiles?.username || "Anonymous"}
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">
                            {review.comment}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DetailTabs;