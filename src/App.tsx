import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InternshipsPage from "./pages/internships/Index";
import GigsPage from "./pages/gigs/Index";
import CompanyDashboard from "./pages/company/Dashboard";
import FeaturedPage from "./pages/Featured";
import OverviewPage from "./pages/Overview";
import RemotePage from "./pages/Remote";
import HirePage from "./pages/Hire";
import PricingPage from "./pages/Pricing";
import PostingTypePage from "./pages/post/Index";
import PostInternshipPage from "./pages/post/internship/Index";
import PostGigPage from "./pages/post/gig/Index";
import CollaborationHub from "./pages/collaboration/Index";
import ContractDetails from "./pages/collaboration/ContractDetails";
import TimeTracking from "./pages/collaboration/TimeTracking";
import Milestones from "./pages/collaboration/Milestones";
import Payments from "./pages/collaboration/Payments";
import CreateContract from "./pages/collaboration/CreateContract";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/gigs" element={<GigsPage />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/remote" element={<RemotePage />} />
          <Route path="/hire" element={<HirePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/post" element={<PostingTypePage />} />
          <Route path="/post/internship" element={<PostInternshipPage />} />
          <Route path="/post/gig" element={<PostGigPage />} />
          <Route path="/collaboration" element={<CollaborationHub />} />
          <Route path="/collaboration/contracts/create" element={<CreateContract />} />
          <Route path="/collaboration/contracts/:id" element={<ContractDetails />} />
          <Route path="/collaboration/contracts/:id/time" element={<TimeTracking />} />
          <Route path="/collaboration/contracts/:id/milestones" element={<Milestones />} />
          <Route path="/collaboration/contracts/:id/payments" element={<Payments />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;