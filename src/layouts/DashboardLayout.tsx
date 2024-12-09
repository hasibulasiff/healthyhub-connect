import { Outlet } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

interface DashboardLayoutProps {
  isOwner: boolean;
}

const DashboardLayout = ({ isOwner }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <DashboardSidebar isOwner={isOwner} />
      <main className="ml-64 p-8 pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;