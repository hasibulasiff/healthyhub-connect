import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, Globe, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/center-detail/ImageGallery";
import CenterInfo from "@/components/center-detail/CenterInfo";
import DetailTabs from "@/components/center-detail/DetailTabs";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type ReviewWithProfile = Database['public']['Tables']['reviews']['Row'] & {
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

const dummyCenter = {
  id: 1,
  title: "Elite Fitness Center",
  type: "Gym",
  rating: 4.8,
  reviews: 234,
  price: "$$",
  location: "123 Fitness Street, Downtown, California",
  description: "Elite Fitness Center is a state-of-the-art facility offering the latest in fitness equipment, expert personal training, and a wide range of group classes. Our mission is to help you achieve your fitness goals in a motivating and supportive environment.",
  images: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&q=80"
  ],
  hours: {
    monday: "6:00 AM - 10:00 PM",
    tuesday: "6:00 AM - 10:00 PM",
    wednesday: "6:00 AM - 10:00 PM",
    thursday: "6:00 AM - 10:00 PM",
    friday: "6:00 AM - 9:00 PM",
    saturday: "7:00 AM - 8:00 PM",
    sunday: "7:00 AM - 6:00 PM"
  },
  amenities: ["Free Parking", "Locker Rooms", "Showers", "Towel Service", "Wifi", "Cafe"],
  contact: {
    phone: "(123) 456-7890",
    email: "info@elitefitness.com",
    website: "www.elitefitness.com"
  }
};

const CenterDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      if (!id) throw new Error("No center ID provided");
      
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .eq('center_id', id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }
      
      return data as ReviewWithProfile[];
    },
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <div className="min-h-screen bg-[#0a0118] flex items-center justify-center">
        <div className="text-white text-xl">Center not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0118]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <ImageGallery images={dummyCenter.images} title={dummyCenter.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CenterInfo
              title={dummyCenter.title}
              location={dummyCenter.location}
              rating={dummyCenter.rating}
              reviews={dummyCenter.reviews}
              price={dummyCenter.price}
              description={dummyCenter.description}
            />

            <DetailTabs
              amenities={dummyCenter.amenities}
              hours={dummyCenter.hours}
              reviews={reviews}
              centerId={id}
              onReviewSuccess={refetchReviews}
            />
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="w-4 h-4" />
                  <span>{dummyCenter.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Mail className="w-4 h-4" />
                  <span>{dummyCenter.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Globe className="w-4 h-4" />
                  <span>{dummyCenter.contact.website}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="pt-6">
                <Button className="w-full mb-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CenterDetail;