import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Clock } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const deals = [
  {
    business: "Pizzeria Napoli",
    offer: "10% off all pizzas",
    validUntil: "Valid until Dec 31",
    category: "Food & Drink",
  },
  {
    business: "Green Garden Center",
    offer: "Free coffee with any purchase over ₪50",
    validUntil: "Valid this week",
    category: "Shops & Retail",
  },
  {
    business: "Oranit Fitness Club",
    offer: "First month 50% off",
    validUntil: "New members only",
    category: "Wellness",
  },
  {
    business: "Tech Repairs Oranit",
    offer: "Free diagnostic with any repair",
    validUntil: "Valid until Feb 28",
    category: "Professional Services",
  },
  {
    business: "Café Aroma",
    offer: "Buy 5 coffees, get 1 free",
    validUntil: "Loyalty card required",
    category: "Food & Drink",
  },
];

const LocalDeals = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <Tag className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent-foreground">{t("deals.title")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("deals.subtitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("deals.viewAll")}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {deals.map((deal, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full transition-smooth hover:shadow-smooth-lg hover:-translate-y-1 cursor-pointer border-2">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{deal.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{deal.business}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">{deal.offer}</p>
                      <p className="text-sm text-muted-foreground">{deal.validUntil}</p>
                    </div>

                    <Button variant="outline" className="w-full mt-auto">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-8">
          <Button variant="default" size="lg" asChild>
            <a href="/deals">View All Specials</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocalDeals;
