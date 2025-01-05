import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Settings, User, Building2, MessageCircle, Menu, Calendar, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { supabase } from "@/integrations/supabase/client";

interface MainHeaderProps {
  onMenuClick?: () => void;
}

const MainHeader = ({ onMenuClick }: MainHeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    if (profile) {
      setIsOwner(profile.active_role === 'owner');
    }
  }, [profile]);

  const handleSwitchChange = async (checked: boolean) => {
    try {
      const newRole = checked ? 'owner' : 'user';
      
      const { error } = await supabase
        .from('profiles')
        .update({ active_role: newRole })
        .eq('id', user?.id);

      if (error) throw error;

      setIsOwner(checked);
      navigate(checked ? '/dashboard' : '/user/dashboard');
      
      toast({
        title: "Role switched successfully",
        description: `You are now in ${newRole} mode`,
      });
    } catch (error) {
      console.error('Error switching role:', error);
      toast({
        title: "Error switching role",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLandingPage) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="bg-gradient-to-r from-[#1a1528] to-[#2d1f45] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onMenuClick}
                className="lg:hidden text-white/70 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
              >
                HealthyThako
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to={isOwner ? "/bookings" : "/user/bookings"} className="text-white/70 hover:text-white transition-colors">
                <Calendar className="h-5 w-5" />
              </Link>
              <Link to="/favorites" className="text-white/70 hover:text-white transition-colors">
                <Heart className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {user && <NotificationBell />}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="text-right mr-2">
                    <p className="text-sm font-medium text-white">{profile?.username || user?.email}</p>
                    <p className="text-xs text-white/70">Account Settings</p>
                  </div>
                  <Avatar className="h-8 w-8 ring-2 ring-purple-500/20">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{profile?.username?.[0] || user?.email?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gradient-to-r from-[#1a1528] to-[#2d1f45] backdrop-blur-md border-white/20">
                  <DropdownMenuItem className="text-white hover:bg-white/10" onClick={() => navigate(isOwner ? '/dashboard' : '/user/dashboard')}>
                    <User className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10" onClick={() => navigate(isOwner ? '/messages' : '/user/messages')}>
                    <MessageCircle className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-purple-400" />
                      <span>Switch to {isOwner ? 'User' : 'Owner'}</span>
                      <Switch
                        checked={isOwner}
                        onCheckedChange={handleSwitchChange}
                        className="data-[state=checked]:bg-purple-500 ml-2"
                      />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10" onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white hover:bg-white/10" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;