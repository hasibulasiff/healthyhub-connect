import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Trophy, Users, Zap, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "HealthyThako helped me find the perfect gym that matches my schedule and fitness goals. The detailed reviews and photos were incredibly helpful!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  },
  {
    name: "Mike Chen",
    role: "Gym Owner",
    content: "As a gym owner, HealthyThako has significantly increased our visibility. The platform is user-friendly and the support team is fantastic!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Yoga Instructor",
    content: "The platform has made it easy for me to discover and connect with new studios. The booking system is seamless and efficient.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
  }
];

const Index = () => {
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <HeroSearch />
        
        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">What Our Users Say</h2>
            <p className="text-gray-600 text-center mb-12">Join thousands of satisfied users who have found their perfect fitness space</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600">{testimonial.content}</p>
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
            <Events />
          </div>
          
          {/* Why Choose Us Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Why Choose Us</h2>
              <p className="text-gray-600 text-center mb-12">Discover what makes us the best choice for your fitness journey</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Trusted Platform</h3>
                    <p className="text-gray-600">Verified listings and secure bookings for your peace of mind</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assured</h3>
                    <p className="text-gray-600">Only the best fitness and wellness centers make it to our platform</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Community Driven</h3>
                    <p className="text-gray-600">Join a thriving community of fitness enthusiasts</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Access</h3>
                    <p className="text-gray-600">Quick and easy booking process for all services</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

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