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
import { Input } from "@/components/ui/input";
import { Shield, Trophy, Users, Zap, Star, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

const howItWorksSteps = [
  {
    title: "Sign Up",
    description: "Create your account and tell us about your fitness center or event",
    icon: <CheckCircle className="w-12 h-12 text-pink-500" />
  },
  {
    title: "List Your Space",
    description: "Add your fitness center, event, or trainer profile with detailed information",
    icon: <CheckCircle className="w-12 h-12 text-pink-500" />
  },
  {
    title: "Get Discovered",
    description: "Reach potential clients through our platform's search and recommendation system",
    icon: <CheckCircle className="w-12 h-12 text-pink-500" />
  },
  {
    title: "Grow Your Business",
    description: "Manage bookings, communicate with clients, and expand your reach",
    icon: <CheckCircle className="w-12 h-12 text-pink-500" />
  }
];

const features = [
  {
    feature: "Listing Management",
    healthyThako: "✓",
    others: "Limited"
  },
  {
    feature: "Real-time Chat",
    healthyThako: "✓",
    others: "×"
  },
  {
    feature: "Review System",
    healthyThako: "✓",
    others: "Basic"
  },
  {
    feature: "Event Management",
    healthyThako: "✓",
    others: "×"
  },
  {
    feature: "Analytics Dashboard",
    healthyThako: "✓",
    others: "Limited"
  }
];

const faqs = [
  {
    question: "How do I list my fitness center?",
    answer: "Simply sign up for an account, verify your business, and follow our easy listing process to showcase your facility."
  },
  {
    question: "What types of businesses can list?",
    answer: "We welcome gyms, yoga studios, sports centers, personal trainers, and fitness event organizers."
  },
  {
    question: "How much does it cost to list?",
    answer: "We offer flexible pricing plans starting with a free basic listing. Premium features are available with our paid plans."
  },
  {
    question: "Can I manage multiple locations?",
    answer: "Yes, our platform supports managing multiple locations under a single account."
  }
];

const Index = () => {
  const [isOwner, setIsOwner] = useState(false);
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

          {/* Testimonials Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Success Stories</h2>
              <p className="text-gray-600 text-center mb-12">See how our platform has helped businesses grow</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
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

          {/* How It Works Section */}
          <section className="py-20 px-4 bg-black text-white">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-pink-500">How It Works</h2>
              <p className="text-xl mb-12">Get started with HealthyThako in four simple steps</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-pink-500/10 p-4 mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-pink-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Comparison Chart */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose HealthyThako</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-6 py-3 text-left">Features</th>
                      <th className="px-6 py-3 text-center">HealthyThako</th>
                      <th className="px-6 py-3 text-center">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-6 py-4">{feature.feature}</td>
                        <td className="px-6 py-4 text-center text-green-500 font-bold">{feature.healthyThako}</td>
                        <td className="px-6 py-4 text-center text-gray-500">{feature.others}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* About Us / Vision Section */}
          <section className="py-20 px-4 bg-black text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-pink-500">Our Vision</h2>
                <p className="mb-6">
                  At Healthy Thako, we believe that everyone deserves access to quality fitness guidance and support. 
                  Our mission is to make health and fitness accessible, affordable, and simple for everyone.
                </p>
                <p className="mb-12">
                  We understand the unique challenges and preferences of our community, which is why we've created 
                  a platform that combines technology with cultural understanding to deliver the best possible fitness experience.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-gray-900 rounded-lg">
                    <h3 className="text-3xl font-bold text-pink-500 mb-2">10K+</h3>
                    <p className="text-gray-400">Active Users</p>
                  </div>
                  <div className="text-center p-6 bg-gray-900 rounded-lg">
                    <h3 className="text-3xl font-bold text-pink-500 mb-2">95%</h3>
                    <p className="text-gray-400">Success Rate</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-900 rounded-lg p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
                  <p className="text-gray-400">
                    We're committed to providing personalized fitness solutions that respect and incorporate 
                    local cultural elements while maintaining international standards of health and wellness.
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-500" />
                      Accessibility for all
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-500" />
                      Cultural sensitivity
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-500" />
                      Scientific approach
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-500" />
                      Continuous innovation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
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