import { useParams } from "react-router-dom";
import { MapPin, Calendar, Clock, Users, Share2, Star, Mail, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams();

  const handleShare = () => {
    navigator.share({
      title: "Summer Fitness Festival",
      text: "Join us for a day of fitness challenges and wellness workshops",
      url: window.location.href,
    }).catch(() => {
      toast.success("Event link copied to clipboard!");
    });
  };

  const handleAddToCalendar = () => {
    toast.success("Event added to calendar!");
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
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
                alt="Event cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge className="mb-4">Fitness Event</Badge>
                <h1 className="text-4xl font-bold text-white mb-2">Summer Fitness Festival</h1>
                <div className="flex flex-wrap gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    July 15, 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    9:00 AM - 6:00 PM
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Central Park, California
                  </div>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join us for an exciting day of fitness challenges, wellness workshops, and community building. 
                  Our Summer Fitness Festival brings together top trainers, nutritionists, and wellness experts 
                  for a day of learning, exercising, and fun.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: "9:00 AM", activity: "Registration & Welcome" },
                  { time: "10:00 AM", activity: "Opening Ceremony & Warm-up" },
                  { time: "11:00 AM", activity: "Group Fitness Challenge" },
                  { time: "12:30 PM", activity: "Lunch Break & Networking" },
                  { time: "2:00 PM", activity: "Wellness Workshops" },
                  { time: "4:00 PM", activity: "Closing Ceremony" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{item.time}</p>
                      <p className="text-gray-600">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Price</span>
                  <span className="text-2xl font-bold">$49</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>500 spots available</span>
                </div>
                <Button className="w-full" size="lg">
                  Register Now
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={handleAddToCalendar}>
                    <CalendarPlus className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5"
                    alt="Organizer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">Elite Fitness Center</h3>
                    <p className="text-sm text-gray-600">Event Organizer</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Organizer
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

export default EventDetail;