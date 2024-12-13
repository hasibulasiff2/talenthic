import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Play, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const TimeTracking = () => {
  const { id: contractId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isTracking, setIsTracking] = useState(false);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);

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

  const { data: timeLogs } = useQuery({
    queryKey: ["time-logs", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_logs")
        .select("*")
        .eq("contract_id", contractId)
        .order("start_time", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createTimeLogMutation = useMutation({
    mutationFn: async (data: {
      contract_id: string;
      start_time: Date;
      end_time: Date;
      description: string;
      hours_logged: number;
    }) => {
      const { error } = await supabase.from("time_logs").insert({
        contract_id: data.contract_id,
        start_time: data.start_time.toISOString(),
        end_time: data.end_time.toISOString(),
        description: data.description,
        hours_logged: data.hours_logged,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-logs"] });
      toast.success("Time log saved successfully");
      setDescription("");
    },
    onError: () => {
      toast.error("Failed to save time log");
    },
  });

  const handleStartTracking = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStopTracking = async () => {
    if (!startTime || !contractId) return;

    const endTime = new Date();
    const hoursLogged = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    createTimeLogMutation.mutate({
      contract_id: contractId,
      start_time: startTime,
      end_time: endTime,
      description,
      hours_logged: Number(hoursLogged.toFixed(2)),
    });

    setIsTracking(false);
    setStartTime(null);
  };

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                Time Tracking
              </h1>
              <p className="text-muted-foreground">
                Track your work hours for {contract?.title}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate(`/collaboration/contracts/${contractId}`)}>
              Back to Contract
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Track Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="What are you working on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isTracking}
                />
                <div className="flex justify-end">
                  {!isTracking ? (
                    <Button onClick={handleStartTracking}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Tracking
                    </Button>
                  ) : (
                    <Button onClick={handleStopTracking} variant="destructive">
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Tracking
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeLogs?.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">
                        {new Date(log.start_time).toLocaleDateString()}{" "}
                        {new Date(log.start_time).toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{log.hours_logged} hours</div>
                      <Badge variant="outline">{log.status}</Badge>
                    </div>
                  </div>
                ))}
                {(!timeLogs || timeLogs.length === 0) && (
                  <p className="text-center text-muted-foreground py-8">
                    No time logs recorded yet
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

export default TimeTracking;