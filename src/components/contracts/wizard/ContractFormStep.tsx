import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ContractFormData } from "@/types/contracts";
import { ContractFormFields } from "../ContractFormFields";

interface ContractFormStepProps {
  form: UseFormReturn<ContractFormData>;
  onBack: () => void;
  onPreview: () => void;
}

export const ContractFormStep = ({
  form,
  onBack,
  onPreview,
}: ContractFormStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Contract Details</h2>
        <p className="text-muted-foreground">
          Fill in the details of your contract
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <ContractFormFields form={form} />
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="button" onClick={onPreview}>
              Preview Contract
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};