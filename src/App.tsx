import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import ExplorePage from "./pages/ExplorePage";
import AddBusinessPage from "./pages/AddBusinessPage";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import StyleGuidePage from "./pages/StyleGuidePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import ResidentsPage from "./pages/ResidentsPage";
import MarketplacePage from "./pages/MarketplacePage";
import MarketplaceDetailPage from "./pages/MarketplaceDetailPage";
import ForBusinessesPage from "./pages/ForBusinessesPage";
import DealsPage from "./pages/DealsPage";
import DealDetailPage from "./pages/DealDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./i18n/config";

const queryClient = new QueryClient();

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    const validLang = lang === 'en' || lang === 'he' ? lang : 'he';
    if (i18n.language !== validLang) {
      i18n.changeLanguage(validLang);
    }
    document.documentElement.lang = validLang;
    document.documentElement.dir = validLang === 'he' ? 'rtl' : 'ltr';
  }, [lang, i18n]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/he" replace />} />
          <Route path="/:lang" element={<LanguageWrapper><Index /></LanguageWrapper>} />
          <Route path="/:lang/style-guide" element={<StyleGuidePage />} />
          <Route path="/:lang/search" element={<LanguageWrapper><SearchPage /></LanguageWrapper>} />
          <Route path="/:lang/explore" element={<LanguageWrapper><ExplorePage /></LanguageWrapper>} />
          <Route path="/:lang/add-business" element={<LanguageWrapper><AddBusinessPage /></LanguageWrapper>} />
          <Route path="/:lang/category/:slug/:subslug" element={<LanguageWrapper><SubcategoryPage /></LanguageWrapper>} />
          <Route path="/:lang/category/:slug" element={<LanguageWrapper><CategoryPage /></LanguageWrapper>} />
          <Route path="/:lang/business/:id" element={<LanguageWrapper><BusinessProfilePage /></LanguageWrapper>} />
          <Route path="/:lang/events" element={<LanguageWrapper><EventsPage /></LanguageWrapper>} />
          <Route path="/:lang/events/:id" element={<LanguageWrapper><EventDetailPage /></LanguageWrapper>} />
          <Route path="/:lang/residents" element={<LanguageWrapper><ResidentsPage /></LanguageWrapper>} />
          <Route path="/:lang/marketplace" element={<LanguageWrapper><MarketplacePage /></LanguageWrapper>} />
          <Route path="/:lang/marketplace/:id" element={<LanguageWrapper><MarketplaceDetailPage /></LanguageWrapper>} />
          <Route path="/:lang/for-businesses" element={<LanguageWrapper><ForBusinessesPage /></LanguageWrapper>} />
          <Route path="/:lang/deals" element={<LanguageWrapper><DealsPage /></LanguageWrapper>} />
          <Route path="/:lang/deals/:slug" element={<LanguageWrapper><DealDetailPage /></LanguageWrapper>} />
          <Route path="/:lang/about" element={<LanguageWrapper><AboutPage /></LanguageWrapper>} />
          <Route path="/:lang/contact" element={<LanguageWrapper><ContactPage /></LanguageWrapper>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
