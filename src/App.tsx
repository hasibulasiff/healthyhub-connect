import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import CenterDetail from "./pages/CenterDetail";
import OwnerDashboard from "./pages/OwnerDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/center/:id" element={<CenterDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Owner Dashboard routes */}
          <Route element={<DashboardLayout isOwner={true} />}>
            <Route path="/dashboard" element={<OwnerDashboard />} />
            <Route path="/listings" element={<ListingManagement />} />
            <Route path="/analytics" element={<EventAnalytics />} />
            <Route path="/members" element={<div>Members Page</div>} />
            <Route path="/schedule" element={<div>Schedule Page</div>} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/payments" element={<div>Payments Page</div>} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Route>

          {/* User Dashboard routes */}
          <Route element={<DashboardLayout isOwner={false} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/memberships" element={<MembershipPurchase />} />
            <Route path="/bookings" element={<div>Bookings Page</div>} />
            <Route path="/user/reviews" element={<Review />} />
            <Route path="/user/payments" element={<div>Payment History</div>} />
            <Route path="/user/settings" element={<ProfileSettings />} />
          </Route>

          {/* Ad routes */}
          <Route path="/ads/place" element={<AdPlacement />} />
          <Route path="/ads/manage" element={<AdManagement />} />
          <Route path="/ads/analytics" element={<AdAnalytics />} />
          <Route path="/ads/payment" element={<AdPayment />} />
          
          {/* Notifications */}
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Subscription */}
          <Route path="/subscription" element={<SubscriptionPricing />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;