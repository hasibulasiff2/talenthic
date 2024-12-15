import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

type RealtimeConfig = {
  table: string;
  filter?: string;
};

export const useRealtimeUpdates = (
  config: RealtimeConfig,
  onUpdate?: () => void
) => {
  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtimeSubscription = async () => {
      channel = supabase
        .channel('db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: config.table,
            filter: config.filter,
          },
          (payload) => {
            console.log('Realtime update:', payload);
            onUpdate?.();

            toast("Update received", {
              description: `Changes in ${config.table}`,
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
  }, [config.table, config.filter, onUpdate]);
};