import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <section className="py-16 lg:py-24 bg-muted">
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
              className="transition-smooth hover:shadow-hover hover:-translate-y-1 cursor-pointer border"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {neighbor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{neighbor.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" />
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

        <Card className="max-w-3xl mx-auto">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold mb-4">{t("trust:createProfile")}</h3>
            <p className="text-muted-foreground mb-6">
              {t("trust:section.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg">
                {t("trust:createProfile")}
              </Button>
              <Button variant="outline" size="lg">
                {t("common:hero.exploreButton")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SocialProof;
