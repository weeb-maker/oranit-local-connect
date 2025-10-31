import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FilterBar } from "@/components/shared/FilterBar";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { CategoryTile } from "@/components/shared/CategoryTile";
import { Button } from "@/components/ui/button";
import { getCategoryConfig } from "@/lib/categoryConfig";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    name: "Pizza Paradise",
    category: "Food & Drink",
    description: "Authentic Italian pizza with fresh ingredients",
    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop",
    rating: 4.7,
    verified: true,
    location: "Center, Oranit",
  },
  {
    id: "3",
    name: "Sushi Corner",
    category: "Food & Drink",
    description: "Fresh sushi and Japanese cuisine",
    logo: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
    rating: 4.9,
    verified: false,
    location: "North Oranit",
  },
];

const relatedCategories = [
  { slug: "shops" },
  { slug: "professional" },
  { slug: "home" },
];

const CategoryPage = () => {
  const { t } = useTranslation();
  const { slug, lang } = useParams<{ slug: string; lang: string }>();

  // Get category config
  const categoryConfig = getCategoryConfig(slug || "other");
  const CategoryIcon = categoryConfig.icon;
  const categoryTitle = t(categoryConfig.titleKey);
  const categoryDescription = t(categoryConfig.descriptionKey);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${lang}`}>{t("nav.home")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${lang}/explore`}>
                    {t("nav.businesses")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{categoryTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Category Header */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <CategoryIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {categoryTitle}
                </h1>
                <p className="text-white/90">{categoryDescription}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="container mx-auto px-4 -mt-8 mb-6">
          <FilterBar showFilters={false} />
        </section>

        {/* Results */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {mockBusinesses.length} {t("category.businessesFound")}
              </h2>
            </div>
            <Link to={`/${lang}/explore`}>
              <Button variant="outline">← {t("nav.businesses")}</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </section>

        {/* Related Categories */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t("category.relatedCategories")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedCategories.map((category) => {
                const config = getCategoryConfig(category.slug);
                return (
                  <CategoryTile
                    key={category.slug}
                    slug={category.slug}
                    title={t(config.titleKey)}
                    icon={config.icon}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
