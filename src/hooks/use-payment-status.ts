import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeUpdates } from './use-realtime-updates';

export const usePaymentStatus = (paymentId: string) => {
  const { data: payment, refetch } = useQuery({
    queryKey: ['payment', paymentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!paymentId,
  });

  useRealtimeUpdates(
    { 
      table: 'payments',
      filter: `id=eq.${paymentId}` 
    },
    () => {
      refetch();
    }
  );

  return { payment };
};