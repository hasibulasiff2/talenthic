import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const NotificationPreferences = () => {
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["notification-preferences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("notification_preferences")
        .eq("id", session?.id)
        .single();

      if (error) throw error;
      return data?.notification_preferences || {
        email_notifications: true,
        in_app_notifications: true,
        notification_types: {
          messages: true,
          applications: true,
          contracts: true,
          payments: true,
        },
      };
    },
  });

  const updatePreferences = useMutation({
    mutationFn: async (newPreferences: any) => {
      const { error } = await supabase
        .from("profiles")
        .update({ notification_preferences: newPreferences })
        .eq("id", session?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Notification preferences updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    },
  });

  const handleToggle = (path: string[], value: boolean) => {
    if (!preferences) return;

    const newPreferences = { ...preferences };
    let current = newPreferences;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    updatePreferences.mutate(newPreferences);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={preferences?.email_notifications}
              onCheckedChange={(checked) =>
                handleToggle(["email_notifications"], checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="in-app-notifications">In-app Notifications</Label>
            <Switch
              id="in-app-notifications"
              checked={preferences?.in_app_notifications}
              onCheckedChange={(checked) =>
                handleToggle(["in_app_notifications"], checked)
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Types</h3>
          <div className="space-y-4">
            {Object.entries(preferences?.notification_types || {}).map(
              ([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={`notification-type-${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Switch
                    id={`notification-type-${key}`}
                    checked={value as boolean}
                    onCheckedChange={(checked) =>
                      handleToggle(["notification_types", key], checked)
                    }
                  />
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};