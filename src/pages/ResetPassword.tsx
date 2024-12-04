import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset logic
    toast({
      title: "Password Reset Attempted",
      description: "Please connect Supabase to enable password reset functionality.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto glass-effect p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
          <p className="text-center text-muted-foreground mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-primary hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;