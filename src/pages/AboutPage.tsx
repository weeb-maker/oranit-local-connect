import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Heart, 
  Globe, 
  ShieldCheck, 
  Store, 
  Calendar, 
  MessageSquare, 
  ShoppingBag,
  ArrowRight,
  Quote
} from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";

const AboutPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "he";

  const missionValues = [
    {
      icon: Users,
      title: t("about.mission.values.community"),
      description: t("about.mission.values.communityDesc"),
    },
    {
      icon: Heart,
      title: t("about.mission.values.localFirst"),
      description: t("about.mission.values.localFirstDesc"),
    },
    {
      icon: Globe,
      title: t("about.mission.values.bilingual"),
      description: t("about.mission.values.bilingualDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("about.mission.values.trust"),
      description: t("about.mission.values.trustDesc"),
    },
  ];

  const pillars = [
    {
      icon: Store,
      key: "directory",
      href: `/${currentLang}/explore`,
    },
    {
      icon: Calendar,
      key: "events",
      href: `/${currentLang}/events`,
    },
    {
      icon: MessageSquare,
      key: "residents",
      href: `/${currentLang}/residents`,
    },
    {
      icon: ShoppingBag,
      key: "marketplace",
      href: `/${currentLang}/marketplace`,
    },
  ];

  const storyItems = [
    { key: 0 },
    { key: 1 },
    { key: 2 },
    { key: 3 },
  ];

  const stats = [
    { label: t("about.impact.stats.businesses"), value: "150+" },
    { label: t("about.impact.stats.events"), value: "200+" },
    { label: t("about.impact.stats.itemsRehomed"), value: "500+" },
    { label: t("about.impact.stats.volunteerPosts"), value: "75+" },
  ];

  const testimonials = [
    {
      quote: t("about.impact.testimonials.0.quote"),
      name: t("about.impact.testimonials.0.name"),
      role: t("about.impact.testimonials.0.role"),
    },
    {
      quote: t("about.impact.testimonials.1.quote"),
      name: t("about.impact.testimonials.1.name"),
      role: t("about.impact.testimonials.1.role"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px]">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={t("about.title")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-background max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t("about.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-background/90 max-w-2xl">
              {t("about.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="shadow-lg"
                asChild
              >
                <Link to={`/${currentLang}/contact`}>
                  {t("about.cta.contact")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="hero"
                className="shadow-lg"
                onClick={() => {
                  document
                    .getElementById("get-involved")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("about.cta.involve")}
              </Button>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("about.mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.mission.body")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {missionValues.map((value, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-hover transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("about.story.title")}
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {storyItems.map((item, index) => (
                  <div
                    key={item.key}
                    className="flex gap-6 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                      {index < storyItems.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <Card className="flex-1 hover:shadow-hover transition-shadow mb-4">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">
                              {t(`about.story.items.${item.key}.title`)}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {t(`about.story.items.${item.key}.body`)}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="shrink-0">
                            {t(`about.story.items.${item.key}.date`)}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Do - Four Pillars */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("about.pillars.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {pillars.map((pillar) => (
                <Link key={pillar.key} to={pillar.href}>
                  <Card className="h-full hover:shadow-hover transition-all hover:-translate-y-1 group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <pillar.icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">
                            {t(`about.pillars.${pillar.key}.title`)}
                          </CardTitle>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {t(`about.pillars.${pillar.key}.body`)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Community Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("about.impact.title")}
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-hover transition-shadow">
                  <CardContent className="pt-6">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground italic mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety & Trust */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                {t("about.trust.title")}
              </h2>

              <div className="space-y-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-muted-foreground">
                        {t("about.trust.moderation")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-muted-foreground">
                        {t("about.trust.privacy")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-muted-foreground">
                        {t("about.trust.guidelines")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <Link
                  to={`/${currentLang}/privacy`}
                  className="hover:text-primary underline"
                >
                  Privacy Policy
                </Link>
                {" · "}
                <Link
                  to={`/${currentLang}/terms`}
                  className="hover:text-primary underline"
                >
                  Terms of Service
                </Link>
                {" · "}
                <Link
                  to={`/${currentLang}/help`}
                  className="hover:text-primary underline"
                >
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section id="get-involved" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("about.involve.title")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Button size="lg" variant="default" asChild>
                  <Link to={`/${currentLang}/add-business`}>
                    {t("about.involve.addBusiness")}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={`/${currentLang}/events`}>
                    {t("about.involve.postEvent")}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={`/${currentLang}/residents`}>
                    {t("about.involve.postNotice")}
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link to={`/${currentLang}/contact`}>
                    {t("about.involve.contact")}
                  </Link>
                </Button>
              </div>

              <p className="text-muted-foreground">
                {t("about.involve.sponsor")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("about.contact.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("about.contact.body")}
              </p>
              <Button size="lg" variant="default" asChild>
                <Link to={`/${currentLang}/contact`}>
                  {t("about.cta.contact")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
