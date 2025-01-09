import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/auth/AuthProvider";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: {
    full_name: string;
  };
}

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export const MessageList = ({ messages, className = "" }: MessageListProps) => {
  const { session } = useAuth();

  return (
    <ScrollArea className={`h-[400px] pr-4 ${className}`}>
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.sender_id === session?.user?.id;
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${
                isOwnMessage ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {message.sender?.full_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col ${
                  isOwnMessage ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    isOwnMessage
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {format(new Date(message.created_at), "MMM d, h:mm a")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};