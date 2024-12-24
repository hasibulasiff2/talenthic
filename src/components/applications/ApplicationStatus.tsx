import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface ApplicationStatusProps {
  internshipId: string;
}

export const ApplicationStatus = ({ internshipId }: ApplicationStatusProps) => {
  const { session } = useAuth();

  const { data: application, isLoading } = useQuery({
    queryKey: ["application", internshipId],
    queryFn: async () => {
      if (!session) return null;

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("internship_id", internshipId)
        .eq("applicant_id", session.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session && !!internshipId,
  });

  if (isLoading || !application) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge
          variant={
            application.status === "accepted"
              ? "success"
              : application.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </Badge>
      </CardContent>
    </Card>
  );
};