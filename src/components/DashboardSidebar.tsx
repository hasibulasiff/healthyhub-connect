import { Link } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Calendar,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

const DashboardSidebar = ({ isOwner = false }) => {
  const ownerMenuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Building2, label: "Listings", path: "/listings" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: MessageSquare, label: "Reviews", path: "/reviews" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const userMenuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/user/dashboard" },
    { icon: Building2, label: "My Memberships", path: "/memberships" },
    { icon: Calendar, label: "My Bookings", path: "/bookings" },
    { icon: MessageSquare, label: "My Reviews", path: "/reviews" },
    { icon: CreditCard, label: "Payment History", path: "/payments" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];

  const menuItems = isOwner ? ownerMenuItems : userMenuItems;

  return (
    <aside className="w-64 bg-black/10 backdrop-blur-lg border-r border-white/10 h-screen fixed left-0 top-16">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;