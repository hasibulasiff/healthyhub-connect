import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, Phone } from "lucide-react";

const quickLinks = [
  { label: "Find Centers", path: "/search", icon: Search },
  { label: "Near Me", path: "/search?nearby=true", icon: MapPin },
  { label: "Events", path: "/search?type=events", icon: Calendar },
  { label: "Contact", path: "/contact", icon: Phone },
];

export const NavLinks = ({ onClose }: { onClose?: () => void }) => {
  return (
    <>
      {quickLinks.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className="flex items-center text-white/70 hover:text-white transition-colors"
          onClick={onClose}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </>
  );
};