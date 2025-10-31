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

const LocalDeals = () => {
  const { t } = useTranslation(['common', 'specials']);
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';

  // Get deals from specials namespace
  const deals = t('cards', { ns: 'specials', returnObjects: true }) as Array<{
    category: string;
    businessName: string;
    offer: string;
    validUntil: string;
  }>;

  // Format date based on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLang === 'he' ? 'he-IL' : 'en-US', {
      dateStyle: 'medium',
    }).format(date);
  };

  return (
    <section className="py-16 lg:py-24 bg-secondary/30" dir={currentLang === 'he' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <Tag className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent-foreground">
              {t('section.title', { ns: 'specials' })}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('section.subtitle', { ns: 'specials' })}
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: currentLang === 'he' ? 'rtl' : 'ltr',
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
                      <h3 className="font-semibold text-lg mb-2">{deal.businessName}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">{deal.offer}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('section.validUntil', { ns: 'specials' })} {formatDate(deal.validUntil)}
                      </p>
                    </div>

                    <Button variant="outline" className="w-full mt-auto">
                      {t('buttons.viewDetails')}
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
            <a href={`/${currentLang}/deals`}>
              {t('section.ctaAll', { ns: 'specials' })}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocalDeals;
