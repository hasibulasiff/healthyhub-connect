import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from 'next-themes';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import DashboardLayout from '@/layouts/DashboardLayout';
import UserDashboard from '@/pages/UserDashboard';
import OwnerDashboard from '@/pages/OwnerDashboard';
import TrainerDashboard from '@/pages/TrainerDashboard';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Bookings from '@/pages/Bookings';
import Centers from '@/pages/Centers';
import Messages from '@/pages/Messages';
import Notifications from '@/pages/Notifications';
import Analytics from '@/pages/Analytics';
import MembershipPlans from '@/pages/MembershipPlans';
import Reviews from '@/pages/Reviews';
import Schedule from '@/pages/Schedule';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      suspense: true,
    },
    mutations: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path=""
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="owner"
                    element={
                      <ProtectedRoute allowedRoles={['owner']}>
                        <OwnerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="trainer"
                    element={
                      <ProtectedRoute allowedRoles={['trainer']}>
                        <TrainerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="bookings"
                    element={
                      <ProtectedRoute>
                        <Bookings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="centers"
                    element={
                      <ProtectedRoute>
                        <Centers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="messages"
                    element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="notifications"
                    element={
                      <ProtectedRoute>
                        <Notifications />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="analytics"
                    element={
                      <ProtectedRoute allowedRoles={['owner', 'admin']}>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="membership-plans"
                    element={
                      <ProtectedRoute allowedRoles={['owner', 'admin']}>
                        <MembershipPlans />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="reviews"
                    element={
                      <ProtectedRoute>
                        <Reviews />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="schedule"
                    element={
                      <ProtectedRoute>
                        <Schedule />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;