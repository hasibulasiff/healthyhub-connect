import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  isOwner: boolean;
}

const DashboardLayout = ({ isOwner }: DashboardLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-background flex">
      <MainHeader onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
      <DashboardSidebar 
        isOwner={isOwner} 
        isMobileOpen={isMobileSidebarOpen}
        isDesktopCollapsed={isDesktopSidebarCollapsed}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        onToggleCollapse={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
      />
      <main className={`flex-1 transition-all duration-300 pt-16 ${isMobile ? 'px-4' : 'px-8'} ${
        !isMobile && !isDesktopSidebarCollapsed ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="max-w-7xl mx-auto py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;