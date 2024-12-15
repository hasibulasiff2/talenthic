import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/collaboration/ErrorBoundary";
import { LoadingState } from "@/components/collaboration/LoadingState";
import { EmptyState } from "@/components/collaboration/EmptyState";
import { ContractsList } from "@/components/collaboration/ContractsList";
import { useRealtimeUpdates } from "@/hooks/use-realtime-updates";
import { toast } from "sonner";

const CollaborationHub = () => {
  const navigate = useNavigate();
  
  const { data: contracts, isLoading, error, refetch } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          company:companies(*),
          intern:profiles(*)
        `)
        .or(`intern_id.eq.${profile.user.id},company_id.in.(select id from companies where id in (select company_id from profiles where id = ${profile.user.id}))`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  useRealtimeUpdates(
    { table: "contracts" },
    () => {
      refetch();
      toast.success("Contract updated");
    }
  );

  if (error) {
    return (
      <div className="min-h-screen bg-accent">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Error loading contracts</h2>
            <p className="text-muted-foreground mb-4">
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Collaboration Hub
            </h1>
            <p className="text-muted-foreground">
              Manage your contracts and collaborations
            </p>
          </div>
          <Button onClick={() => navigate("/collaboration/contracts/create")}>
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>

        <ErrorBoundary>
          {isLoading ? (
            <LoadingState />
          ) : !contracts?.length ? (
            <EmptyState
              title="No contracts found"
              description="Get started by creating your first contract"
              actionLabel="Create Contract"
              onAction={() => navigate("/collaboration/contracts/create")}
            />
          ) : (
            <ContractsList contracts={contracts} />
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default CollaborationHub;