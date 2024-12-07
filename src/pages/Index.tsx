import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Trophy, Users, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSearch />
        <FeaturedListings />
        <Categories />
        
        {/* Why Choose Us Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-[#0a0118] to-purple-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-white">Why Choose Us</h2>
            <p className="text-white/70 text-center mb-12">Discover what makes us the best choice for your fitness journey</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Trusted Platform</h3>
                  <p className="text-white/70">Verified listings and secure bookings for your peace of mind</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Quality Assured</h3>
                  <p className="text-white/70">Only the best fitness and wellness centers make it to our platform</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Community Driven</h3>
                  <p className="text-white/70">Join a thriving community of fitness enthusiasts</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Instant Access</h3>
                  <p className="text-white/70">Quick and easy booking process for all services</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Events />
        
        {/* Call to Action Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0a0118] to-purple-900 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl text-white/70 mb-8">Join thousands of satisfied users who have transformed their lives through our platform</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">Learn More</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;