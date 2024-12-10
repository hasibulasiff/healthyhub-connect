import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Settings, User, Building2, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const MainHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const isLandingPage = location.pathname === "/";

  const handleSwitchChange = (checked: boolean) => {
    setIsOwner(checked);
    navigate(checked ? '/dashboard' : '/user/dashboard', { replace: true });
  };

  if (isLandingPage) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="bg-gradient-to-r from-[#1a1528] to-[#2d1f45] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
              >
                HealthyThako
              </Link>
            </div>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-[#2d1f45] to-[#1a1528] hover:from-[#3d2a5d] hover:to-[#251b36] transition-all duration-300">
                  <div className="text-right mr-2">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-white/70">john@example.com</p>
                  </div>
                  <Avatar className="h-8 w-8 ring-2 ring-purple-500/20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gradient-to-r from-[#1a1528] to-[#2d1f45] backdrop-blur-md border-white/20">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <User className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <MessageCircle className="mr-2 h-4 w-4 text-purple-400" />
                    <Link to={isOwner ? "/messages" : "/user/messages"}>Messages</Link>
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
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Settings className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white hover:bg-white/10">
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