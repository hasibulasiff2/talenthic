import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface ApplicationStats {
  status: string;
  count: number;
}

export const AnalyticsDashboard = () => {
  const { user } = useAuth();

  const { data: analyticsData } = useQuery({
    queryKey: ["company-analytics", user?.id],
    queryFn: async () => {
      const { data: applications, error } = await supabase
        .from("applications")
        .select("created_at, status")
        .eq("company_id", user?.id);

      if (error) throw error;

      return {
        applications: applications || [],
      };
    },
    enabled: !!user?.id,
  });

  const applicationsByStatus = analyticsData?.applications.reduce((acc: Record<string, number>, curr) => {
    acc[curr.status || 'pending'] = (acc[curr.status || 'pending'] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(applicationsByStatus || {}).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};