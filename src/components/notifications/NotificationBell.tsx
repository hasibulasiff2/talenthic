import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeUpdates } from '@/hooks/use-realtime-updates';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: notifications, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (notifications) {
      const count = notifications.filter(n => !n.read).length;
      setUnreadCount(count);
    }
  }, [notifications]);

  useRealtimeUpdates(
    { table: 'notifications' },
    () => {
      refetch();
    }
  );

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    
    if (!error) {
      refetch();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <ScrollArea className="h-[300px]">
          {notifications?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notifications
            </p>
          ) : (
            <div className="space-y-2">
              {notifications?.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg text-sm ${
                    !notification.read ? 'bg-accent' : 'bg-background'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};