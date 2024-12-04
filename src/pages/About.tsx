import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About HealthyThako</h1>
          
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
              alt="About HealthyThako"
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At HealthyThako, we're dedicated to connecting people with the best fitness, wellness, and sports facilities in their area. Our platform makes it easy to discover, compare, and engage with health-focused businesses and communities.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-muted-foreground mb-4">
                  We envision a world where everyone has easy access to quality fitness and wellness services. By bridging the gap between health-focused businesses and consumers, we're creating a healthier, more active global community.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Quality and Excellence</li>
                  <li>Community Focus</li>
                  <li>Health and Wellness Advocacy</li>
                  <li>Innovation in Fitness Technology</li>
                  <li>Transparency and Trust</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;