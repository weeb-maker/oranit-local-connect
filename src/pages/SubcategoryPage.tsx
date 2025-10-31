import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FilterBar } from "@/components/shared/FilterBar";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { getCategoryConfig, getSubcategoryConfig } from "@/lib/categoryConfig";
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
];

const SubcategoryPage = () => {
  const { t } = useTranslation(['common', 'categories']);
  const { slug, subslug, lang } = useParams<{ slug: string; subslug: string; lang: string }>();

  // Get category and subcategory config
  const categoryConfig = getCategoryConfig(slug || "other-services");
  const subcategoryConfig = getSubcategoryConfig(slug || "other-services", subslug || "");
  
  const CategoryIcon = categoryConfig.icon;
  const SubcategoryIcon = subcategoryConfig?.icon;
  const categoryTitle = t(categoryConfig.titleKey, { ns: 'categories' });
  const subcategoryTitle = subcategoryConfig ? t(subcategoryConfig.titleKey, { ns: 'categories' }) : "";
  const subcategoryDescription = subcategoryConfig ? t(subcategoryConfig.descriptionKey, { ns: 'categories' }) : "";

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
                  <BreadcrumbLink href={`/${lang}`}>{t("common:nav.home")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${lang}/explore`}>
                    {t("common:nav.businesses")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${lang}/category/${slug}`}>
                    {categoryTitle}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{subcategoryTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Subcategory Header */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              {SubcategoryIcon && (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <SubcategoryIcon className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <div className="text-sm text-white/70 mb-1 flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4" />
                  {categoryTitle}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {subcategoryTitle}
                </h1>
                <p className="text-white/90">{subcategoryDescription}</p>
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
                {mockBusinesses.length} {t("common:business.businessesFound")}
              </h2>
            </div>
            <Link to={`/${lang}/category/${slug}`}>
              <Button variant="outline">
                {lang === 'he' ? '→' : '←'} {categoryTitle}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
