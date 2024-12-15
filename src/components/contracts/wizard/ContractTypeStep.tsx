import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, DollarSign, Clock, Target } from "lucide-react";
import { ContractType } from "@/types/contracts";

interface ContractTypeStepProps {
  onSelect: (type: ContractType) => void;
}

export const ContractTypeStep = ({ onSelect }: ContractTypeStepProps) => {
  const contractTypes = [
    {
      type: "standard" as ContractType,
      title: "Standard Contract",
      description: "Basic contract template for general purposes",
      icon: FileText,
    },
    {
      type: "nda" as ContractType,
      title: "Non-Disclosure Agreement",
      description: "Protect your confidential information",
      icon: Shield,
    },
    {
      type: "fixed_price" as ContractType,
      title: "Fixed Price Contract",
      description: "Set a fixed price for the entire project",
      icon: DollarSign,
    },
    {
      type: "hourly_rate" as ContractType,
      title: "Hourly Rate Contract",
      description: "Pay based on hours worked",
      icon: Clock,
    },
    {
      type: "milestone_based" as ContractType,
      title: "Milestone Based Contract",
      description: "Break down payments into milestones",
      icon: Target,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Contract Type</h2>
        <p className="text-muted-foreground">
          Choose the type of contract that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {contractTypes.map((type) => (
          <Card
            key={type.type}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(type.type)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};