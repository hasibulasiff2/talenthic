import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export const AnalyticsDashboard = () => {
  const { session } = useAuth();

  const { data: analyticsData } = useQuery({
    queryKey: ["company-analytics", session?.user?.id],
    queryFn: async () => {
      const [applications, views] = await Promise.all([
        supabase
          .from("applications")
          .select("created_at, status")
          .eq("company_id", session?.user?.id),
        // Add more analytics queries here
      ]);

      return {
        applications: applications.data || [],
        views: views.data || [],
      };
    },
    enabled: !!session?.user?.id,
  });

  const applicationsByStatus = analyticsData?.applications.reduce((acc: any, curr: any) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
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