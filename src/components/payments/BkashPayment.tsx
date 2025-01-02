import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  phone: z.string().min(11).max(11),
  pin: z.string().min(4).max(6),
  amount: z.string(),
});

interface BkashPaymentProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}

export default function BkashPayment({ bookingId, amount, onSuccess }: BkashPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      pin: "",
      amount: amount.toString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsProcessing(true);

      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        setIsProcessing(false);
        toast("Payment timeout. Please try again");
      }, 30000);

      // Get payment method id for bKash
      const { data: paymentMethods, error: methodError } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('name', 'bKash')
        .maybeSingle();

      if (methodError || !paymentMethods) {
        throw new Error("Payment method not found");
      }

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          amount: values.amount,
          booking_id: bookingId,
          payment_method_id: paymentMethods.id,
          status: "completed",
          transaction_id: `BK${Date.now()}`,
        });

      if (paymentError) throw paymentError;

      // Update booking status
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ status: "confirmed", payment_status: "completed" })
        .eq('id', bookingId);

      if (bookingError) throw bookingError;

      clearTimeout(timeoutId);
      toast("Payment successful!");
      onSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      toast("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>bKash Number</FormLabel>
              <FormControl>
                <Input placeholder="01XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIN</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter PIN" {...field} />
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
                <Input type="number" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay with bKash"
          )}
        </Button>
      </form>
    </Form>
  );
}