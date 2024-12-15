import { useNavigate } from "react-router-dom";
import { Clock, Target, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Contract {
  id: string;
  title: string;
  status: string;
  duration: string | null;
  payment_type: string;
  fixed_amount: number | null;
  hourly_rate: number | null;
  company: {
    name: string;
    logo_url: string | null;
  };
  intern: {
    full_name: string;
  };
}

interface ContractsListProps {
  contracts: Contract[];
}

export const ContractsList = ({ contracts }: ContractsListProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contracts.map((contract) => (
        <Card 
          key={contract.id} 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate(`/collaboration/contracts/${contract.id}`)}
        >
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                {contract.status}
              </Badge>
              <Badge variant="outline">
                {contract.payment_type === "fixed" ? "Fixed Price" : "Hourly Rate"}
              </Badge>
            </div>
            <CardTitle className="text-xl">{contract.title || "Contract"}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {contract.company?.name} • {contract.intern?.full_name}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="font-medium">{contract.duration || "N/A"}</div>
              </div>
              <div className="text-center">
                <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium capitalize">{contract.payment_type}</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm text-muted-foreground">
                  {contract.payment_type === "fixed" ? "Fixed" : "Rate"}
                </div>
                <div className="font-medium">
                  {contract.payment_type === "fixed" 
                    ? `$${contract.fixed_amount || 0}` 
                    : `$${contract.hourly_rate || 0}/hr`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};