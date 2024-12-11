import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ConversationList from "@/components/messages/ConversationList";
import MessageList from "@/components/messages/MessageList";
import MessageInput from "@/components/messages/MessageInput";

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          id,
          centers (
            id,
            name
          )
        `)
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load conversations"
        });
        return;
      }

      setConversations(data || []);
      setLoading(false);
    };

    fetchConversations();

    const conversationsSubscription = supabase
      .channel("conversations-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      conversationsSubscription.unsubscribe();
    };
  }, [user, toast]);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedConversation)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load messages"
        });
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    const messagesSubscription = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedConversation}`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [selectedConversation, toast]);

  const handleSendMessage = async (message: string) => {
    if (!selectedConversation || !user) return;

    setSending(true);
    const { error } = await supabase.from("messages").insert({
      conversation_id: selectedConversation,
      sender_id: user.id,
      content: message.trim()
    });

    if (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message"
      });
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <h1 className="text-4xl font-bold mb-8">Messages</h1>
      <div className="grid grid-cols-12 gap-6 h-[calc(100%-6rem)]">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />

        <Card className="col-span-8 p-4 flex flex-col">
          {selectedConversation ? (
            <>
              <MessageList messages={messages} />
              <MessageInput onSendMessage={handleSendMessage} sending={sending} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;