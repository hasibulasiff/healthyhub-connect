import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const TrainerDashboard = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<Date[]>([]);
  const [servicePackage, setServicePackage] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
  });

  const handleAvailabilityChange = (dates: Date[] | undefined) => {
    if (dates) {
      setAvailability(dates);
    }
  };

  const handleSavePackage = () => {
    toast({
      title: "Package Saved",
      description: "Your service package has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Management</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Specialization</label>
                <Input placeholder="e.g., Yoga, CrossFit, etc." />
              </div>
              
              <div>
                <label className="text-sm font-medium">Experience (years)</label>
                <Input type="number" placeholder="Years of experience" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Certifications</label>
                <Textarea placeholder="List your certifications" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea placeholder="Tell us about yourself" />
              </div>
              
              <Button className="w-full">Update Profile</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="multiple"
                selected={availability}
                onSelect={handleAvailabilityChange}
                className="rounded-md border"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {availability.map(date => (
                  <Badge key={date.toISOString()} variant="secondary">
                    {date.toLocaleDateString()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Package Name</label>
                  <Input
                    placeholder="e.g., Basic Training Package"
                    value={servicePackage.name}
                    onChange={(e) => setServicePackage({ ...servicePackage, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe what's included"
                    value={servicePackage.description}
                    onChange={(e) => setServicePackage({ ...servicePackage, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Input
                      type="number"
                      placeholder="60"
                      value={servicePackage.duration}
                      onChange={(e) => setServicePackage({ ...servicePackage, duration: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input
                      type="number"
                      placeholder="99.99"
                      value={servicePackage.price}
                      onChange={(e) => setServicePackage({ ...servicePackage, price: e.target.value })}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSavePackage} className="w-full">
                  Save Package
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;