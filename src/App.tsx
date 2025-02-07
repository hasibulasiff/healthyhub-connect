import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import CenterDetail from "./pages/CenterDetail";
import OwnerDashboard from "./pages/OwnerDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UserDashboard from "./pages/UserDashboard";
import ProfileSettings from "./pages/ProfileSettings";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import MembershipPurchase from "./pages/MembershipPurchase";
import Review from "./pages/Review";
import ListingManagement from "./pages/ListingManagement";
import SubscriptionPricing from "./pages/SubscriptionPricing";
import EventAnalytics from "./pages/EventAnalytics";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import AdPlacement from "./pages/AdPlacement";
import AdManagement from "./pages/AdManagement";
import AdAnalytics from "./pages/AdAnalytics";
import AdPayment from "./pages/AdPayment";
import MembersPage from "./pages/MembersPage";
import SchedulePage from "./pages/SchedulePage";
import PaymentsPage from "./pages/PaymentsPage";
import BookingsPage from "./pages/BookingsPage";
import PaymentHistory from "./pages/PaymentHistory";
import Messages from "./pages/Messages";
import EventDetail from "./pages/EventDetail";
import TrainerDetail from "./pages/TrainerDetail";
import EventManagement from "./pages/EventManagement";
import TrainerDashboard from "./pages/TrainerDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Centers from "./pages/Centers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/centers" element={<Centers />} />
                <Route path="/center/:id" element={<CenterDetail />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/trainer/:id" element={<TrainerDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                {/* Protected routes */}
                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/dashboard" element={<OwnerDashboard />} />
                  <Route path="/listings" element={<ListingManagement />} />
                  <Route path="/analytics" element={<EventAnalytics />} />
                  <Route path="/members" element={<MembersPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/reviews" element={<Review />} />
                  <Route path="/payments" element={<PaymentsPage />} />
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route path="/memberships" element={<MembershipPurchase />} />
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/user/messages" element={<Messages />} />
                  <Route path="/user/reviews" element={<Review />} />
                  <Route path="/user/payments" element={<PaymentHistory />} />
                  <Route path="/user/settings" element={<ProfileSettings />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
