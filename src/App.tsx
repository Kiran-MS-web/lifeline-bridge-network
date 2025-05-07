
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RouteGuard from "./components/auth/RouteGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import BloodRequest from "./pages/BloodRequest";
import BloodDonation from "./pages/BloodDonation";
import BloodCheck from "./pages/BloodCheck";
import ReportIssue from "./pages/ReportIssue";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            } />
            <Route path="/profile" element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            } />
            <Route path="/request" element={
              <RouteGuard>
                <BloodRequest />
              </RouteGuard>
            } />
            <Route path="/donate" element={
              <RouteGuard>
                <BloodDonation />
              </RouteGuard>
            } />
            <Route path="/blood-check" element={
              <RouteGuard>
                <BloodCheck />
              </RouteGuard>
            } />
            <Route path="/report" element={
              <RouteGuard>
                <ReportIssue />
              </RouteGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
