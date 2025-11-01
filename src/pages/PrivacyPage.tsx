import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    document.title = t("privacy.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("privacy.seo.description"));
    }
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("privacy.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("privacy.lastUpdated")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("privacy.sections.intro.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.intro.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("privacy.sections.collection.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("privacy.sections.collection.body")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t("privacy.sections.collection.items.0")}</li>
                  <li>{t("privacy.sections.collection.items.1")}</li>
                  <li>{t("privacy.sections.collection.items.2")}</li>
                  <li>{t("privacy.sections.collection.items.3")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("privacy.sections.usage.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.usage.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("privacy.sections.sharing.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.sharing.body")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("privacy.sections.rights.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("privacy.sections.rights.body")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t("privacy.sections.rights.items.0")}</li>
                  <li>{t("privacy.sections.rights.items.1")}</li>
                  <li>{t("privacy.sections.rights.items.2")}</li>
                  <li>{t("privacy.sections.rights.items.3")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">{t("privacy.sections.contact.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.contact.body")}
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

export default PrivacyPage;
