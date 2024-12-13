import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

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
  );
};

export default LeadCapture;