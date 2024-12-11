import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";

interface MessageListProps {
  messages: any[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const { user } = useAuth();

  return (
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
  );
};

export default MessageList;