import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Booking Request",
      message: "You have a new booking request from John Doe",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Your subscription payment was successful",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          </div>

          <ScrollArea className="h-[600px] rounded-md border">
            <div className="p-4">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className={`flex items-start gap-4 py-4 ${notification.unread ? 'bg-secondary/20' : ''}`}>
                    <Bell className="w-5 h-5 mt-1 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;