import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";

// Color palette for category cards
const categoryColors = [
  "from-green-500/20 to-green-600/20",
  "from-orange-500/20 to-orange-600/20",
  "from-blue-500/20 to-blue-600/20",
  "from-yellow-500/20 to-yellow-600/20",
  "from-pink-500/20 to-pink-600/20",
  "from-purple-500/20 to-purple-600/20",
  "from-cyan-500/20 to-cyan-600/20",
  "from-indigo-500/20 to-indigo-600/20",
  "from-rose-500/20 to-rose-600/20",
  "from-teal-500/20 to-teal-600/20",
  "from-amber-500/20 to-amber-600/20",
];

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
              const color = categoryColors[index % categoryColors.length];
              return (
                <a
                  key={category.id}
                  href={`/${currentLang}/category/${category.slug}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card className="h-full transition-smooth hover:shadow-smooth-lg hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center transition-smooth group-hover:scale-110`}
                      >
                        <Icon className="h-8 w-8 text-primary" />
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
