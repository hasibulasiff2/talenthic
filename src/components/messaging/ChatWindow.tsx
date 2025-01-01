import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface ChatWindowProps {
  contractId: string;
  otherPartyName: string;
}

export const ChatWindow = ({ contractId, otherPartyName }: ChatWindowProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(`*, sender:profiles(full_name)`)
        .eq("contract_id", contractId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      const { error } = await supabase.from("messages").insert({
        content,
        contract_id: contractId,
        sender_id: session?.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", contractId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `contract_id=eq.${contractId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages", contractId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [contractId, queryClient]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Chat with {otherPartyName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MessageList messages={messages} />
        <MessageInput
          onSendMessage={(content) => sendMessage.mutate(content)}
          disabled={sendMessage.isPending}
        />
      </CardContent>
    </Card>
  );
};