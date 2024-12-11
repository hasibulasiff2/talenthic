import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { FormFields } from "./FormFields";

interface PostingFormProps {
  type: "internship" | "gig";
}

interface FormData {
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  salary_range?: string;
  duration?: string;
  budget_range?: string;
  skills?: string;
}

const PostingForm = ({ type }: PostingFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary_range: "",
      duration: "",
      budget_range: "",
      skills: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please sign in to post an opportunity");
        navigate("/login");
        return;
      }

      // First, get the user's profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*, companies!profiles(id)")
        .eq("id", user.id)
        .single();

      if (!profile) {
        toast.error("Profile not found");
        return;
      }

      if (!profile.is_company_account) {
        toast.error("You need a company account to post opportunities");
        return;
      }

      const company = profile.companies?.[0];
      if (!company?.id) {
        toast.error("Please complete your company profile first");
        navigate("/company/profile");
        return;
      }

      // Create the posting
      const table = type === "internship" ? "internships" : "gigs";
      const { error } = await supabase.from(table).insert({
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        location: data.location,
        salary_range: data.salary_range,
        duration: data.duration,
        budget_range: data.budget_range,
        skills: data.skills?.split(",").map((skill) => skill.trim()),
        company_id: company.id,
        status: "active",
      });

      if (error) throw error;

      toast.success(`${type === "internship" ? "Internship" : "Gig"} posted successfully!`);
      navigate(`/${type}s`);
    } catch (error) {
      console.error("Error posting opportunity:", error);
      toast.error("Failed to post opportunity. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormFields type={type} form={form} />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Opportunity"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PostingForm;