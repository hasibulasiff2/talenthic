import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Clock, Target, DollarSign, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContractDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: contract, isLoading } = useQuery({
    queryKey: ["contract", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          company:companies(*),
          intern:profiles(*),
          milestones(*),
          time_logs(*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-gray-200 rounded" />
              <div className="h-48 bg-gray-200 rounded" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-accent">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Contract not found</h1>
            <Button onClick={() => navigate("/collaboration")}>
              Back to Collaboration Hub
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-secondary">
                {contract.title || "Contract"}
              </h1>
              <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                {contract.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Between {contract.company?.name} and {contract.intern?.full_name}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/collaboration")}>
              Back
            </Button>
            {contract.status === "draft" && (
              <Button>Send to Intern</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="font-medium">{contract.duration || "N/A"}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-sm text-muted-foreground">Payment Type</div>
                <div className="font-medium">
                  {contract.payment_type === "fixed" ? "Fixed Price" : "Hourly Rate"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-sm text-muted-foreground">Amount</div>
                <div className="font-medium">
                  {contract.payment_type === "fixed"
                    ? `$${contract.fixed_amount || 0}`
                    : `$${contract.hourly_rate || 0}/hr`}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div className="font-medium">
                  {contract.start_date
                    ? new Date(contract.start_date).toLocaleDateString()
                    : "Not started"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="time">Time Tracking</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Contract Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">
                    {contract.terms}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Milestones</CardTitle>
                <Button
                  onClick={() => navigate(`/collaboration/contracts/${id}/milestones`)}
                >
                  Manage Milestones
                </Button>
              </CardHeader>
              <CardContent>
                {contract.milestones?.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No milestones created yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contract.milestones?.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{milestone.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {milestone.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${milestone.amount}
                          </div>
                          <Badge variant="outline">{milestone.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Time Tracking</CardTitle>
                <Button
                  onClick={() => navigate(`/collaboration/contracts/${id}/time`)}
                >
                  Track Time
                </Button>
              </CardHeader>
              <CardContent>
                {contract.time_logs?.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No time entries recorded yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contract.time_logs?.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {new Date(log.start_time).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {log.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {log.hours_logged} hours
                          </div>
                          <Badge variant="outline">{log.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payments</CardTitle>
                <Button
                  onClick={() => navigate(`/collaboration/contracts/${id}/payments`)}
                >
                  View Payments
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Payment history will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ContractDetails;