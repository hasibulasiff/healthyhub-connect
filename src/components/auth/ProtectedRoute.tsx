import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register'];
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#1a1528] to-[#0f0a1e]">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  // Allow access to public routes without authentication
  if (publicRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;