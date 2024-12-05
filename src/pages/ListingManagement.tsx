import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ListingManagement = () => {
  const { toast } = useToast();
  const [listings] = useState([
    {
      id: 1,
      title: "Elite Fitness Center",
      status: "active",
      views: 1234,
      lastUpdated: "2024-02-20",
    },
    {
      id: 2,
      title: "Yoga Heaven Studio",
      status: "pending",
      views: 567,
      lastUpdated: "2024-02-19",
    },
  ]);

  const handleDelete = (id: number) => {
    toast({
      title: "Listing Deleted",
      description: `Listing ${id} has been deleted successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Listings</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Listing
          </Button>
        </div>

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search listings..."
            className="max-w-md"
          />
        </div>

        <div className="grid gap-4">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {listing.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-2xl font-bold">{listing.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Views</p>
                    <p className="text-2xl font-bold">{listing.views}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-2xl font-bold">{listing.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingManagement;