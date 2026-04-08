import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart, Users, Utensils, TreePine, Gift, Clock, MapPin,
  Globe, Phone, Mail, HandHeart, Target, TrendingUp,
  Stethoscope, GraduationCap, Dog
} from "lucide-react";
import heroImage from "@/assets/hero-giving.jpg";
import HeroBanner from "@/components/shared/HeroBanner";
import { Progress } from "@/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const GivingPage = () => {
  const { t } = useTranslation(["common"]);
  const { lang } = useParams<{ lang: string }>();

  const opportunities = [
    { icon: Utensils, key: "foodDrive" },
    { icon: Users, key: "elderly" },
    { icon: TreePine, key: "cleanup" },
    { icon: Gift, key: "holidays" },
    { icon: Heart, key: "tutoring" },
  ];

  const charities = [
    { icon: HandHeart, key: "hesed" },
    { icon: Stethoscope, key: "health" },
    { icon: GraduationCap, key: "education" },
    { icon: Dog, key: "animals" },
    { icon: Users, key: "elderly" },
  ];

  const campaigns = [
    { key: "backToSchool", progress: 72, icon: GraduationCap },
    { key: "winterCoats", progress: 45, icon: Gift },
    { key: "petShelter", progress: 88, icon: Dog },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <HeroBanner
        imageUrl={heroImage}
        title={t("common:giving.hero.title")}
        subtitle={t("common:giving.hero.subtitle")}
        minHeight="md"
        align="center"
      >
        <Button size="lg" className="gap-2 shadow-lg">
          <Heart className="h-5 w-5" />
          {t("common:giving.hero.cta")}
        </Button>
      </HeroBanner>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${lang}`}>{t("common:breadcrumbs.home")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("common:giving.hero.title")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Volunteer Opportunities */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{t("common:giving.volunteers.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("common:giving.volunteers.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <Card key={opp.key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <opp.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`common:giving.volunteers.opportunities.${opp.key}.title`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`common:giving.volunteers.opportunities.${opp.key}.desc`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    {t(`common:giving.volunteers.opportunities.${opp.key}.time`)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {t(`common:giving.volunteers.opportunities.${opp.key}.location`)}
                  </div>
                  <Badge variant="secondary">
                    {t(`common:giving.volunteers.opportunities.${opp.key}.badge`)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Local Charities & NGOs */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{t("common:giving.charities.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("common:giving.charities.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charities.map((charity) => (
              <Card key={charity.key} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <charity.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {t(`common:giving.charities.orgs.${charity.key}.name`)}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {t(`common:giving.charities.orgs.${charity.key}.category`)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {t(`common:giving.charities.orgs.${charity.key}.mission`)}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <a href="#" className="inline-flex items-center gap-1 text-primary hover:underline">
                      <Globe className="h-3.5 w-3.5" />
                      {t("common:giving.charities.website")}
                    </a>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      {t(`common:giving.charities.orgs.${charity.key}.phone`)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Active Campaigns */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{t("common:giving.campaigns.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("common:giving.campaigns.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <campaign.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {t(`common:giving.campaigns.items.${campaign.key}.title`)}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {t(`common:giving.campaigns.items.${campaign.key}.desc`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("common:giving.campaigns.raised")}</span>
                      <span className="font-medium">{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    {t(`common:giving.campaigns.items.${campaign.key}.goal`)}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("common:giving.campaigns.donate")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("common:giving.cta.title")}</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("common:giving.cta.desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
              {t("common:giving.cta.volunteer")}
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <HandHeart className="h-5 w-5" />
              {t("common:giving.cta.register")}
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default GivingPage;
