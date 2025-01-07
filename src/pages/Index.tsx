import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import VisionSection from "@/components/vision/VisionSection";

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSearch />
        </motion.div>

        <TestimonialsSection />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white">
            <div className="relative">
              <FeaturedListings />
              <Categories />
              <EventsSection />
            </div>
          </div>
        </motion.div>

        <VisionSection />

        {/* Lead Capture Form */}
        <motion.section 
          className="py-20 px-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Fitness Journey?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join our newsletter and get exclusive updates about new features and listings
            </motion.p>
            <motion.form 
              onSubmit={handleEmailSubmit} 
              className="flex gap-4 justify-center max-w-md mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
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
            </motion.form>
          </div>
        </motion.section>

        <FAQSection />

        {/* Call to Action Section */}
        <motion.section 
          className="py-20 px-4 text-center bg-gradient-to-r from-purple-50 to-pink-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-900"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Fitness Journey?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of satisfied users who have transformed their lives through our platform
            </motion.p>
            <motion.div 
              className="flex gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;