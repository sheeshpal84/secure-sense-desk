import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import PasswordChecker from "./components/PasswordChecker";
import EmailLeakChecker from "./components/EmailLeakChecker";
import PhishingDetector from "./components/PhishingDetector";
import SecurityChecklist from "./components/SecurityChecklist";
import CyberNews from "./components/CyberNews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/password" element={<PasswordChecker />} />
            <Route path="/email" element={<EmailLeakChecker />} />
            <Route path="/phishing" element={<PhishingDetector />} />
            <Route path="/checklist" element={<SecurityChecklist />} />
            <Route path="/news" element={<CyberNews />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
