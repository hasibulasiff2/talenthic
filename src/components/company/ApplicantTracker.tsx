import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface Application {
  id: string;
  status: string;
  created_at: string;
  internship: {
    title: string;
  } | null;
  applicant: {
    full_name: string;
    email: string;
  } | null;
}

export const ApplicantTracker = () => {
  const { user } = useAuth();

  const { data: applications } = useQuery({
    queryKey: ["applications", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          internship:internships(title),
          applicant:profiles(full_name, email)
        `)
        .eq("company_id", user?.id);

      if (error) throw error;
      return data as Application[];
    },
    enabled: !!user?.id,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicant Tracking System</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.applicant?.full_name}</TableCell>
                <TableCell>{application.internship?.title}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(application.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};