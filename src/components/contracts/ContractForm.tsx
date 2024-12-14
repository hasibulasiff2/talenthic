import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ContractFormFields } from "./ContractFormFields";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContractPreview } from "./ContractPreview";
import { ContractFormData } from "@/types/contracts";
import { useQuery } from "@tanstack/react-query";

const ContractForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { session } = useAuth();

  const form = useForm<ContractFormData>({
    defaultValues: {
      title: "",
      terms: "",
      payment_type: "fixed",
      currency: "USD",
      type: "standard",
      requires_signature: true,
    },
  });

  const { data: selectedTemplate } = useQuery({
    queryKey: ["contract-template", form.watch("template_id")],
    queryFn: async () => {
      if (!form.watch("template_id")) return null;
      const { data, error } = await supabase
        .from("contract_templates")
        .select("*")
        .eq("id", form.watch("template_id"))
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!form.watch("template_id"),
  });

  useEffect(() => {
    if (selectedTemplate) {
      form.setValue("terms", selectedTemplate.content);
      form.setValue("type", selectedTemplate.type);
    }
  }, [selectedTemplate, form]);

  const onSubmit = async (data: ContractFormData) => {
    setIsSubmitting(true);
    try {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) {
        toast.error("Please sign in to create a contract");
        navigate("/login");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(`*, companies(*)`)
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
        template_id: data.template_id || null,
        type: data.type,
        requires_signature: data.requires_signature,
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

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {showPreview ? (
          <ContractPreview
            data={form.getValues()}
            onBack={() => setShowPreview(false)}
            onConfirm={form.handleSubmit(onSubmit)}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ContractFormFields form={form} />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="button" variant="secondary" onClick={handlePreview}>
                  Preview
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Contract"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContractForm;