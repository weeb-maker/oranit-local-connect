import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/shared/HeroBanner";
import { CategoryTile } from "@/components/shared/CategoryTile";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { categoryConfig } from "@/lib/categoryConfig";
import heroImage from "@/assets/hero-community.jpg";

// Map categoryConfig to the format expected by CategoryTile
const categories = Object.values(categoryConfig).map((cat) => ({
  slug: cat.slug,
  titleKey: cat.titleKey,
  icon: cat.icon,
  count: 0, // This would come from actual business counts
}));

const ExplorePage = () => {
  const { t, i18n } = useTranslation(['common', 'categories']);
  const { lang } = useParams<{ lang: string }>();
  const [featuredBusinesses, setFeaturedBusinesses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Load localized featured businesses
  useEffect(() => {
    const loadFeaturedBusinesses = async () => {
      const locale = i18n.language || lang || "en";
      try {
        const fixtures = await import(`../data/fixtures/${locale}/featured-businesses.json`);
        setFeaturedBusinesses(fixtures.businesses || []);
      } catch (error) {
        console.warn(`No featured businesses found for locale "${locale}"`);
        setFeaturedBusinesses([]);
      }
    };
    loadFeaturedBusinesses();
  }, [i18n.language, lang]);

  // Filter businesses based on search and category
  const filteredBusinesses = featuredBusinesses.filter((business) => {
    const matchesSearch = !searchQuery || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          imageUrl={heroImage}
          title={t("common:explore.title")}
          subtitle={t("common:explore.subtitle")}
          minHeight="sm"
          align="center"
        />

        {/* Global Search Bar */}
        <section className="container mx-auto px-4 -mt-8 mb-6">
          <FilterBar 
            showFilters={true}
            onSearch={(query) => setSearchQuery(query)}
            onCategoryChange={(category) => setSelectedCategory(category)}
          />
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">{t("common:labels.browseByCategory")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryTile
                key={category.slug}
                slug={category.slug}
                title={t(category.titleKey, { ns: 'categories' })}
                icon={category.icon}
                count={category.count}
              />
            ))}
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t("common:explore.featuredTitle")}</h2>
              {(searchQuery || selectedCategory) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                >
                  {t("common:labels.clearFilters", "Clear Filters")}
                </Button>
              )}
            </div>
            {filteredBusinesses.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  {t("common:labels.showingResults", { count: filteredBusinesses.length })}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBusinesses.map((business) => (
                    <BusinessCard key={business.id} {...business} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>{t("common:labels.noBusinessesFound")}</p>
                {(searchQuery || selectedCategory) && (
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}
                    className="mt-4"
                  >
                    {t("common:labels.clearFilters", "Clear Filters")}
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-primary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{t("common:explore.ctaTitle")}</h2>
            <p className="text-xl mb-8 opacity-90">{t("common:explore.ctaSubtitle")}</p>
            <Link to={`/${lang}/add-business`}>
              <Button size="lg" variant="hero">
                {t("common:explore.ctaButton")}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
