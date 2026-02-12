import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CompareProvider } from "@/contexts/CompareContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CompareBar from "@/components/shared/CompareBar";
import FloatingAssistant from "@/components/shared/FloatingAssistant";
import OnboardingWalkthrough from "@/components/shared/OnboardingWalkthrough";
import CartDrawer from "@/components/layout/CartDrawer";
import FloatingCartButton from "@/components/shared/FloatingCartButton";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import Compare from "./pages/Compare";
import UseCaseNavigator from "./pages/UseCaseNavigator";
import Profile from "./pages/Profile";
import TrustCenter from "./pages/TrustCenter";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("dataiq-theme");
    return saved === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("dataiq-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CompareProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <OnboardingWalkthrough />
              <CartProvider>
                <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
                <CartDrawer />
                <FloatingCartButton />
                <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/use-cases" element={<UseCaseNavigator />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/trust-center" element={<TrustCenter />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
              </CartProvider>
              <CompareBar />
              <FloatingAssistant />
              <Footer />
            </BrowserRouter>
          </TooltipProvider>
        </CompareProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
