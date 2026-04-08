import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";
import { useCategories } from "@/hooks/useCategories";

const Hero = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';
  const isRTL = currentLang === 'he';

  const { data: categories = [], isLoading: categoriesLoading } = useCategories(currentLang);

  return (
    <section className="relative overflow-hidden min-h-[520px] flex flex-col justify-end" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={t("hero.headline")}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 to-foreground/35" />
        {/* Bottom fade into page background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--hero-fade)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 pb-12 md:pb-16 max-w-4xl flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg animate-fade-in">
            {t("hero.headline")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl animate-fade-in">
            {t("hero.subtext")}
          </p>

          {/* Search Bar */}
          <div className="w-full bg-card/95 backdrop-blur-md rounded-xl shadow-lg p-4 animate-slide-up">
            <div className="flex flex-col md:flex-row gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px] bg-background border-border">
                  <SelectValue placeholder={t("hero.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">{t("hero.categoryPlaceholder")}</SelectItem>
                  {categoriesLoading ? (
                    <SelectItem value="loading" disabled>
                      {t("common.loading", "Loading...")}
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("hero.searchPlaceholder")}
                  className="pl-10 bg-background border-border"
                />
              </div>

              <Button size="lg" className="md:w-auto" asChild>
                <a href={`/${currentLang}/search`}>{t("hero.searchButton")}</a>
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
            <Button variant="default" size="lg" asChild>
              <a href={`/${currentLang}/explore`}>{t("hero.exploreButton")}</a>
            </Button>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30" asChild>
              <a href={`/${currentLang}/add-business`}>{t("hero.addBusinessButton")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
