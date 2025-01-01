import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

const EmailVerification = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const handleResendVerification = async () => {
    if (!session?.email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: session.email,
      });

      if (error) throw error;

      toast.success("Verification email sent");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="container max-w-md py-20">
      <Card>
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Please verify your email address to continue. Check your inbox for the verification link.
          </p>
          <Button
            onClick={handleResendVerification}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Resend Verification Email"}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;