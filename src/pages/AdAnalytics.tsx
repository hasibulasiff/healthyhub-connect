import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdAnalytics = () => {
  const data = [
    { name: 'Mon', views: 400, clicks: 240 },
    { name: 'Tue', views: 300, clicks: 139 },
    { name: 'Wed', views: 200, clicks: 980 },
    { name: 'Thu', views: 278, clicks: 390 },
    { name: 'Fri', views: 189, clicks: 480 },
    { name: 'Sat', views: 239, clicks: 380 },
    { name: 'Sun', views: 349, clicks: 430 },
  ];

  const metrics = [
    { title: "Total Views", value: "12,345" },
    { title: "Total Clicks", value: "3,039" },
    { title: "CTR", value: "24.6%" },
    { title: "Avg. Time Viewed", value: "45s" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 page-padding">
        <h1 className="text-4xl font-bold mb-8">Ad Analytics</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="glass-effect">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" name="Views" />
                  <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdAnalytics;