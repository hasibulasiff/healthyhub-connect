import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, PauseCircle, PlayCircle, Trash2 } from "lucide-react";

const AdManagement = () => {
  const ads = [
    {
      id: 1,
      title: "Premium Gym Promotion",
      status: "active",
      views: 1234,
      budget: 500,
      remaining: 300,
    },
    {
      id: 2,
      title: "Yoga Class Special",
      status: "paused",
      views: 890,
      budget: 300,
      remaining: 150,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 page-padding">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Your Ads</h1>
          <Button className="btn-hover-effect">Create New Ad</Button>
        </div>
        
        <div className="grid gap-6">
          {ads.map((ad) => (
            <Card key={ad.id} className="glass-effect">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{ad.title}</CardTitle>
                  <Badge variant={ad.status === "active" ? "default" : "secondary"}>
                    {ad.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="text-2xl font-bold">{ad.views}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold">${ad.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold">${ad.remaining}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" /> View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    {ad.status === "active" ? (
                      <><PauseCircle className="w-4 h-4 mr-1" /> Pause</>
                    ) : (
                      <><PlayCircle className="w-4 h-4 mr-1" /> Resume</>
                    )}
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
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

export default AdManagement;