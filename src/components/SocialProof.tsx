import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const SocialProof = () => {
  const { t } = useTranslation(['trust', 'common']);
  const neighbors = t('trust:items', { returnObjects: true }) as Array<{
    name: string;
    initials: string;
    favorites: string[];
    reviews: number;
  }>;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("trust:section.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("trust:section.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {neighbors.map((neighbor, index) => (
            <Card 
              key={index} 
              className="transition-smooth hover:shadow-smooth-lg hover:-translate-y-1 cursor-pointer border-2"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 bg-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {neighbor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{neighbor.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{neighbor.reviews} {t("trust:reviews")}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{t("trust:favorites")}:</p>
                  <div className="flex flex-col gap-1">
                    {neighbor.favorites.map((fav, idx) => (
                      <span key={idx} className="text-sm text-foreground">• {fav}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-white rounded-xl shadow-smooth-md p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">{t("trust:createProfile")}</h3>
          <p className="text-muted-foreground mb-6">
            {t("trust:section.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-smooth hover:bg-primary-hover shadow-smooth">
              {t("trust:createProfile")}
            </button>
            <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium transition-smooth hover:bg-primary hover:text-primary-foreground">
              {t("common:hero.exploreButton")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
