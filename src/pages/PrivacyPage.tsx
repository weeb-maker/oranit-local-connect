import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

const PrivacyPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'he';
  
  useEffect(() => {
    document.title = t("privacy.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("privacy.seo.description"));
    }
    
    // Add schema.org structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": t("privacy.title"),
      "description": t("privacy.seo.description"),
      "inLanguage": currentLang,
      "url": `https://oranit.biz/${currentLang}/privacy`,
      "dateModified": "2025-10-01"
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [t, currentLang]);
  
  const sections = [
    { id: "intro", key: "intro" },
    { id: "collect", key: "collect" },
    { id: "use", key: "use" },
    { id: "share", key: "share" },
    { id: "cookies", key: "cookies" },
    { id: "retention", key: "retention" },
    { id: "rights", key: "rights" },
    { id: "security", key: "security" },
    { id: "international", key: "international" },
    { id: "children", key: "children" },
    { id: "updates", key: "updates" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        {/* Hero */}
        <section className="pt-24 pb-12 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("privacy.title")}</h1>
            <p className="text-xl text-muted-foreground mb-2">{t("privacy.subtitle")}</p>
            <p className="text-sm text-muted-foreground">{t("privacy.updated")}</p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
              {/* Main Content */}
              <div className="space-y-12">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4">
                      {t(`privacy.${section.key}.title`)}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`privacy.${section.key}.body`)}
                    </p>
                  </div>
                ))}

                {/* Contact Card */}
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <div className="text-center space-y-4">
                    <Mail className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">{t("privacy.contact.title")}</h2>
                    <p className="text-muted-foreground">{t("privacy.contact.body")}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button asChild size="lg">
                        <Link to={`/${currentLang}/contact`}>
                          {t("privacy.contact.button")}
                        </Link>
                      </Button>
                      <a 
                        href={`mailto:${t("privacy.contact.email")}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {t("privacy.contact.email")}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Table of Contents - Sticky Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <nav aria-label="Privacy Policy navigation" className="space-y-1">
                    <p className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
                      {t("privacy.toc")}
                    </p>
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                      >
                        {t(`privacy.${section.key}.title`)}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
  );
};

export default PrivacyPage;
