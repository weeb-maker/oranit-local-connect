import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    document.title = t("terms.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("terms.seo.description"));
    }
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("terms.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("terms.lastUpdated")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("terms.sections.intro.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.intro.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("terms.sections.use.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("terms.sections.use.body")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t("terms.sections.use.items.0")}</li>
                  <li>{t("terms.sections.use.items.1")}</li>
                  <li>{t("terms.sections.use.items.2")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("terms.sections.listings.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.listings.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("terms.sections.content.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.content.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("terms.sections.liability.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.liability.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("terms.sections.changes.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.changes.body")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
