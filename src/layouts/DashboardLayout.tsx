import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  isOwner: boolean;
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1528] to-[#0f0a1e]">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto" />
      <p className="text-white/70">Loading your dashboard...</p>
    </div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1528] to-[#0f0a1e] p-4">
    <div className="max-w-md w-full space-y-4 text-center">
      <h2 className="text-xl font-semibold text-white">Dashboard Error</h2>
      <p className="text-white/70">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

const DashboardLayout = ({ isOwner }: DashboardLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { loading, error } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#1a1528] to-[#0f0a1e]">
        <MainHeader onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <DashboardSidebar 
          isOwner={isOwner} 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
        <main className="transition-all duration-300 pt-24 lg:ml-64 p-8">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardLayout;