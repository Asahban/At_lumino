import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import CertifiedStores from "./pages/CertifiedStores";
import NotFound from "./pages/NotFound";
import GoldJewelry from "./pages/GoldJewelry";
import GoldJewelryDetail from "./pages/GoldJewelryDetail";
import Education from "./pages/Education";
import EducationDetail from "./pages/EducationDetail";
import Journal from "./pages/Journal";
import StoreProfile from "./pages/StoreProfile";
import StoreJewelry from "./pages/StoreJewelry";
import Auth from "./pages/Auth";
import StoreRegistration from "./pages/StoreRegistration";
import CompareNow from "./pages/CompareNow";
import StoreRegistrationManagement from "./pages/StoreRegistrationManagement";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const addScrollAnimations = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.fade-with-scroll').forEach(el => {
      observer.observe(el);
    });
  });
};

const App = () => {
  React.useEffect(() => {
    addScrollAnimations();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/gold-jewelry" element={<GoldJewelry />} />
                  <Route path="/gold-jewelry/:karat" element={<GoldJewelryDetail />} />
                  <Route path="/certified-stores" element={<CertifiedStores />} />
                  <Route path="/certified-stores/:storeId" element={<StoreProfile />} />
                  <Route path="/certified-stores/:storeId/jewelry" element={<StoreJewelry />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/education/:topic" element={<EducationDetail />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/store-registration" element={<StoreRegistration />} />
                  <Route path="/store-registrations" element={<StoreRegistrationManagement />} />
                  <Route path="/compare-now" element={<CompareNow />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
