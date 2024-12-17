import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentFormProps {
  contractId?: string;
  milestoneId?: string;
  timeLogId?: string;
  amount?: number;
  planId?: string;
  onSuccess?: () => void;
}

interface PaymentFormData {
  payment_method: string;
  payment_gateway: string;
}

export const PaymentForm = ({ 
  contractId, 
  milestoneId, 
  timeLogId, 
  amount,
  planId,
  onSuccess 
}: PaymentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<PaymentFormData>({
    defaultValues: {
      payment_method: "card",
      payment_gateway: "stripe",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    try {
      if (planId) {
        // Handle subscription payment
        const response = await fetch('/functions/v1/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({ planId })
        });

        const { url, error } = await response.json();
        
        if (error) throw new Error(error);
        if (url) window.location.href = url;
      } else if (contractId) {
        // Handle regular payment
        const { error } = await supabase.from("payments").insert({
          contract_id: contractId,
          milestone_id: milestoneId,
          time_log_id: timeLogId,
          amount,
          payment_method: data.payment_method,
          payment_gateway: data.payment_gateway,
          status: "pending",
        });

        if (error) throw error;

        toast.success("Payment initiated successfully");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {amount && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Amount to be paid</p>
            <p className="text-lg font-semibold">${amount}</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Proceed to Payment"}
        </Button>
      </form>
    </Form>
  );
};