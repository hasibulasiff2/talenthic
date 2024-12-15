import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ContractFormFields } from "@/components/contracts/ContractFormFields";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContractPreview } from "@/components/contracts/ContractPreview";
import { ContractFormData, ContractType } from "@/types/contracts";
import { useQuery } from "@tanstack/react-query";
import { ContractTypeStep } from "@/components/contracts/wizard/ContractTypeStep";
import { TemplateStep } from "@/components/contracts/wizard/TemplateStep";
import { ContractFormStep } from "@/components/contracts/wizard/ContractFormStep";
import { Steps, Step } from "@/components/ui/steps";
import Header from "@/components/Header";

const CreateContract = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [contractType, setContractType] = useState<ContractType | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleTypeSelect = (type: ContractType) => {
    setContractType(type);
    form.setValue("type", type);
    setCurrentStep(1);
  };

  const handleTemplateSelect = (templateId: string | null) => {
    form.setValue("template_id", templateId || undefined);
    setCurrentStep(2);
  };

  const handleSkipTemplate = () => {
    form.setValue("template_id", undefined);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      setCurrentStep((prev) => Math.max(0, prev - 1));
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const steps = [
    { title: "Type", description: "Select contract type" },
    { title: "Template", description: "Choose a template" },
    { title: "Details", description: "Fill contract details" },
  ];

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Steps currentStep={currentStep} className="mb-8">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </Steps>
          </div>

          <Card>
            <CardContent className="pt-6">
              {showPreview ? (
                <ContractPreview
                  data={form.getValues()}
                  onBack={handleBack}
                  onConfirm={form.handleSubmit(async (data) => {
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
                    }
                  })}
                />
              ) : (
                <>
                  {currentStep === 0 && (
                    <ContractTypeStep onSelect={handleTypeSelect} />
                  )}
                  {currentStep === 1 && contractType && (
                    <TemplateStep
                      type={contractType}
                      onSelect={handleTemplateSelect}
                      onSkip={handleSkipTemplate}
                    />
                  )}
                  {currentStep === 2 && (
                    <ContractFormStep
                      form={form}
                      onBack={handleBack}
                      onPreview={handlePreview}
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateContract;