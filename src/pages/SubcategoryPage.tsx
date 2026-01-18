import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubcategory } from "@/hooks/useCategories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SubcategoryPage = () => {
  const { t } = useTranslation(["common", "categories"]);
  const { slug, subslug, lang } = useParams<{ slug: string; subslug: string; lang: string }>();
  const currentLang = lang || "en";

  // Fetch subcategory from database
  const { data, isLoading, error } = useSubcategory(slug || "", subslug || "", currentLang);

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

  if (error || !data) {
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

  const { category, subcategory } = data;
  const CategoryIcon = category.icon;
  const SubcategoryIcon = subcategory.icon;

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
                  <BreadcrumbLink href={`/${currentLang}/category/${category.slug}`}>
                    {category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{subcategory.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Subcategory Header */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <SubcategoryIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-white/70 mb-1 flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4" />
                  {category.name}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {subcategory.name}
                </h1>
                <p className="text-white/90">{subcategory.description}</p>
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
                0 {t("common:business.businessesFound")}
              </h2>
            </div>
            <Link to={`/${currentLang}/category/${category.slug}`}>
              <Button variant="outline">
                {currentLang === "he" ? "→" : "←"} {category.name}
              </Button>
            </Link>
          </div>

          <div className="text-center py-12 text-muted-foreground">
            <p>{t("common:labels.noBusinessesFound")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
