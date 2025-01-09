import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Database } from "@/integrations/supabase/types";

type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row'];

const PricingPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price');
      
      if (error) throw error;
      return data as SubscriptionPlan[];
    },
  });

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      toast.error("Please sign in to subscribe to a plan");
      navigate("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*, companies(*)")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_company_account) {
      toast.error("Only company accounts can subscribe to plans");
      return;
    }

    if (!profile.companies?.[0]?.id) {
      toast.error("Please complete your company profile first");
      navigate("/company/profile");
      return;
    }

    // TODO: Implement Stripe integration
    toast.info("Payment integration coming soon!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading plans...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Choose the Perfect Plan for Your Business
          </h1>
          <p className="text-lg text-muted-foreground">
            Scale your hiring with our flexible subscription plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans?.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.type === 'premium' ? 'border-primary shadow-lg' : ''
              }`}
            >
              {plan.type === 'premium' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  {plan.price === 0 ? (
                    "Free"
                  ) : (
                    <span className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-sm font-normal">/month</span>
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  {plan.features && typeof plan.features === 'object' && (
                    <>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>
                          {(plan.features as any).job_posts === -1
                            ? "Unlimited job posts"
                            : `${(plan.features as any).job_posts} job posts`}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>
                          {(plan.features as any).featured_posts === -1
                            ? "Unlimited featured posts"
                            : `${(plan.features as any).featured_posts} featured posts`}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>
                          {(plan.features as any).candidate_filters} candidate filters
                        </span>
                      </li>
                      {(plan.features as any).analytics && (
                        <li className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span>Analytics dashboard</span>
                        </li>
                      )}
                      {(plan.features as any).priority_support && (
                        <li className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span>Priority support</span>
                        </li>
                      )}
                      {(plan.features as any).custom_branding && (
                        <li className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span>Custom branding</span>
                        </li>
                      )}
                    </>
                  )}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.type === 'premium' ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.type === 'free' ? 'Get Started' : 'Subscribe'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Enterprise Solutions</h2>
          <p className="text-muted-foreground mb-8">
            Need a custom solution? Contact us for enterprise pricing and features.
          </p>
          <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
            Contact Sales
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;