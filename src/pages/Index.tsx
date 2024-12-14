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
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "HealthyThako transformed how I discover fitness centers. The platform made it incredibly easy to find the perfect gym that matches my schedule and preferences."
    },
    {
      name: "Michael Chen",
      role: "Gym Owner",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "As a gym owner, HealthyThako has significantly increased our visibility. The platform's user-friendly interface and detailed analytics help us better serve our members."
    },
    {
      name: "Emma Williams",
      role: "Yoga Instructor",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "The platform has helped me connect with students who are truly passionate about yoga. The booking system is seamless and professional."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <HeroSearch />

        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-white">
          <div className="relative">
            <FeaturedListings />
            <Categories />
            <EventsSection />
          </div>

          {/* Vision Section */}
          <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Our Vision for HealthyThako</h2>
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed">
                    We envision a world where everyone has easy access to quality fitness and wellness services. Our platform bridges the gap between health-focused businesses and individuals seeking to improve their well-being.
                  </p>
                  <p className="text-xl leading-relaxed">
                    Through innovation and community engagement, we're building a future where finding and booking fitness activities is seamless, transparent, and enjoyable for everyone.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">Connect</h3>
                      <p>Bringing together fitness enthusiasts and quality facilities</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">Inspire</h3>
                      <p>Motivating people to pursue their health and fitness goals</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">Transform</h3>
                      <p>Changing how people discover and engage with fitness services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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