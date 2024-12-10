import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Users, Clock, DollarSign, Calendar, Phone, Mail, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq("center_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img
              src={dummyCenter.images[selectedImage]}
              alt={dummyCenter.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {dummyCenter.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${dummyCenter.title} ${index + 1}`}
                className={`w-full h-48 object-cover rounded-lg cursor-pointer transition-opacity ${
                  selectedImage === index ? "opacity-100" : "opacity-70"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Center Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{dummyCenter.title}</h1>
                  <p className="flex items-center text-neutral gap-2">
                    <MapPin className="w-4 h-4" />
                    {dummyCenter.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="font-semibold">{dummyCenter.rating}</span>
                    <span className="text-neutral">({dummyCenter.reviews} reviews)</span>
                  </div>
                  <span className="text-neutral flex items-center justify-end gap-1">
                    <DollarSign className="w-4 h-4" />
                    {dummyCenter.price}
                  </span>
                </div>
              </div>

              <p className="text-neutral">{dummyCenter.description}</p>
            </div>

            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="amenities">
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities & Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {dummyCenter.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(dummyCenter.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center">
                          <span className="capitalize">{day}</span>
                          <span className="text-neutral">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ReviewForm centerId={id!} onSuccess={refetchReviews} />
                    
                    <div className="space-y-4 mt-8">
                      {reviews?.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="font-semibold">
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
                                <p className="text-muted-foreground">
                                  {review.comment}
                                </p>
                              </div>
                              <div className="text-sm text-muted-foreground">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral" />
                  <span>{dummyCenter.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral" />
                  <span>{dummyCenter.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-neutral" />
                  <span>{dummyCenter.contact.website}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button className="w-full mb-4">Book Now</Button>
                <Button variant="outline" className="w-full">
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
