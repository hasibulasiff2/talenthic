import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

type RealtimeEvent = {
  table: string;
  schema: string;
  eventType: "INSERT" | "UPDATE" | "DELETE";
  onEvent?: (payload: any) => void;
};

export const useRealtimeUpdates = ({ table, schema, eventType, onEvent }: RealtimeEvent) => {
  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtimeSubscription = async () => {
      channel = supabase
        .channel('db-changes')
        .on(
          'postgres_changes' as const,
          {
            event: eventType,
            schema: schema,
            table: table,
          },
          (payload) => {
            // Call the custom event handler if provided
            if (onEvent) {
              onEvent(payload);
            }

            // Show toast notification based on event type
            const eventMessages = {
              INSERT: "New item added",
              UPDATE: "Item updated",
              DELETE: "Item removed",
            };

            toast(eventMessages[eventType], {
              description: `Changes in ${table}`,
            });
          }
        )
        .subscribe();
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, schema, eventType, onEvent]);
};