import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import PasswordChecker from "./components/PasswordChecker";
import EmailLeakChecker from "./components/EmailLeakChecker";
import PhishingDetector from "./components/PhishingDetector";
import SecurityChecklist from "./components/SecurityChecklist";
import CyberNews from "./components/CyberNews";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/password" element={
              <ProtectedRoute>
                <Layout>
                  <PasswordChecker />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/email" element={
              <ProtectedRoute>
                <Layout>
                  <EmailLeakChecker />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/phishing" element={
              <ProtectedRoute>
                <Layout>
                  <PhishingDetector />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/checklist" element={
              <ProtectedRoute>
                <Layout>
                  <SecurityChecklist />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/news" element={
              <ProtectedRoute>
                <Layout>
                  <CyberNews />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
