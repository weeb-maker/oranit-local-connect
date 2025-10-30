import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Store, Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';

  return (
    <footer className="bg-card border-t border-border py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href={`/${currentLang}`} className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Store className="h-6 w-6" />
              Oranit.biz
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.brandDescription")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth flex items-center justify-center"
              >
                <Facebook className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth flex items-center justify-center"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="mailto:hello@oranit.biz"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-hover transition-smooth flex items-center justify-center"
              >
                <Mail className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <a href={`/${currentLang}/directory`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.directory")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/events`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.events")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/marketplace`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.marketplace")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/about`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.about")}
                </a>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.forBusinesses")}</h3>
            <ul className="space-y-2">
              <li>
                <a href={`/${currentLang}/add-business`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.addBusiness")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/for-businesses`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.pricing")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/success-stories`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.successStories")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/business-resources`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.resources")}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2">
              <li>
                <a href={`/${currentLang}/help`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.helpCenter")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/contact`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.contact")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/privacy`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href={`/${currentLang}/terms`} className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p className="text-sm font-medium text-primary">
            {t("footer.tagline")} 🌱
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
