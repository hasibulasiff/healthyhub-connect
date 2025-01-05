import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'owner' | 'trainer' | 'admin')[];
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h2 className="text-xl font-semibold mb-4">Error loading protected route</h2>
    <p className="text-sm text-gray-600 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-white rounded-md"
    >
      Try again
    </button>
  </div>
);

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !error && user) {
      sessionStorage.setItem('lastRoute', location.pathname);
      sessionStorage.setItem('lastSearch', location.search);
    }
  }, [user, location, loading, error]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    console.error('Protected route error:', error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', `${location.pathname}${location.search}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    const lastValidRoute = sessionStorage.getItem('lastRoute') || '/';
    const lastSearch = sessionStorage.getItem('lastSearch') || '';
    return <Navigate to={`${lastValidRoute}${lastSearch}`} replace />;
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