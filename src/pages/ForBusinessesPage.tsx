import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Check, 
  Eye, 
  Globe, 
  Search, 
  Megaphone,
  UserPlus,
  CheckCircle,
  Rocket,
  Star,
  TrendingUp,
  Users,
  Building,
  Award,
  Calendar,
  ShoppingBag,
  FileText,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ForBusinessesPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';
  const { toast } = useToast();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  // Handle anchor scrolling on mount and hash changes
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("businesses.contact.success"),
      description: t("businesses.contact.successDesc"),
    });
  };

  const valueProps = [
    {
      icon: Eye,
      titleKey: "businesses.values.localVisibility",
      descKey: "businesses.values.localVisibilityDesc",
    },
    {
      icon: Globe,
      titleKey: "businesses.values.bilingual",
      descKey: "businesses.values.bilingualDesc",
    },
    {
      icon: Search,
      titleKey: "businesses.values.searchable",
      descKey: "businesses.values.searchableDesc",
    },
    {
      icon: Megaphone,
      titleKey: "businesses.values.promotions",
      descKey: "businesses.values.promotionsDesc",
    },
  ];

  const tiers = [
    {
      key: "free",
      icon: Check,
      price: { monthly: 0, annual: 0 },
      features: [
        "businesses.tiers.free.feature1",
        "businesses.tiers.free.feature2",
        "businesses.tiers.free.feature3",
      ],
      buttonVariant: "outline" as const,
    },
    {
      key: "basic",
      icon: Star,
      popular: true,
      price: { monthly: 99, annual: 990 },
      features: [
        "businesses.tiers.basic.feature1",
        "businesses.tiers.basic.feature2",
        "businesses.tiers.basic.feature3",
        "businesses.tiers.basic.feature4",
      ],
      buttonVariant: "default" as const,
    },
    {
      key: "premium",
      icon: Rocket,
      price: { monthly: 249, annual: 2490 },
      features: [
        "businesses.tiers.premium.feature1",
        "businesses.tiers.premium.feature2",
        "businesses.tiers.premium.feature3",
        "businesses.tiers.premium.feature4",
        "businesses.tiers.premium.feature5",
      ],
      buttonVariant: "default" as const,
    },
  ];

  const howItWorksSteps = [
    { icon: UserPlus, textKey: "businesses.how.step1" },
    { icon: CheckCircle, textKey: "businesses.how.step2" },
    { icon: Rocket, textKey: "businesses.how.step3" },
    { icon: TrendingUp, textKey: "businesses.how.step4" },
  ];

  const sponsorOptions = [
    {
      icon: Star,
      titleKey: "businesses.sponsor.featured",
      descKey: "businesses.sponsor.featuredDesc",
    },
    {
      icon: Building,
      titleKey: "businesses.sponsor.homepage",
      descKey: "businesses.sponsor.homepageDesc",
    },
    {
      icon: Calendar,
      titleKey: "businesses.sponsor.events",
      descKey: "businesses.sponsor.eventsDesc",
    },
    {
      icon: ShoppingBag,
      titleKey: "businesses.sponsor.marketplace",
      descKey: "businesses.sponsor.marketplaceDesc",
    },
  ];

  const resources = [
    {
      icon: Award,
      titleKey: "businesses.resources.reviews",
      descKey: "businesses.resources.reviewsDesc",
    },
    {
      icon: Calendar,
      titleKey: "businesses.resources.events",
      descKey: "businesses.resources.eventsDesc",
    },
    {
      icon: FileText,
      titleKey: "businesses.resources.profileTips",
      descKey: "businesses.resources.profileTipsDesc",
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir={currentLang === 'he' ? 'rtl' : 'ltr'}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Building className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{t("nav.forBusinesses")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("businesses.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("businesses.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to={`/${currentLang}/add-business`}>
                  {t("businesses.cta.add")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">{t("businesses.cta.contact")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <Card key={index} className="text-center hover:shadow-smooth-lg transition-smooth">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{t(prop.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t(prop.descKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("businesses.pricing.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("businesses.pricing.subtitle")}
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-card p-2 rounded-lg shadow-card">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-md transition-smooth ${
                  billingPeriod === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t("businesses.billing.monthly")}
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2 rounded-md transition-smooth flex items-center gap-2 ${
                  billingPeriod === "annual"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t("businesses.billing.annual")}
                <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                  {t("businesses.billing.save")}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const price = tier.price[billingPeriod];
              return (
                <Card
                  key={tier.key}
                  className={`relative transition-smooth hover:shadow-smooth-lg hover:-translate-y-2 border-2 ${
                    tier.popular
                      ? "border-primary shadow-smooth-lg lg:scale-105"
                      : "border-muted"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-smooth">
                        {t("businesses.pricing.popular")}
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {t(`businesses.tiers.${tier.key}.name`)}
                    </CardTitle>
                    <div className="text-4xl font-bold text-primary">
                      {price === 0 ? (
                        t("businesses.pricing.free")
                      ) : (
                        <>
                          ₪{price}
                          <span className="text-sm text-muted-foreground">
                            /{billingPeriod === "monthly" ? t("businesses.billing.perMonth") : t("businesses.billing.perYear")}
                          </span>
                        </>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{t(feature)}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={tier.buttonVariant}
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <Link to={`/${currentLang}/add-business`}>
                        {t("businesses.choosePlan")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("businesses.how.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-sm font-medium">{t(step.textKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsorship Options */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">{t("businesses.sponsor.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("businesses.sponsor.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("businesses.sponsor.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {sponsorOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="hover:shadow-smooth-lg transition-smooth">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-2">
                          {t(option.titleKey)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {t(option.descKey)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <a href="#contact">{t("businesses.sponsor.cta")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("businesses.success.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((num) => (
              <Card key={num} className="hover:shadow-smooth-lg transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">
                    "{t(`businesses.success.card${num}.quote`)}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {t(`businesses.success.card${num}.name`)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(`businesses.success.card${num}.role`)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-16 lg:py-24 bg-gradient-to-br from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("businesses.resources.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:shadow-smooth-lg transition-smooth">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{t(resource.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      {t(resource.descKey)}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Download className="h-4 w-4" />
                      {t("businesses.resources.download")}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("businesses.faq.title")}
            </h2>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((num) => (
              <AccordionItem key={num} value={`item-${num}`}>
                <AccordionTrigger className="text-start">
                  {t(`businesses.faq.q${num}`)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(`businesses.faq.a${num}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("businesses.contact.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("businesses.contact.subtitle")}
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("businesses.contact.name")}
                      </label>
                      <Input required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("businesses.contact.businessName")}
                      </label>
                      <Input required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("businesses.contact.email")}
                      </label>
                      <Input type="email" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("businesses.contact.phone")}
                      </label>
                      <Input type="tel" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("businesses.contact.message")}
                    </label>
                    <Textarea rows={4} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    {t("businesses.contact.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t("businesses.footer.text")}
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link to={`/${currentLang}/add-business`}>
              {t("businesses.footer.cta")}
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForBusinessesPage;
