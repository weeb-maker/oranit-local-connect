import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, Store, Tag, Users } from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";
import { useCategories } from "@/hooks/useCategories";

const quickLinks = [
  { key: "businesses", icon: Briefcase, path: "explore" },
  { key: "marketplace", icon: Store, path: "marketplace" },
  { key: "deals", icon: Tag, path: "deals" },
  { key: "residents", icon: Users, path: "residents" },
];

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
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,var(--hero-overlay-from)), rgba(0,0,0,var(--hero-overlay-to)))`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--hero-fade)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 pb-12 md:pb-16 max-w-4xl flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg animate-fade-in">
            {t("hero.headline")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl animate-fade-in">
            {t("hero.subtext")}
          </p>

          {/* Search Bar */}
          <div className="w-full bg-card/95 backdrop-blur-md rounded-xl shadow-lg p-4 animate-slide-up">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("hero.searchPlaceholder")}
                  className="pl-10 bg-background border-border"
                />
              </div>

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

              <Button size="lg" className="md:w-auto bg-accent text-accent-foreground hover:bg-accent-hover font-semibold" asChild>
                <a href={`/${currentLang}/search`}>{t("hero.searchButton")}</a>
              </Button>
            </div>
          </div>

          {/* Quick Link Buttons */}
          <div className="flex flex-wrap justify-center gap-3 animate-scale-in">
            {quickLinks.map(({ key, icon: Icon, path }) => (
              <Button
                key={key}
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white/25 hover:bg-white/20 hover:text-white gap-2"
                asChild
              >
                <a href={`/${currentLang}/${path}`}>
                  <Icon className="h-4 w-4" />
                  {t(`hero.quickLinks.${key}`)}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
