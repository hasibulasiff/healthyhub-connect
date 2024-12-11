import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import { Database } from "@/integrations/supabase/types";

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

const DetailTabs = ({ amenities, hours, reviews, centerId, onReviewSuccess }: DetailTabsProps) => {
  return (
    <Tabs defaultValue="amenities" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="amenities">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Amenities & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-white/70">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="schedule">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Opening Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="capitalize text-white">{day}</span>
                  <span className="text-white/70">{hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reviews">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ReviewForm centerId={centerId} onSuccess={onReviewSuccess} />
            
            <div className="space-y-4 mt-8">
              {reviews?.map((review) => (
                <Card key={review.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-semibold text-white">
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
                        <p className="text-white/70">
                          {review.comment}
                        </p>
                      </div>
                      <div className="text-sm text-white/50">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DetailTabs;