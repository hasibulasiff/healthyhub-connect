import { Link, useLocation } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DashboardSidebar = ({ isOwner = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const ownerMenuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Building2, label: "Listings", path: "/listings" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: MessageSquare, label: "Reviews", path: "/reviews" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const userMenuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/user/dashboard" },
    { icon: Building2, label: "My Memberships", path: "/memberships" },
    { icon: Calendar, label: "My Bookings", path: "/bookings" },
    { icon: MessageSquare, label: "My Reviews", path: "/reviews" },
    { icon: CreditCard, label: "Payment History", path: "/payments" },
    { icon: Settings, label: "Settings", path: "/user/settings" }
  ];

  const menuItems = isOwner ? ownerMenuItems : userMenuItems;

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 h-screen bg-gradient-to-br from-[#1a1528] to-[#0f0a1e] transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-purple-600 rounded-full p-1 text-white hover:bg-purple-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group",
                    isActive && "bg-white/10 text-white"
                  )}
                >
                  <item.icon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  {!isCollapsed && (
                    <span className="group-hover:translate-x-1 transition-transform whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;