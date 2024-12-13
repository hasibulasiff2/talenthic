import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Clock, Target, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CollaborationHub = () => {
  const navigate = useNavigate();
  
  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) throw new Error("Not authenticated");

      const { data: contracts, error } = await supabase
        .from("contracts")
        .select(`
          *,
          company:companies(*),
          intern:profiles(*)
        `)
        .or(`intern_id.eq.${profile.user.id},company_id.in.(select id from companies where id in (select company_id from profiles where id = ${profile.user.id}))`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return contracts;
    },
  });

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">Collaboration Hub</h1>
            <p className="text-muted-foreground">Manage your contracts and collaborations</p>
          </div>
          <Button onClick={() => navigate("/collaboration/contracts/create")}>
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-200" />
                <CardContent className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts?.map((contract) => (
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
                      <div className="text-sm text-muted-foreground">Milestones</div>
                      <div className="font-medium">0</div>
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
        )}
      </main>
    </div>
  );
};

export default CollaborationHub;