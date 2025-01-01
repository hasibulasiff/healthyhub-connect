import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const bkashFormSchema = z.object({
  phoneNumber: z.string().min(11).max(11),
  amount: z.number().min(0),
});

interface BkashPaymentProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}

export function BkashPayment({ bookingId, amount, onSuccess }: BkashPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof bkashFormSchema>>({
    resolver: zodResolver(bkashFormSchema),
    defaultValues: {
      phoneNumber: "",
      amount: amount,
    },
  });

  const onSubmit = async (values: z.infer<typeof bkashFormSchema>) => {
    try {
      setIsProcessing(true);

      // Get payment method id for bKash
      const { data: paymentMethods } = await supabase
        .from("payment_methods")
        .select("id")
        .eq("name", "bKash")
        .single();

      if (!paymentMethods?.id) {
        throw new Error("Payment method not found");
      }

      // Create payment record
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .insert({
          booking_id: bookingId,
          amount: values.amount,
          payment_method_id: paymentMethods.id,
          transaction_id: `BK${Date.now()}`, // In real implementation, this would come from bKash API
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      // Update booking payment status
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({ payment_status: "completed" })
        .eq("id", bookingId);

      if (bookingError) throw bookingError;

      toast.success("Payment successful!");
      onSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>bKash Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="01XXXXXXXXX" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (BDT)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay with bKash"}
        </Button>
      </form>
    </Form>
  );
}