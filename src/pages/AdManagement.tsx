import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { DollarSign, Users, Eye, TrendingUp } from "lucide-react";

const mockData = [
  { name: "Mon", views: 400, clicks: 240, conversions: 24 },
  { name: "Tue", views: 300, clicks: 139, conversions: 18 },
  { name: "Wed", views: 200, clicks: 980, conversions: 29 },
  { name: "Thu", views: 278, clicks: 390, conversions: 20 },
  { name: "Fri", views: 189, clicks: 480, conversions: 28 },
  { name: "Sat", views: 239, clicks: 380, conversions: 33 },
  { name: "Sun", views: 349, clicks: 430, conversions: 26 },
];

const AdManagement = () => {
  const { toast } = useToast();
  const [campaign, setCampaign] = useState({
    name: "",
    description: "",
    budget: "",
    duration: "",
    targetAudience: "",
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Campaign Created",
      description: "Your ad campaign has been created successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create Ad Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCampaign} className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input
                    placeholder="Enter campaign name"
                    value={campaign.name}
                    onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe your campaign"
                    value={campaign.description}
                    onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Budget ($)</label>
                    <Input
                      type="number"
                      placeholder="Campaign budget"
                      value={campaign.budget}
                      onChange={(e) => setCampaign({ ...campaign, budget: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration (days)</label>
                    <Input
                      type="number"
                      placeholder="Campaign duration"
                      value={campaign.duration}
                      onChange={(e) => setCampaign({ ...campaign, duration: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Target Audience</label>
                  <Input
                    placeholder="Define your target audience"
                    value={campaign.targetAudience}
                    onChange={(e) => setCampaign({ ...campaign, targetAudience: e.target.value })}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Create Campaign
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">178</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245%</div>
                <p className="text-xs text-muted-foreground">+201% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                    <Bar dataKey="clicks" fill="#82ca9d" />
                    <Bar dataKey="conversions" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Budget</span>
                    <span className="text-2xl font-bold">$10,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Spent</span>
                    <span className="text-2xl font-bold text-green-600">$4,235</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Remaining</span>
                    <span className="text-2xl font-bold text-blue-600">$5,765</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                  <p className="text-sm text-gray-500">42% of budget spent</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Daily Budget</label>
                    <Input type="number" placeholder="Enter daily budget" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Maximum Bid</label>
                    <Input type="number" placeholder="Enter maximum bid" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Budget Distribution</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="even">Even Distribution</option>
                      <option value="front">Front Loaded</option>
                      <option value="back">Back Loaded</option>
                    </select>
                  </div>
                  
                  <Button className="w-full">Update Budget Settings</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdManagement;