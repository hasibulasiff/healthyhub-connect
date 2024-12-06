import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const AdPlacement = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ad Submitted",
      description: "Your ad has been submitted for review.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 page-padding">
        <h1 className="text-4xl font-bold mb-8">Place Your Ad</h1>
        
        <div className="max-w-3xl mx-auto">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Ad Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad Title</label>
                  <Input placeholder="Enter your ad title" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea placeholder="Describe your ad" className="min-h-[100px]" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                  <Input placeholder="Who is your ad for?" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <Input type="number" placeholder="Enter your budget" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input type="number" placeholder="Number of days" />
                </div>
                
                <Button type="submit" className="w-full btn-hover-effect">
                  Submit Ad
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdPlacement;