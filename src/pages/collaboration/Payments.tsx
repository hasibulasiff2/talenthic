import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Payments = () => {
  const { id: contractId } = useParams();
  const navigate = useNavigate();

  const { data: contract } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*, company:companies(*), intern:profiles(*)")
        .eq("id", contractId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["payments", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          milestone:milestones(*),
          time_log:time_logs(*)
        `)
        .eq("contract_id", contractId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

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
                Payment history for {contract?.title}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(`/collaboration/contracts/${contractId}`)}
            >
              Back to Contract
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="font-medium">
                    ${contract?.fixed_amount || contract?.hourly_rate || 0}
                    {contract?.payment_type === "hourly" && "/hr"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Total Paid</div>
                  <div className="font-medium">
                    ${payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    Payment Method
                  </div>
                  <div className="font-medium">
                    {contract?.payment_type === "fixed" ? "Fixed Price" : "Hourly Rate"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments?.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">
                        Payment for{" "}
                        {payment.milestone
                          ? payment.milestone.title
                          : payment.time_log
                          ? `${payment.time_log.hours_logged} hours`
                          : "Contract"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${payment.amount}</div>
                      <Badge variant="outline">{payment.status}</Badge>
                    </div>
                  </div>
                ))}
                {(!payments || payments.length === 0) && (
                  <p className="text-center text-muted-foreground py-8">
                    No payments recorded yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Payments;