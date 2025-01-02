import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [verifying, setVerifying] = useState(true);
  const { verifyEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setVerifying(false);
        return;
      }

      try {
        await verifyEmail(token);
        setTimeout(() => navigate("/"), 2000);
      } catch (error: any) {
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [token, verifyEmail, toast, navigate]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-md mx-auto glass-effect p-8 rounded-lg shadow-lg text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
            <p className="text-muted-foreground">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto glass-effect p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-6">
            {token ? "Email Verified!" : "Invalid Verification Link"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {token
              ? "Your email has been successfully verified. You will be redirected shortly."
              : "The verification link appears to be invalid or has expired."}
          </p>
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;