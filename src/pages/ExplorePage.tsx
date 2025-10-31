import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CategoryTile } from "@/components/shared/CategoryTile";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { categoryConfig } from "@/lib/categoryConfig";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("common:explore.title")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("common:explore.subtitle")}
            </p>
          </div>
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
            <h2 className="text-3xl font-bold mb-8">{t("common:explore.featuredTitle")}</h2>
            {featuredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBusinesses.map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>{t("common:labels.noBusinessesFound")}</p>
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
