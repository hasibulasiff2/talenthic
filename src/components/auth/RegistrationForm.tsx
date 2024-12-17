import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RegistrationFormProps {
  type: "user" | "business";
}

interface UserFormData {
  full_name: string;
  email: string;
  password: string;
  contact_number?: string;
  education_background?: {
    degree?: string;
    university?: string;
    graduation_year?: string;
  };
  portfolio_links?: string[];
}

interface BusinessFormData {
  business_name: string;
  contact_person_name: string;
  email: string;
  password: string;
  website?: string;
  industry_type?: string;
  business_address?: string;
  description?: string;
}

export const RegistrationForm = ({ type }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormData | BusinessFormData>();

  const onSubmit = async (data: UserFormData | BusinessFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: (data as any).password,
        options: {
          data: {
            account_type: type,
            ...(type === "user" 
              ? { 
                  full_name: (data as UserFormData).full_name,
                  contact_number: (data as UserFormData).contact_number,
                  education_background: (data as UserFormData).education_background,
                  portfolio_links: (data as UserFormData).portfolio_links,
                }
              : {
                  business_name: (data as BusinessFormData).business_name,
                  contact_person_name: (data as BusinessFormData).contact_person_name,
                  website: (data as BusinessFormData).website,
                  industry_type: (data as BusinessFormData).industry_type,
                  business_address: (data as BusinessFormData).business_address,
                  description: (data as BusinessFormData).description,
                }
            ),
          },
        },
      });

      if (error) throw error;

      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {type === "user" ? (
          <>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_person_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person name" {...field} />
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
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your company..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};