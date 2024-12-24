import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface ApplicationFormProps {
  internshipId?: string;
  onSuccess?: () => void;
}

interface FormData {
  cover_letter: string;
}

export const ApplicationForm = ({ internshipId, onSuccess }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  const form = useForm<FormData>({
    defaultValues: {
      cover_letter: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.id) {
      toast.error("Please sign in to apply");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("applications").insert({
        internship_id: internshipId,
        applicant_id: session.user.id,
        cover_letter: data.cover_letter,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Application submitted successfully!");
      onSuccess?.();
      form.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cover_letter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you're interested in this position..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
};