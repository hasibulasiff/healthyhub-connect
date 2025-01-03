import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BkashPayment from "../payments/BkashPayment";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { z } from "zod";

interface BookingConfirmationProps {
  centerId: string;
  centerName: string;
  price: number;
  onSuccess?: () => void;
}

const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  notes: z.string().optional(),
});

export function BookingConfirmation({ centerId, centerName, price, onSuccess }: BookingConfirmationProps) {
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState<string>();
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const today = startOfDay(new Date());

  const handleBooking = async () => {
    try {
      if (!user) {
        toast.error("Please login to make a booking");
        return;
      }

      const result = bookingSchema.safeParse({ date, notes });
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      if (date && isBefore(date, today)) {
        toast.error("Please select a future date");
        return;
      }

      setIsLoading(true);

      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          center_id: centerId,
          user_id: user.id,
          booking_date: date?.toISOString(),
          notes,
          price,
          status: "pending",
          payment_status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      setBookingId(booking.id);
      setShowPayment(true);
      toast.success("Booking created successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast.success("Booking confirmed!");
    onSuccess?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showPayment ? (
          <>
            <div>
              <h3 className="font-medium mb-2">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => isBefore(date, today)}
                initialFocus
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Additional Notes</h3>
              <Textarea
                placeholder="Any special requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Center:</span>
                <span>{centerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Date:</span>
                <span>{date ? format(date, "PPP") : "Not selected"}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>৳{price}</span>
              </div>
            </div>

            <Button 
              onClick={handleBooking} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </>
        ) : (
          bookingId && (
            <BkashPayment
              bookingId={bookingId}
              amount={price}
              onSuccess={handlePaymentSuccess}
            />
          )
        )}
      </CardContent>
    </Card>
  );
}