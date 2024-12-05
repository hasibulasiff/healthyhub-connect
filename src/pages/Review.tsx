import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";

const Review = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset form
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Write a Review</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label htmlFor="review" className="block text-sm font-medium">
                Your Review
              </label>
              <Textarea
                id="review"
                placeholder="Share your experience..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Review;