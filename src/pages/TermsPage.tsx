import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'he';
  
  useEffect(() => {
    document.title = t("terms.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("terms.seo.description"));
    }
    
    // Add schema.org structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": t("terms.title"),
      "description": t("terms.seo.description"),
      "inLanguage": currentLang,
      "url": `https://oranit.biz/${currentLang}/terms`,
      "dateModified": "2025-10-01",
      "about": "User agreement for Oranit.biz community platform"
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [t, currentLang]);
  
  const sections = [
    { id: "intro", key: "intro" },
    { id: "acceptance", key: "acceptance" },
    { id: "service", key: "service" },
    { id: "accounts", key: "accounts" },
    { id: "conduct", key: "conduct" },
    { id: "listings", key: "listings" },
    { id: "ip", key: "ip" },
    { id: "thirdParty", key: "thirdParty" },
    { id: "liability", key: "liability" },
    { id: "termination", key: "termination" },
    { id: "changes", key: "changes" },
    { id: "law", key: "law" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero with Background */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6 animate-fade-in">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in">
            {t("terms.title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-3 animate-fade-in">{t("terms.subtitle")}</p>
          <p className="text-sm text-muted-foreground/80 animate-fade-in">{t("terms.updated")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 flex-1 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
            {/* Main Content */}
            <div className="space-y-12 animate-fade-in">
              {sections.map((section, index) => (
                <div 
                  key={section.id} 
                  id={section.id} 
                  className="scroll-mt-24 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <h2 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors">
                    {t(`terms.${section.key}.title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t(`terms.${section.key}.body`)}
                  </p>
                </div>
              ))}

              {/* Contact Card */}
              <Card className="p-10 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">{t("terms.contact.title")}</h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("terms.contact.body")}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button asChild size="lg" className="min-w-[160px]">
                      <Link to={`/${currentLang}/contact`}>
                        {t("terms.contact.button")}
                      </Link>
                    </Button>
                    <a 
                      href={`mailto:${t("terms.contact.email")}`}
                      className="text-primary hover:underline font-medium text-lg transition-colors"
                    >
                      {t("terms.contact.email")}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Table of Contents - Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Card className="p-6 bg-secondary/30 border-border/50">
                  <nav aria-label="Terms of Service navigation" className="space-y-1">
                    <p className="font-bold mb-6 text-sm text-foreground uppercase tracking-wider">
                      {t("terms.toc")}
                    </p>
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block py-2.5 px-4 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary"
                      >
                        {t(`terms.${section.key}.title`)}
                      </a>
                    ))}
                  </nav>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
