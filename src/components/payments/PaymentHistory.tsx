import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PaymentHistoryProps {
  contractId: string;
}

export const PaymentHistory = ({ contractId }: PaymentHistoryProps) => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("contract_id", contractId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading payment history...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                {new Date(payment.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell className="capitalize">{payment.payment_method}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    payment.status === "completed"
                      ? "success"
                      : payment.status === "failed"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {(!payments || payments.length === 0) && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No payment history available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};