import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";

const Hero = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background py-20 lg:py-32">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            {t("hero.headline")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("hero.subtext")}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-smooth-lg p-4 mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px] bg-background">
                  <SelectValue placeholder={t("hero.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">{t("hero.categoryPlaceholder")}</SelectItem>
                  <SelectItem value="shops">{t("nav.shops")}</SelectItem>
                  <SelectItem value="food">{t("nav.food")}</SelectItem>
                  <SelectItem value="professional">{t("nav.professional")}</SelectItem>
                  <SelectItem value="home">{t("nav.home")}</SelectItem>
                  <SelectItem value="wellness">{t("nav.wellness")}</SelectItem>
                  <SelectItem value="transport">{t("nav.mobility")}</SelectItem>
                  <SelectItem value="youth">{t("nav.youth")}</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("hero.searchPlaceholder")}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Button size="lg" className="md:w-auto">
                {t("hero.searchButton")}
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button variant="hero" size="lg" asChild>
              <a href={`/${currentLang}/explore`}>{t("hero.exploreButton")}</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={`/${currentLang}/add-business`}>{t("hero.addBusinessButton")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
