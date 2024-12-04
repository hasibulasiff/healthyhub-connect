import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "",
    address: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto glass-effect p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Address</h2>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;