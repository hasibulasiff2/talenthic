import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Application {
  id: string;
  internship: {
    title: string;
    company: {
      name: string;
    };
  };
  status: string;
  created_at: string;
}

const UserDashboard = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications", session?.id],
    queryFn: async () => {
      if (!session) return [];

      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          internship:internships (
            title,
            company:companies (
              name
            )
          )
        `)
        .eq("applicant_id", session.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container py-10">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading applications...</div>
            ) : applications?.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No applications yet. Start applying to internships and gigs!
              </div>
            ) : (
              <div className="space-y-4">
                {applications?.map((application: Application) => (
                  <Card key={application.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-semibold">
                          {application.internship.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {application.internship.company.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied on: {new Date(application.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;