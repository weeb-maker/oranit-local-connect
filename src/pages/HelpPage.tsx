import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";

const HelpPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "he";

  useEffect(() => {
    document.title = t("help.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("help.seo.description"));
    }
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("help.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("help.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link to={`/${currentLang}/contact`}>
              <Card className="h-full hover:shadow-hover transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{t("help.quickHelp.contact.title")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("help.quickHelp.contact.body")}</p>
                </CardContent>
              </Card>
            </Link>

            <a href="https://wa.me/972540000000" target="_blank" rel="noopener noreferrer">
              <Card className="h-full hover:shadow-hover transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{t("help.quickHelp.whatsapp.title")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t("help.quickHelp.whatsapp.body")}</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* General FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t("help.categories.general.title")}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <AccordionItem
                    key={index}
                    value={`general-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {t(`help.categories.general.items.${index}.q`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {t(`help.categories.general.items.${index}.a`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Business FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t("help.categories.business.title")}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <AccordionItem
                    key={index}
                    value={`business-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {t(`help.categories.business.items.${index}.q`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {t(`help.categories.business.items.${index}.a`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Events FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t("help.categories.events.title")}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {[0, 1].map((index) => (
                  <AccordionItem
                    key={index}
                    value={`events-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {t(`help.categories.events.items.${index}.q`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {t(`help.categories.events.items.${index}.a`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("help.cta.title")}</h2>
          <p className="text-muted-foreground mb-6">{t("help.cta.body")}</p>
          <Button size="lg" asChild>
            <Link to={`/${currentLang}/contact`}>{t("help.cta.button")}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPage;
