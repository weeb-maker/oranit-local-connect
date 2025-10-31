import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FilterBar } from "@/components/shared/FilterBar";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

// Mock data
const mockBusinesses = [
  {
    id: "1",
    name: "Cafe Oranit",
    category: "Food & Drink",
    description: "Cozy neighborhood cafe serving fresh pastries and artisan coffee",
    logo: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=100&h=100&fit=crop",
    rating: 4.8,
    verified: true,
    location: "Main Street, Oranit",
  },
  {
    id: "2",
    name: "Green Thumb Gardening",
    category: "Home Services",
    description: "Professional landscaping and garden maintenance services",
    logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
    rating: 4.6,
    verified: true,
    location: "Oranit",
  },
  {
    id: "3",
    name: "Oranit Dental Clinic",
    category: "Health & Wellness",
    description: "Family dentistry with modern equipment and gentle care",
    logo: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&h=100&fit=crop",
    rating: 4.9,
    verified: true,
    location: "Medical Center, Oranit",
  },
];

const SearchPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [results] = useState(mockBusinesses);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {t("search.title")}
            </h1>
            <p className="text-white/90">{t("search.subtitle")}</p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="container mx-auto px-4 -mt-8">
          <FilterBar />
        </section>

        {/* Results */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {results.length} {t("search.resultsFound")}
            </h2>
            <p className="text-muted-foreground">{t("search.resultsDescription")}</p>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((business) => (
                <BusinessCard key={business.id} {...business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("search.noResults")}</h3>
              <p className="text-muted-foreground mb-6">{t("search.noResultsDescription")}</p>
              <Link to={`/${lang}/add-business`}>
                <Button>{t("search.addYourBusiness")}</Button>
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
