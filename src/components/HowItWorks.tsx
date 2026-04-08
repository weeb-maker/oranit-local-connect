import { useTranslation } from "react-i18next";
import { Search, Heart, Gift } from "lucide-react";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: Search },
    { icon: Heart },
    { icon: Gift },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("howItWorks.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const stepKey = `step${index + 1}`;
            return (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center transition-smooth hover:bg-primary/15 hover:scale-105">
                  <Icon className="h-10 w-10 text-primary" />
                </div>

                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(`howItWorks.${stepKey}.title`)}</h3>
                </div>

                <p className="text-muted-foreground">{t(`howItWorks.${stepKey}.description`)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-muted rounded-xl p-8 max-w-2xl">
            <p className="text-lg font-medium mb-4">
              {t("socialProof.subtitle")}
            </p>
            <p className="text-sm text-muted-foreground">— {t("socialProof.title")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
