import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import EventsSection from "@/components/events/EventsSection";
import FAQSection from "@/components/faq/FAQSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <HeroSearch />
        <div className="bg-white">
          <div className="relative">
            <FeaturedListings />
            <Categories />
            <EventsSection />
          </div>

          {/* Lead Capture Form */}
          <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
              <p className="text-xl mb-8">Join our newsletter and get exclusive updates about new features and listings</p>
              <form onSubmit={handleEmailSubmit} className="flex gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-gray-900"
                  required
                />
                <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                  Subscribe
                </Button>
              </form>
            </div>
          </section>

          <FAQSection />

          {/* Call to Action Section */}
          <section className="py-20 px-4 text-center bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Start Your Fitness Journey?</h2>
              <p className="text-xl text-gray-600 mb-8">Join thousands of satisfied users who have transformed their lives through our platform</p>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;