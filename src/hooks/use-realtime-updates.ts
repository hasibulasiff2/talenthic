import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RealtimePostgresChangesPayload, RealtimeChannel } from '@supabase/supabase-js';

type RealtimeConfig = {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE';
  filter?: string;
};

export const useRealtimeUpdates = (
  config: RealtimeConfig,
  onUpdate: (payload: RealtimePostgresChangesPayload<any>) => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on<string>(
        'postgres_changes',
        {
          event: config.event || '*',
          schema: 'public',
          table: config.table,
          filter: config.filter,
        },
        (payload) => {
          console.log('Realtime update:', payload);
          onUpdate(payload);
          
          // Show toast notification for specific events
          if (config.table === 'messages') {
            toast({
              title: 'New Message',
              description: 'You have received a new message',
            });
          } else if (config.table === 'payments') {
            toast({
              title: 'Payment Update',
              description: 'There has been an update to a payment',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [config.table, config.event, config.filter, onUpdate, toast]);
};