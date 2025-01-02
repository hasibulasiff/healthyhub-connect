import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'owner' | 'trainer' | 'admin')[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Persist navigation state in sessionStorage
  useEffect(() => {
    if (user && location.pathname !== '/login') {
      sessionStorage.setItem('lastRoute', location.pathname);
      sessionStorage.setItem('lastSearch', location.search);
    }
  }, [user, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Store the attempted location for redirect after login
    sessionStorage.setItem('redirectAfterLogin', `${location.pathname}${location.search}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    const lastValidRoute = sessionStorage.getItem('lastRoute') || '/';
    const lastSearch = sessionStorage.getItem('lastSearch') || '';
    return <Navigate to={`${lastValidRoute}${lastSearch}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;