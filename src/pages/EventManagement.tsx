import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Users, MapPin, DollarSign } from "lucide-react";
import { format } from "date-fns";

const EventManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [previewMode, setPreviewMode] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    price: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Event</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Event Title</label>
                      <Input
                        placeholder="Enter event title"
                        value={eventData.title}
                        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Describe your event"
                        value={eventData.description}
                        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        placeholder="Event location"
                        value={eventData.location}
                        onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Date</label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Time</label>
                        <Input
                          type="time"
                          value={eventData.time}
                          onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Capacity</label>
                        <Input
                          type="number"
                          placeholder="Max participants"
                          value={eventData.capacity}
                          onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Price</label>
                      <Input
                        type="number"
                        placeholder="Event price"
                        value={eventData.price}
                        onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Event</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Event Preview Image</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">{eventData.title || "Event Title"}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{date ? format(date, "PPP") : "Event Date"}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{eventData.time || "Event Time"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{eventData.location || "Event Location"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{eventData.capacity ? `${eventData.capacity} participants` : "Capacity"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5" />
                  <span>{eventData.price ? `$${eventData.price}` : "Price"}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {eventData.description || "Event description will appear here"}
              </p>

              <div className="flex justify-end">
                <Badge variant="secondary">Preview Mode</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventManagement;