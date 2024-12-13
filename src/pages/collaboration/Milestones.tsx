import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface MilestoneFormData {
  title: string;
  description: string;
  amount: number;
  due_date: string;
}

const Milestones = () => {
  const { id: contractId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<MilestoneFormData>({
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
      due_date: "",
    },
  });

  const { data: contract } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*, company:companies(*)")
        .eq("id", contractId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: milestones } = useQuery({
    queryKey: ["milestones", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("milestones")
        .select("*")
        .eq("contract_id", contractId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const createMilestoneMutation = useMutation({
    mutationFn: async (data: MilestoneFormData) => {
      const { error } = await supabase.from("milestones").insert({
        contract_id: contractId,
        ...data,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      toast.success("Milestone created successfully");
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Failed to create milestone");
    },
  });

  const onSubmit = (data: MilestoneFormData) => {
    createMilestoneMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                Milestones
              </h1>
              <p className="text-muted-foreground">
                Manage milestones for {contract?.title}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate(`/collaboration/contracts/${contractId}`)}
              >
                Back to Contract
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Milestone
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Milestone</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter milestone title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter milestone description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="due_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createMilestoneMutation.isPending}
                        >
                          {createMilestoneMutation.isPending
                            ? "Creating..."
                            : "Create Milestone"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones?.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{milestone.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {milestone.description}
                      </div>
                      {milestone.due_date && (
                        <div className="text-sm text-muted-foreground">
                          Due: {new Date(milestone.due_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${milestone.amount}</div>
                      <Badge variant="outline">{milestone.status}</Badge>
                    </div>
                  </div>
                ))}
                {(!milestones || milestones.length === 0) && (
                  <p className="text-center text-muted-foreground py-8">
                    No milestones created yet
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

export default Milestones;