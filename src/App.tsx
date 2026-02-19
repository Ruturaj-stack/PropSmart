import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import SavedPropertiesPage from "./pages/SavedPropertiesPage";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <ComparisonProvider>
            <BrowserRouter>
              <ScrollProgress />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/saved" element={<SavedPropertiesPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ComparisonBar />
              <ChatbotWidget />
              <BackToTop />
            </BrowserRouter>
          </ComparisonProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
