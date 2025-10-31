import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FilterBar } from "@/components/shared/FilterBar";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryConfig } from "@/lib/categoryConfig";
import { loadBusinessFixtures, slugToCamelCase } from "@/lib/businessFixtures";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CategoryPage = () => {
  const { t, i18n } = useTranslation(['common', 'categories']);
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const [businesses, setBusinesses] = useState<any[]>([]);

  // Get category config and convert slug to camelCase key
  const categoryConfig = getCategoryConfig(slug || "other-services");
  const CategoryIcon = categoryConfig.icon;
  const categoryKey = slugToCamelCase(slug || "other-services");
  
  // Use the top-level category keys for title/description
  const categoryTitle = t(`categories:top.${categoryKey}.title`);
  const categoryDescription = t(`categories:top.${categoryKey}.description`);

  // Load localized business fixtures
  useEffect(() => {
    const loadData = async () => {
      const locale = i18n.language || lang || "en";
      const fixtureBusinesses = await loadBusinessFixtures(slug || "other-services", locale);
      setBusinesses(fixtureBusinesses);
    };
    loadData();
  }, [slug, lang, i18n.language]);

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
          {/* Subcategories */}
          {categoryConfig.subcategories && categoryConfig.subcategories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t("common:labels.subcategories")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryConfig.subcategories.map((subcategory) => {
                  const SubIcon = subcategory.icon;
                  return (
                    <Link
                      key={subcategory.slug}
                      to={`/${lang}/category/${slug}/${subcategory.slug}`}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <SubIcon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold">{t(subcategory.titleKey, { ns: 'categories' })}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {businesses.length} {t("common:business.businessesFound")}
              </h2>
            </div>
            <Link to={`/${lang}/explore`}>
              <Button variant="outline">
                {lang === 'he' ? '→' : '←'} {t("common:nav.businesses")}
              </Button>
            </Link>
          </div>

          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} {...business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>{t("common:labels.noBusinessesFound")}</p>
            </div>
          )}
        </section>

        {/* Related Categories - removed as we now show subcategories */}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
