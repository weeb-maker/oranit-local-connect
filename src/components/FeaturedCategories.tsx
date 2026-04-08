import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";

const FeaturedCategories = () => {
  const { t } = useTranslation(["categories"]);
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "he";

  const { data: categories, isLoading, error } = useCategories(currentLang);

  if (error) {
    console.error("Error loading categories:", error);
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("categories:section.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("categories:section.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories?.map((category, index) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.id}
                  href={`/${currentLang}/category/${category.slug}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card className="h-full transition-smooth hover:shadow-hover hover:-translate-y-1 cursor-pointer border hover:border-primary/40">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center transition-smooth group-hover:bg-primary/20 group-hover:scale-110">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;
