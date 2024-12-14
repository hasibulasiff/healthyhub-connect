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
  ChevronRight,
  MonitorPlay,
  PieChart,
  DollarSign,
  MessageCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardSidebarProps {
  isOwner: boolean;
  isMobileOpen?: boolean;
  isDesktopCollapsed?: boolean;
  onMobileClose?: () => void;
  onToggleCollapse?: () => void;
}

const DashboardSidebar = ({ 
  isOwner, 
  isMobileOpen, 
  isDesktopCollapsed,
  onMobileClose, 
  onToggleCollapse 
}: DashboardSidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const ownerMenuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Building2, label: "Listings", path: "/listings" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: MessageSquare, label: "Reviews", path: "/reviews" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const userMenuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/user/dashboard" },
    { icon: Building2, label: "My Memberships", path: "/memberships" },
    { icon: Calendar, label: "My Bookings", path: "/bookings" },
    { icon: MessageCircle, label: "Messages", path: "/user/messages" },
    { icon: MessageSquare, label: "My Reviews", path: "/user/reviews" },
    { icon: CreditCard, label: "Payment History", path: "/user/payments" },
    { icon: Settings, label: "Settings", path: "/user/settings" }
  ];

  const menuItems = isOwner ? ownerMenuItems : userMenuItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-br from-[#1a1528] to-[#0f0a1e] transition-all duration-300 z-50",
          isDesktopCollapsed ? "w-20" : "w-64",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onMobileClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white lg:hidden"
          >
            <X size={24} />
          </button>
        )}

        {/* Desktop Collapse Button */}
        {!isMobile && (
          <button
            onClick={onToggleCollapse}
            className="absolute -right-3 top-6 bg-purple-600 rounded-full p-1 text-white hover:bg-purple-700 transition-colors hidden lg:block"
          >
            {isDesktopCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}

        <nav className="p-4 overflow-y-auto h-full">
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
                    onClick={onMobileClose}
                  >
                    <item.icon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    {!isDesktopCollapsed && (
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
    </>
  );
};

export default DashboardSidebar;