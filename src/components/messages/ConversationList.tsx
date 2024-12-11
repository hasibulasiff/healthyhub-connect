import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface ConversationListProps {
  conversations: any[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList = ({ conversations, selectedConversation, onSelectConversation }: ConversationListProps) => {
  return (
    <Card className="col-span-4 p-4">
      <h2 className="text-xl font-semibold mb-4">Conversations</h2>
      <ScrollArea className="h-[calc(100%-3rem)]">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
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
  );
};

export default ConversationList;