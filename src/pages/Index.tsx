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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

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
      name: "Sarah Chen",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&q=80",
      quote: "HealthyThako has transformed my fitness journey. The personalized approach and cultural sensitivity make it stand out from other platforms."
    },
    {
      name: "Michael Rodriguez",
      role: "Gym Owner",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&q=80",
      quote: "As a fitness center owner, HealthyThako has helped us reach a diverse community while maintaining our unique identity and values."
    },
    {
      name: "Priya Patel",
      role: "Wellness Coach",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&q=80",
      quote: "The platform's commitment to cultural understanding while maintaining professional standards is exactly what the fitness industry needed."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <HeroSearch />

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-[#0a0118] to-[#1A1F2C]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Community Says</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-[#221F26]/50 border-none backdrop-blur-sm hover:bg-[#221F26]/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4 ring-2 ring-[#D946EF] ring-offset-2 ring-offset-[#221F26]">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-300 italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                      <h3 className="font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-[#9b87f5]">{testimonial.role}</p>
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

          {/* Vision Section - Exactly matching the image */}
          <section className="py-20 bg-[#0a0118] text-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="#FF69B4" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="#FF69B4" strokeWidth="2"/>
                    </svg>
                    <h2 className="text-3xl font-bold text-[#FF69B4]">Our Vision</h2>
                  </div>
                  <p className="text-lg leading-relaxed">
                    At Healthy Thako, we believe that everyone deserves access to quality fitness guidance and support. Our mission is to make health and fitness accessible, affordable, and simple for everyone.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We understand the unique challenges and preferences of our community, which is why we've created a platform that combines technology with cultural understanding to deliver the best possible fitness experience.
                  </p>
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="bg-[#1A1F2C] p-6 rounded-lg">
                      <h3 className="text-[#FF69B4] text-4xl font-bold mb-2">10K+</h3>
                      <p className="text-gray-400">Active Users</p>
                    </div>
                    <div className="bg-[#1A1F2C] p-6 rounded-lg">
                      <h3 className="text-[#FF69B4] text-4xl font-bold mb-2">95%</h3>
                      <p className="text-gray-400">Success Rate</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="bg-[#1A1F2C] p-8 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FF69B4" strokeWidth="2"/>
                        <path d="M8 12L11 15L16 9" stroke="#FF69B4" strokeWidth="2"/>
                      </svg>
                      <h3 className="text-xl font-semibold">Our Commitment</h3>
                    </div>
                    <p className="text-gray-300">
                      We're committed to providing personalized fitness solutions that respect and incorporate local cultural elements while maintaining international standards of health and wellness.
                    </p>
                  </div>
                  <div className="bg-[#1A1F2C] p-8 rounded-lg">
                    <h3 className="text-xl font-semibold mb-6">Our Values</h3>
                    <div className="space-y-4">
                      {["Accessibility for all", "Cultural sensitivity", "Scientific approach", "Continuous innovation"].map((value, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="text-[#FF69B4] w-5 h-5" />
                          <span className="text-gray-300">{value}</span>
                        </div>
                      ))}
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