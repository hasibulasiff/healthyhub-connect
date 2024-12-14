import { Link } from "react-router-dom";
import { Building2, User, Calendar, Info } from "lucide-react";

const categories = [
  { label: "Gyms", path: "/search?category=gyms", icon: Building2 },
  { label: "Yoga Studios", path: "/search?category=yoga", icon: User },
  { label: "Sports Centers", path: "/search?category=sports", icon: Calendar },
  { label: "Wellness Centers", path: "/search?category=wellness", icon: Info },
];

export const CategoryLinks = ({ onClose }: { onClose?: () => void }) => {
  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.label}
          to={category.path}
          className="flex items-center text-white/70 hover:text-white transition-colors"
          onClick={onClose}
        >
          <category.icon className="mr-2 h-4 w-4" />
          {category.label}
        </Link>
      ))}
    </>
  );
};