import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContractFormData {
  title: string;
  terms: string;
  payment_type: "fixed" | "hourly";
  fixed_amount?: number;
  hourly_rate?: number;
  duration?: string;
  currency: string;
  payment_schedule?: string;
}

const CreateContract = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContractFormData>({
    defaultValues: {
      title: "",
      terms: "",
      payment_type: "fixed",
      currency: "USD",
    },
  });

  const onSubmit = async (data: ContractFormData) => {
    setIsSubmitting(true);
    try {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) {
        toast.error("Please sign in to create a contract");
        navigate("/login");
        return;
      }

      // Get the user's profile with company relationship
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(`
          *,
          companies(*)
        `)
        .eq("id", profile.user.id)
        .single();

      if (profileError || !profileData) {
        toast.error("Profile not found");
        return;
      }

      if (!profileData.is_company_account) {
        toast.error("Only company accounts can create contracts");
        return;
      }

      const company = profileData.companies?.[0];
      if (!company?.id) {
        toast.error("Please complete your company profile first");
        navigate("/company/profile");
        return;
      }

      const { error } = await supabase.from("contracts").insert({
        company_id: company.id,
        title: data.title,
        terms: data.terms,
        payment_type: data.payment_type,
        fixed_amount: data.payment_type === "fixed" ? data.fixed_amount : null,
        hourly_rate: data.payment_type === "hourly" ? data.hourly_rate : null,
        duration: data.duration,
        currency: data.currency,
        payment_schedule: data.payment_schedule,
        status: "draft",
      });

      if (error) throw error;

      toast.success("Contract created successfully!");
      navigate("/collaboration");
    } catch (error) {
      console.error("Error creating contract:", error);
      toast.error("Failed to create contract. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentType = form.watch("payment_type");

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-secondary mb-4">
            Create New Contract
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Set up a new contract for collaboration
          </p>

          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contract title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Terms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter contract terms and conditions"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payment_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="hourly">Hourly Rate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {paymentType === "fixed" && (
                    <FormField
                      control={form.control}
                      name="fixed_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fixed Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter fixed amount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {paymentType === "hourly" && (
                    <FormField
                      control={form.control}
                      name="hourly_rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter hourly rate"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 3 months"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payment_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Schedule (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Monthly, Bi-weekly"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Contract"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateContract;