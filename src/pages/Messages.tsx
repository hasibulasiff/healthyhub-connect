import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
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

    // Subscribe to new conversations
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

    // Subscribe to new messages
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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !newMessage.trim() || !user) return;

    setSending(true);
    const { error } = await supabase.from("messages").insert({
      conversation_id: selectedConversation,
      sender_id: user.id,
      content: newMessage.trim()
    });

    if (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message"
      });
    } else {
      setNewMessage("");
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
        {/* Conversations List */}
        <Card className="col-span-4 p-4">
          <h2 className="text-xl font-semibold mb-4">Conversations</h2>
          <ScrollArea className="h-[calc(100%-3rem)]">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-purple-500 text-white"
                      : "hover:bg-purple-100 dark:hover:bg-purple-900"
                  }`}
                >
                  <p className="font-medium">{conversation.centers?.name || "Unknown Center"}</p>
                </button>
              ))}
              {conversations.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No conversations yet</p>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Messages Area */}
        <Card className="col-span-8 p-4 flex flex-col">
          {selectedConversation ? (
            <>
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4 p-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender_id === user?.id
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No messages yet</p>
                  )}
                </div>
              </ScrollArea>
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={sending}
                />
                <Button type="submit" disabled={sending || !newMessage.trim()}>
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
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