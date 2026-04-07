import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Heart, Users, Utensils, TreePine, Gift, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";
import HeroBanner from "@/components/shared/HeroBanner";

const VolunteerPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const isRtl = lang === "he";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const opportunities = [
    { icon: Utensils, key: "foodDrive" },
    { icon: Users, key: "elderly" },
    { icon: TreePine, key: "cleanup" },
    { icon: Gift, key: "holidays" },
    { icon: Heart, key: "tutoring" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <HeroBanner
        imageUrl={heroImage}
        title={t("residents.volunteerPage.title")}
        subtitle={t("residents.volunteerPage.subtitle")}
        minHeight="md"
        align="center"
      >
        <Button size="lg" className="gap-2 shadow-lg">
          <Heart className="h-5 w-5" />
          {t("residents.volunteerPage.signUp")}
        </Button>
      </HeroBanner>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <Link
          to={`/${lang}/residents`}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <BackArrow className="h-4 w-4" />
          {t("residents.volunteerPage.backToResidents")}
        </Link>

        <div>
          <h2 className="text-3xl font-bold mb-2">{t("residents.volunteerPage.currentTitle")}</h2>
          <p className="text-muted-foreground mb-8">{t("residents.volunteerPage.currentSubtitle")}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <Card key={opp.key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <opp.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`residents.volunteerPage.opportunities.${opp.key}.title`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`residents.volunteerPage.opportunities.${opp.key}.desc`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {t(`residents.volunteerPage.opportunities.${opp.key}.time`)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {t(`residents.volunteerPage.opportunities.${opp.key}.location`)}
                  </div>
                  <Badge variant="secondary">
                    {t(`residents.volunteerPage.opportunities.${opp.key}.badge`)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("residents.volunteerPage.ctaTitle")}</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("residents.volunteerPage.ctaDesc")}
          </p>
          <Button size="lg">{t("residents.volunteerPage.ctaButton")}</Button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default VolunteerPage;
