import { useParams } from "react-router-dom";
import { MapPin, Star, Calendar, Mail, Phone, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const TrainerDetail = () => {
  const { id } = useParams();

  const handleBooking = () => {
    toast.success("Booking request sent!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5"
                alt="Trainer profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge className="mb-4">Personal Trainer</Badge>
                <h1 className="text-4xl font-bold text-white mb-2">John Smith</h1>
                <div className="flex flex-wrap gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Los Angeles, California
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    4.9 (150 reviews)
                  </div>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Certified personal trainer with over 10 years of experience in strength training, 
                  weight loss, and athletic performance. Specializing in functional fitness and 
                  personalized workout programs tailored to individual goals.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Strength Training",
                    "Weight Loss",
                    "HIIT",
                    "Nutrition Planning",
                    "Sports Performance",
                    "Rehabilitation",
                  ].map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                      <Award className="w-5 h-5 text-purple-500" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { day: "Monday", hours: "6:00 AM - 8:00 PM" },
                    { day: "Tuesday", hours: "6:00 AM - 8:00 PM" },
                    { day: "Wednesday", hours: "6:00 AM - 8:00 PM" },
                    { day: "Thursday", hours: "6:00 AM - 8:00 PM" },
                    { day: "Friday", hours: "6:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "8:00 AM - 2:00 PM" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-semibold">{schedule.day}</span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {schedule.hours}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Rate</span>
                  <span className="text-2xl font-bold">$80/hour</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleBooking}>
                  Book Now
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "NASM Certified Personal Trainer",
                  "ACE Fitness Nutrition Specialist",
                  "ISSA Strength & Conditioning",
                  "First Aid & CPR Certified",
                ].map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span>{cert}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrainerDetail;