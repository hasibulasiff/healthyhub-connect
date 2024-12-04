import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { Calendar, CreditCard, Settings, Star, Ticket } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="grid gap-8">
          {/* User Profile Header */}
          <div className="glass-effect p-6 rounded-lg shadow-lg flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="memberships" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TabsTrigger value="memberships" className="flex gap-2">
                <Ticket className="h-4 w-4" />
                Memberships
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex gap-2">
                <Star className="h-4 w-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="memberships">
              <Card>
                <CardHeader>
                  <CardTitle>Active Memberships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No active memberships found.</p>
                  <Button className="mt-4">Browse Centers</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No bookings found.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No reviews yet.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No billing information available.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;