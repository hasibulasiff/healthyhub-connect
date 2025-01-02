import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'owner' | 'trainer' | 'admin')[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Store the current location in sessionStorage
  if (user && location.pathname !== '/login') {
    sessionStorage.setItem('lastRoute', location.pathname);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect to last valid route or home
    const lastRoute = sessionStorage.getItem('lastRoute') || '/';
    return <Navigate to={lastRoute} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;