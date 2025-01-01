import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Json } from "@/integrations/supabase/types";

interface NotificationTypes {
  messages: boolean;
  applications: boolean;
  contracts: boolean;
  payments: boolean;
}

interface NotificationPreferences {
  email_notifications: boolean;
  in_app_notifications: boolean;
  notification_types: NotificationTypes;
}

const defaultPreferences: NotificationPreferences = {
  email_notifications: true,
  in_app_notifications: true,
  notification_types: {
    messages: true,
    applications: true,
    contracts: true,
    payments: true,
  },
};

export const NotificationPreferences = () => {
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["notification-preferences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("notification_preferences")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;

      const prefs = data?.notification_preferences as Json;
      if (!prefs) return defaultPreferences;

      // Validate the structure matches our expected interface
      const validatedPrefs: NotificationPreferences = {
        email_notifications: typeof prefs === 'object' && 'email_notifications' in prefs 
          ? Boolean(prefs.email_notifications)
          : defaultPreferences.email_notifications,
        in_app_notifications: typeof prefs === 'object' && 'in_app_notifications' in prefs
          ? Boolean(prefs.in_app_notifications)
          : defaultPreferences.in_app_notifications,
        notification_types: typeof prefs === 'object' && 'notification_types' in prefs && typeof prefs.notification_types === 'object'
          ? {
              messages: Boolean((prefs.notification_types as any)?.messages ?? defaultPreferences.notification_types.messages),
              applications: Boolean((prefs.notification_types as any)?.applications ?? defaultPreferences.notification_types.applications),
              contracts: Boolean((prefs.notification_types as any)?.contracts ?? defaultPreferences.notification_types.contracts),
              payments: Boolean((prefs.notification_types as any)?.payments ?? defaultPreferences.notification_types.payments),
            }
          : defaultPreferences.notification_types,
      };

      return validatedPrefs;
    },
  });

  const updatePreferences = useMutation({
    mutationFn: async (newPreferences: NotificationPreferences) => {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          notification_preferences: newPreferences as unknown as Json 
        })
        .eq("id", session?.user?.id);

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
    let current: any = newPreferences;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    updatePreferences.mutate(newPreferences);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!preferences) {
    return null;
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
              checked={preferences.email_notifications}
              onCheckedChange={(checked) =>
                handleToggle(["email_notifications"], checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="in-app-notifications">In-app Notifications</Label>
            <Switch
              id="in-app-notifications"
              checked={preferences.in_app_notifications}
              onCheckedChange={(checked) =>
                handleToggle(["in_app_notifications"], checked)
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Types</h3>
          <div className="space-y-4">
            {Object.entries(preferences.notification_types).map(
              ([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={`notification-type-${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Switch
                    id={`notification-type-${key}`}
                    checked={value}
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