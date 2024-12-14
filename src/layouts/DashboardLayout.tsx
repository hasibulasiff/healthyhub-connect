import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

interface DashboardLayoutProps {
  isOwner: boolean;
}

const DashboardLayout = ({ isOwner }: DashboardLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
      <DashboardSidebar 
        isOwner={isOwner} 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <main className="transition-all duration-300 pt-24 lg:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;