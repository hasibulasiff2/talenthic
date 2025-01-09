import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/auth/Login";
import EmailVerification from "@/pages/auth/EmailVerification";
import PasswordReset from "@/pages/auth/PasswordReset";
import Internships from "@/pages/internships/Index";
import Gigs from "@/pages/gigs/Index";
import Collaboration from "@/pages/collaboration/Index";
import ContractDetails from "@/pages/collaboration/ContractDetails";
import CreateContract from "@/pages/collaboration/CreateContract";
import Milestones from "@/pages/collaboration/Milestones";
import Payments from "@/pages/collaboration/Payments";
import TimeTracking from "@/pages/collaboration/TimeTracking";
import Dashboard from "@/pages/profile/Dashboard";
import Settings from "@/pages/profile/Settings";
import Overview from "@/pages/Overview";
import Pricing from "@/pages/Pricing";
import Remote from "@/pages/Remote";
import Featured from "@/pages/Featured";
import Hire from "@/pages/Hire";
import Post from "@/pages/post/Index";
import PostGig from "@/pages/post/gig/Index";
import PostInternship from "@/pages/post/internship/Index";

export const AppRoutes = () => {
  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/gigs" element={<Gigs />} />
        
        {/* Protected Routes */}
        <Route path="/collaboration" element={
          <ProtectedRoute>
            <Collaboration />
          </ProtectedRoute>
        } />
        <Route path="/collaboration/:id" element={
          <ProtectedRoute>
            <ContractDetails />
          </ProtectedRoute>
        } />
        <Route path="/collaboration/create" element={
          <ProtectedRoute>
            <CreateContract />
          </ProtectedRoute>
        } />
        <Route path="/collaboration/:id/milestones" element={
          <ProtectedRoute>
            <Milestones />
          </ProtectedRoute>
        } />
        <Route path="/collaboration/:id/payments" element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        } />
        <Route path="/collaboration/:id/time-tracking" element={
          <ProtectedRoute>
            <TimeTracking />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/overview" element={<Overview />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/remote" element={<Remote />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/post" element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        } />
        <Route path="/post/gig" element={
          <ProtectedRoute>
            <PostGig />
          </ProtectedRoute>
        } />
        <Route path="/post/internship" element={
          <ProtectedRoute>
            <PostInternship />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  );
};