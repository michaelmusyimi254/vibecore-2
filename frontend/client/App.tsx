import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Facilities from "./pages/Facilities";
import Trainers from "./pages/Trainers";
import TrainerProfile from "./pages/TrainerProfile";
import Shops from "./pages/Shops";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import React, { useEffect, useState } from "react";
import Events from "./pages/Events";
import EventProfile from "./pages/EventProfile";
import FacilityProfile from "./pages/FacilityProfile";
import ShopProfile from "./pages/ShopProfile";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Failed to connect to backend."));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/trainers/:id" element={<TrainerProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/pricing" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/events/:id" element={<EventProfile />} />
            <Route path="/facilities/:id" element={<FacilityProfile />} />
            <Route path="/shops/:id" element={<ShopProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <h2>Backend says: {backendMessage}</h2>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
