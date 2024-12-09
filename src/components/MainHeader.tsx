import { Link, useLocation } from "react-router-dom";
import { LogOut, Settings, User, Building2 } from "lucide-react";
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
  const isLandingPage = location.pathname === "/";
  const [isOwner, setIsOwner] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsOwner(checked);
    navigate(checked ? '/dashboard' : '/user/dashboard', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              HealthyThako
            </Link>
          </div>

          {isLandingPage ? (
            // Landing Page Header Content
            <div className="flex items-center space-x-6">
              <Link to="/archive" className="text-white/70 hover:text-white transition-colors">
                Browse
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Login
              </Link>
            </div>
          ) : (
            // Rest of Website Header Content
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="text-right mr-2">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-white/70">john@example.com</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border-white/20">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>Switch to {isOwner ? 'User' : 'Owner'}</span>
                      <Switch
                        checked={isOwner}
                        onCheckedChange={handleSwitchChange}
                        className="data-[state=checked]:bg-purple-500 ml-2"
                      />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;