import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

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
      <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
      <p className="text-white/70">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !error && user) {
      sessionStorage.setItem('lastRoute', location.pathname);
    }
  }, [user, location, loading, error]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    throw error;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.active_role)) {
    const lastValidRoute = sessionStorage.getItem('lastRoute') || '/';
    return <Navigate to={lastValidRoute} replace />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ProtectedRoute;