import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface EventReviewsProps {
  eventId: string;
}

const EventReviews = ({ eventId }: EventReviewsProps) => {
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
      },
      rating: 5,
      date: "2024-03-15",
      comment: "Amazing event! The speakers were incredibly knowledgeable and engaging."
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
      },
      rating: 4,
      date: "2024-03-14",
      comment: "Great organization and valuable content. Would definitely attend again!"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-yellow-400 fill-current" />
        <span className="text-2xl font-bold">4.5</span>
        <span className="text-gray-500">(128 reviews)</span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{review.user.name}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventReviews;