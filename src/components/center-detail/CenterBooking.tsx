import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail } from "lucide-react";
import { BookingConfirmation } from "../bookings/BookingConfirmation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CenterBookingProps {
  centerId: string;
  centerName: string;
  contact: {
    phone: string;
    email: string;
  };
  price: number;
}

export function CenterBooking({ centerId, centerName, contact, price }: CenterBookingProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (!user) {
      toast.error("Please login to make a booking");
      navigate("/login");
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Contact & Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-white/70">
          <Phone className="w-4 h-4" />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Mail className="w-4 h-4" />
          <span>{contact.email}</span>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={handleBookingClick}
              className="w-full mb-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            >
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <BookingConfirmation
              centerId={centerId}
              centerName={centerName}
              price={price}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Button 
          variant="outline" 
          className="w-full border-white/20 hover:bg-white/10"
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-white">Schedule Tour</span>
        </Button>
      </CardContent>
    </Card>
  );
}