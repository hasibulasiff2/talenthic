import { useQuery } from "@tanstack/react-query";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  salary_range?: string;
  duration?: string;
  budget_range?: string;
  skills?: string;
  category?: string;
  application_deadline?: string;
}

interface FormFieldsProps {
  type: "internship" | "gig";
  form: UseFormReturn<FormData>;
}

export const FormFields = ({ type, form }: FormFieldsProps) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .in("type", [type, "both"]);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                placeholder="Enter detailed description"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {type === "internship" && (
        <>
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter requirements"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $1000-$2000/month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {type === "gig" && (
        <FormField
          control={form.control}
          name="budget_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range</FormLabel>
              <FormControl>
                <Input placeholder="e.g., $500-$1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 3 months" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Required Skills</FormLabel>
            <FormControl>
              <Input placeholder="Enter skills, separated by commas" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="application_deadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Deadline</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};