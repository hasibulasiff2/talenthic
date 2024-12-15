import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepsProps {
  currentStep: number;
  className?: string;
  children: React.ReactNode;
}

interface StepProps {
  title: string;
  description?: string;
}

export const Steps = ({ currentStep, className, children }: StepsProps) => {
  const steps = React.Children.toArray(children);

  return (
    <div className={cn("flex justify-between", className)}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center",
            index < steps.length - 1 &&
              "w-full after:content-[''] after:w-full after:h-[2px] after:border-b after:border-gray-300 after:border-4 after:inline-block"
          )}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export const Step = ({ title, description }: StepProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="min-w-[2rem] min-h-[2rem] flex items-center justify-center bg-primary text-white rounded-full">
        <Check className="w-4 h-4" />
      </div>
      <div className="text-center">
        <div className="text-sm font-medium">{title}</div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
};