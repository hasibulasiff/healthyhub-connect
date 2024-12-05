import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Archive from "./pages/Archive";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/center/:id" element={<CenterDetail />} />
          <Route path="/dashboard" element={<OwnerDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/settings" element={<ProfileSettings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/membership" element={<MembershipPurchase />} />
          <Route path="/review" element={<Review />} />
          <Route path="/listings" element={<ListingManagement />} />
          <Route path="/subscription" element={<SubscriptionPricing />} />
          <Route path="/analytics" element={<EventAnalytics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;