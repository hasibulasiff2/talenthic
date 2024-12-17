import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Bank } from "lucide-react";

export const PaymentMethodsList = () => {
  const { data: paymentMethods, isLoading } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) throw new Error("Not authenticated");

      // This will be replaced with actual Stripe payment methods fetch
      // once the Stripe integration is complete
      return [
        { id: 1, type: "card", last4: "4242", brand: "visa" },
        { id: 2, type: "bank_account", last4: "1234", bank_name: "Chase" },
      ];
    },
  });

  const handleRemoveMethod = async (methodId: number) => {
    try {
      // This will be replaced with actual Stripe payment method removal
      // once the Stripe integration is complete
      toast.success("Payment method removed successfully");
    } catch (error) {
      toast.error("Failed to remove payment method");
    }
  };

  if (isLoading) {
    return <div>Loading payment methods...</div>;
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="w-6 h-6" />;
      case "bank_account":
        return <Bank className="w-6 h-6" />;
      default:
        return <Wallet className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      {paymentMethods?.map((method) => (
        <Card key={method.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              {getMethodIcon(method.type)}
              <div>
                <p className="font-medium">
                  {method.type === "card" ? (
                    <>
                      {method.brand.toUpperCase()} •••• {method.last4}
                    </>
                  ) : (
                    <>
                      {method.bank_name} •••• {method.last4}
                    </>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {method.type === "card" ? "Credit Card" : "Bank Account"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveMethod(method.id)}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};