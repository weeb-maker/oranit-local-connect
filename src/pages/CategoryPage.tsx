import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FilterBar } from "@/components/shared/FilterBar";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategory } from "@/hooks/useCategories";
import { loadBusinessFixtures } from "@/lib/businessFixtures";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CategoryPage = () => {
  const { t, i18n } = useTranslation(["common", "categories"]);
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const currentLang = lang || "en";
  const [businesses, setBusinesses] = useState<any[]>([]);

  // Fetch category from database
  const { data: category, isLoading, error } = useCategory(slug || "", currentLang);

  // Load localized business fixtures using slug
  useEffect(() => {
    const loadData = async () => {
      const locale = i18n.language || lang || "en";
      const fixtureBusinesses = await loadBusinessFixtures(slug || "", locale);
      setBusinesses(fixtureBusinesses);
    };
    loadData();
  }, [slug, lang, i18n.language]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <section className="bg-primary py-12">
            <div className="container mx-auto px-4">
              <Skeleton className="h-16 w-16 rounded-full bg-white/20" />
              <Skeleton className="h-10 w-64 mt-4 bg-white/20" />
              <Skeleton className="h-6 w-96 mt-2 bg-white/20" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t("common:labels.categoryNotFound")}</h1>
            <Link to={`/${currentLang}/explore`}>
              <Button>{t("common:nav.businesses")}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const CategoryIcon = category.icon;

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
                  <BreadcrumbLink href={`/${currentLang}`}>{t("common:nav.home")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${currentLang}/explore`}>
                    {t("common:nav.businesses")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
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
                  {category.name}
                </h1>
                <p className="text-white/90">{category.description}</p>
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
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t("common:labels.subcategories")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.subcategories.map((subcategory) => {
                  const SubIcon = subcategory.icon;
                  return (
                    <Link
                      key={subcategory.id}
                      to={`/${currentLang}/category/${category.slug}/${subcategory.slug}`}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <SubIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{subcategory.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              0 {t("common:labels.businesses")}
                            </p>
                          </div>
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
            <Link to={`/${currentLang}/explore`}>
              <Button variant="outline">
                {currentLang === "he" ? "→" : "←"} {t("common:nav.businesses")}
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
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
