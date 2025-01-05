import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const isLandingPage = location.pathname === "/";

  const handleRoleChange = (checked: boolean) => {
    setIsOwner(checked);
    navigate(checked ? '/dashboard' : '/user/dashboard', { replace: true });
  };

  if (!isLandingPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="bg-gradient-to-r from-[#1a1528] to-[#2d1f45] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-purple-400 transition-all duration-300"
            >
              HealthyThako
            </Link>

            <SearchBar />
            <NavLinks />
            <AuthButtons isOwner={isOwner} onRoleChange={handleRoleChange} />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <SearchBar />
                <NavLinks />
                <AuthButtons isOwner={isOwner} onRoleChange={handleRoleChange} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;