import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccountTypeSelect } from "@/components/auth/AccountTypeSelect";
import { RegistrationForm } from "@/components/auth/RegistrationForm";
import Header from "@/components/Header";

const LoginPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"login" | "register" | "account-type">("login");
  const [accountType, setAccountType] = useState<"user" | "business" | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {view === "login" && "Welcome to Talenthic"}
                {view === "register" && "Create Your Account"}
                {view === "account-type" && "Choose Account Type"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {view === "login" && (
                <div className="space-y-6">
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="light"
                    providers={[]}
                    view="sign_in"
                  />
                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => setView("account-type")}
                    >
                      Don't have an account? Sign up
                    </Button>
                  </div>
                </div>
              )}

              {view === "account-type" && (
                <div className="space-y-6">
                  <AccountTypeSelect
                    onSelect={(type) => {
                      setAccountType(type);
                      setView("register");
                    }}
                  />
                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => setView("login")}
                    >
                      Already have an account? Sign in
                    </Button>
                  </div>
                </div>
              )}

              {view === "register" && accountType && (
                <div className="space-y-6">
                  <RegistrationForm type={accountType} />
                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => setView("login")}
                    >
                      Already have an account? Sign in
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;