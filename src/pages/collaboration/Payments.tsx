import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { PaymentForm } from "@/components/payments/PaymentForm";
import { PaymentHistory } from "@/components/payments/PaymentHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PaymentsPage = () => {
  const { id: contractId } = useParams();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const { data: contract } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          company:companies(*),
          milestones(*)
        `)
        .eq("id", contractId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const totalAmount = contract?.payment_type === "fixed" 
    ? contract.fixed_amount 
    : contract?.milestones?.reduce((sum, milestone) => sum + (milestone.amount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                Payments
              </h1>
              <p className="text-muted-foreground">
                Manage payments for {contract?.title}
              </p>
            </div>
            <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
              <DialogTrigger asChild>
                <Button>Make Payment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Payment</DialogTitle>
                </DialogHeader>
                <PaymentForm
                  contractId={contractId || ""}
                  amount={totalAmount}
                  onSuccess={() => setShowPaymentForm(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Contract Type</p>
                    <p className="text-lg font-semibold capitalize">
                      {contract?.payment_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-semibold">
                      ${totalAmount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentHistory contractId={contractId || ""} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentsPage;