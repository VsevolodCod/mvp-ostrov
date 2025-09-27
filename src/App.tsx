import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import GuestDashboard from "./pages/GuestDashboard";
import HotelSelection from "./pages/HotelSelection";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationForm from "./components/forms/ApplicationForm";
import ReportForm from "./components/forms/ReportForm";
import HotelDetails from "./pages/HotelDetails";
import ReportView from "./pages/ReportView";
import ProfileSettings from "./pages/ProfileSettings";
import TestAPI from "./pages/TestAPI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="guest-dashboard" element={<GuestDashboard />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotel-selection" element={<HotelSelection />} />
            <Route path="reports" element={<Reports />} />
            <Route path="application" element={<ApplicationForm />} />
            <Route path="create-report" element={<ReportForm />} />
            <Route path="hotel/:id" element={<HotelDetails />} />
            <Route path="report/:id" element={<ReportView />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="test-api" element={<TestAPI />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
