import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              HealthyThako
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <User size={20} className={!isOwner ? "text-accent" : "text-neutral"} />
              <Switch
                checked={isOwner}
                onCheckedChange={setIsOwner}
                className="data-[state=checked]:bg-primary"
              />
              <Building2 size={20} className={isOwner ? "text-accent" : "text-neutral"} />
            </div>
            <Link to="/about" className="text-neutral hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-neutral hover:text-primary transition-colors">
              Contact
            </Link>
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral hover:text-primary transition-colors"
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
                <User size={20} className={!isOwner ? "text-accent" : "text-neutral"} />
                <Switch
                  checked={isOwner}
                  onCheckedChange={setIsOwner}
                  className="data-[state=checked]:bg-primary"
                />
                <Building2 size={20} className={isOwner ? "text-accent" : "text-neutral"} />
              </div>
              <Link
                to="/about"
                className="text-neutral hover:text-primary transition-colors text-center"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-neutral hover:text-primary transition-colors text-center"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-center"
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