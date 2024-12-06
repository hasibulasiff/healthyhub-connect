import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsOwner(checked);
    navigate(checked ? '/dashboard' : '/user/dashboard', { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-500 transition-all duration-300">
              HealthyThako
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 bg-black/20 p-2 rounded-full">
              <User size={20} className={!isOwner ? "text-purple-400" : "text-neutral"} />
              <Switch
                checked={isOwner}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-purple-500"
              />
              <Building2 size={20} className={isOwner ? "text-purple-400" : "text-neutral"} />
            </div>
            <Link to="/archive" className="text-white/70 hover:text-white transition-colors">
              Browse
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              Login
            </Link>
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
                <User size={20} className={!isOwner ? "text-purple-400" : "text-neutral"} />
                <Switch
                  checked={isOwner}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-purple-500"
                />
                <Building2 size={20} className={isOwner ? "text-purple-400" : "text-neutral"} />
              </div>
              <Link
                to="/archive"
                className="text-white/70 hover:text-white transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Browse
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
