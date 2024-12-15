import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractTemplate, ContractType } from "@/types/contracts";
import { FileText, Plus } from "lucide-react";

interface TemplateStepProps {
  type: ContractType;
  onSelect: (templateId: string | null) => void;
  onSkip: () => void;
}

export const TemplateStep = ({ type, onSelect, onSkip }: TemplateStepProps) => {
  const { data: templates, isLoading } = useQuery({
    queryKey: ["contract-templates", type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contract_templates")
        .select("*")
        .eq("type", type)
        .order("name");
      if (error) throw error;
      return data as ContractTemplate[];
    },
  });

  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-muted-foreground">
          Start with a template or create from scratch
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelect(null)}
        >
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Start from Scratch</CardTitle>
                <CardDescription>Create a custom contract</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {templates?.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(template.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={onSkip}>
          Skip template selection
        </Button>
      </div>
    </div>
  );
};