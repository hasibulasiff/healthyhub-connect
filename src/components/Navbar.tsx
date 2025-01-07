import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, Building2, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const isLandingPage = location.pathname === "/";

  // Hide Navbar if not on landing page or if user is logged in
  if (!isLandingPage || user) return null;

  const handleSwitchChange = (checked: boolean) => {
    setIsOwner(checked);
    // Store preference in localStorage for persistence during the session
    localStorage.setItem('preferredRole', checked ? 'owner' : 'user');
  };

  const categories = [
    { label: "Gyms", path: "/search?category=gyms" },
    { label: "Yoga Studios", path: "/search?category=yoga" },
    { label: "Sports Centers", path: "/search?category=sports" },
    { label: "Wellness Centers", path: "/search?category=wellness" },
  ];

  const quickLinks = [
    { label: "Near Me", path: "/search?nearby=true" },
    { label: "Browse All", path: "/search" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-full">
                <User size={20} className={!isOwner ? "text-purple-400" : "text-white/50"} />
                <Switch
                  checked={isOwner}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-purple-500"
                />
                <Building2 size={20} className={isOwner ? "text-purple-400" : "text-white/50"} />
              </div>

              {/* Quick Links Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white/70 hover:text-white transition-colors">
                  Quick Links
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-white/20">
                  {quickLinks.map((link) => (
                    <DropdownMenuItem key={link.label}>
                      <Link
                        to={link.path}
                        className="flex items-center w-full px-2 py-1 text-white/70 hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white/70 hover:text-white transition-colors">
                  Browse
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-white/20">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.label}>
                      <Link
                        to={category.path}
                        className="flex items-center w-full px-2 py-1 text-white/70 hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
              >
                Login
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/70 hover:text-white transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center space-x-2 py-2">
                  <User size={20} className={!isOwner ? "text-purple-400" : "text-white/50"} />
                  <Switch
                    checked={isOwner}
                    onCheckedChange={handleSwitchChange}
                    className="data-[state=checked]:bg-purple-500"
                  />
                  <Building2 size={20} className={isOwner ? "text-purple-400" : "text-white/50"} />
                </div>
                
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {categories.map((category) => (
                  <Link
                    key={category.label}
                    to={category.path}
                    className="text-white/70 hover:text-white transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.label}
                  </Link>
                ))}
                
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white w-full"
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;