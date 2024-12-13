import { useState } from "react";
import { format } from "date-fns";
import { MapPin, Calendar, Clock, Share2, Star, Users, Mail, CalendarPlus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import EventMap from "./EventMap";
import EventGallery from "./EventGallery";
import EventFAQ from "./EventFAQ";
import EventReviews from "./EventReviews";

interface EventListingProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    price: number;
    image: string;
    speakers: Array<{
      name: string;
      role: string;
      avatar: string;
    }>;
    gallery: string[];
    ticketsLeft: number;
    rating: number;
    reviews: number;
  };
}

const EventListing = ({ event }: EventListingProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShare = () => {
    navigator.share({
      title: event.title,
      text: event.description,
      url: window.location.href,
    }).catch(() => {
      toast.success("Event link copied to clipboard!");
    });
  };

  const handleAddToCalendar = () => {
    // Implementation for calendar integration
    toast.success("Event added to calendar!");
  };

  const handleRegister = () => {
    // Implementation for registration
    toast.success("Registration successful! Check your email for confirmation.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Badge className="mb-4">{event.category}</Badge>
          <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {format(new Date(event.date), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {event.location}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-600 ${!showFullDescription && "line-clamp-3"}`}>
                {event.description}
              </p>
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <ChevronUp className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-2" />
                )}
                {showFullDescription ? "Show Less" : "Read More"}
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
                  <EventMap location={event.location} />
                  <EventFAQ />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="speakers">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={speaker.avatar} />
                          <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{speaker.name}</h3>
                          <p className="text-sm text-gray-500">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gallery">
              <Card>
                <CardContent className="pt-6">
                  <EventGallery images={event.gallery} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <EventReviews eventId={event.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Registration Card */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>Secure your spot today!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Price</span>
                  <span className="text-2xl font-bold">${event.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Tickets Left</span>
                  <span className="text-sm font-semibold">{event.ticketsLeft}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{event.rating}</span>
                  <span className="text-gray-500">({event.reviews} reviews)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" size="lg" onClick={handleRegister}>
                Register Now
              </Button>
              <div className="flex gap-4 w-full">
                <Button variant="outline" className="flex-1" onClick={handleAddToCalendar}>
                  <CalendarPlus className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe to Updates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventListing;