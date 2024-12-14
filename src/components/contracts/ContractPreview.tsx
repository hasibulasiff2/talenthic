import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContractFormData } from "@/types/contracts";
import { formatCurrency } from "@/lib/utils";

interface ContractPreviewProps {
  data: ContractFormData;
  onBack: () => void;
  onConfirm: () => void;
}

export const ContractPreview = ({
  data,
  onBack,
  onConfirm,
}: ContractPreviewProps) => {
  const contractTypes = {
    standard: "Standard Contract",
    nda: "Non-Disclosure Agreement",
    fixed_price: "Fixed Price Contract",
    hourly_rate: "Hourly Rate Contract",
    milestone_based: "Milestone Based Contract",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contract Preview</h2>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack}>
            Back to Edit
          </Button>
          <Button onClick={onConfirm}>Confirm & Create</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>
            {contractTypes[data.type]} {data.requires_signature && "• Requires Signature"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Payment Terms</h3>
            <p>
              Type: {data.payment_type === "fixed" ? "Fixed Price" : "Hourly Rate"}
            </p>
            <p>
              Amount:{" "}
              {data.payment_type === "fixed"
                ? formatCurrency(data.fixed_amount || 0, data.currency)
                : `${formatCurrency(data.hourly_rate || 0, data.currency)}/hr`}
            </p>
            {data.payment_schedule && (
              <p>Payment Schedule: {data.payment_schedule}</p>
            )}
          </div>

          {data.duration && (
            <div>
              <h3 className="font-semibold mb-2">Duration</h3>
              <p>{data.duration}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Contract Terms</h3>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
              {data.terms}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};