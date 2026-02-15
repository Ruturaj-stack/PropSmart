import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import ComparisonBar from "./components/ComparisonBar";
import ChatbotWidget from "./components/ChatbotWidget";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Recommendations from "./pages/Recommendations";
import Compare from "./pages/Compare";
import Alerts from "./pages/Alerts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InnovationHub from "./pages/InnovationHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ComparisonProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollProgress />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/innovations" element={<InnovationHub />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ComparisonBar />
            <ChatbotWidget />
            <BackToTop />
          </BrowserRouter>
        </ComparisonProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
