import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Rocket } from "lucide-react";

const BusinessPackages = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';

  const packages = [
    {
      key: "starter",
      icon: Check,
      color: "border-muted",
      buttonVariant: "outline" as const,
    },
    {
      key: "base",
      icon: Star,
      popular: true,
      color: "border-primary shadow-smooth-lg",
      buttonVariant: "default" as const,
    },
    {
      key: "extended",
      icon: Rocket,
      color: "border-accent shadow-smooth-lg",
      buttonVariant: "default" as const,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <Rocket className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent-foreground">{t("nav.forBusinesses")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("packages.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("packages.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            const features = [
              t(`packages.${pkg.key}.feature1`),
              t(`packages.${pkg.key}.feature2`),
              t(`packages.${pkg.key}.feature3`),
              t(`packages.${pkg.key}.feature4`),
            ];
            
            if (pkg.key !== "starter") {
              features.push(t(`packages.${pkg.key}.feature5`));
            }
            
            if (pkg.key === "extended") {
              features.push(t(`packages.${pkg.key}.feature6`));
            }

            return (
              <Card 
                key={index} 
                className={`relative transition-smooth hover:shadow-smooth-lg hover:-translate-y-2 border-2 ${pkg.color} ${pkg.popular ? 'lg:scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-smooth">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{t(`packages.${pkg.key}.name`)}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{t(`packages.${pkg.key}.name`)}</p>
                  <div className="text-4xl font-bold text-primary">{t(`packages.${pkg.key}.price`)}</div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={pkg.buttonVariant} 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <a href={`/${currentLang}/add-business`}>
                      {t("packages.getStarted")}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {t("footer.contact")}
          </p>
          <Button variant="ghost" asChild>
            <a href={`/${currentLang}/contact`}>{t("footer.contact")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessPackages;
