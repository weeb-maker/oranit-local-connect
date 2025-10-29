import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Store, Languages } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const currentLang = lang || 'he';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'he' : 'en';
    navigate(`/${newLang}`);
  };

  const categories = [
    { key: "shops", title: t("nav.shops"), desc: t("categories.shops.description") },
    { key: "food", title: t("nav.food"), desc: t("categories.food.description") },
    { key: "professional", title: t("nav.professional"), desc: t("categories.professional.description") },
    { key: "home", title: t("nav.home"), desc: t("categories.home.description") },
    { key: "wellness", title: t("nav.wellness"), desc: t("categories.wellness.description") },
    { key: "mobility", title: t("nav.mobility"), desc: t("categories.mobility.description") },
    { key: "youth", title: t("nav.youth"), desc: t("categories.youth.description") },
    { key: "other", title: t("nav.other"), desc: t("categories.other.description") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={`/${currentLang}`} className="flex items-center gap-2 font-bold text-xl text-primary transition-smooth hover:opacity-80">
          <Store className="h-6 w-6" />
          Oranit.biz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={`/${currentLang}`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.home")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("nav.businesses")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover">
                    {categories.map((item) => (
                      <li key={item.key}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/${currentLang}/directory/${item.key}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to={`/${currentLang}/events`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.whatsOn")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to={`/${currentLang}/residents`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.residents")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to={`/${currentLang}/marketplace`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.marketplace")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to={`/${currentLang}/for-businesses`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.forBusinesses")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Buttons & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="transition-smooth"
            title={currentLang === 'en' ? 'עברית' : 'English'}
          >
            <Languages className="h-5 w-5" />
          </Button>
          <Button variant="ghost" asChild>
            <Link to={`/${currentLang}/signin`}>{t("nav.signIn")}</Link>
          </Button>
          <Button asChild>
            <Link to={`/${currentLang}/add-business`}>{t("nav.addBusiness")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent transition-smooth"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link to={`/${currentLang}`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.home")}
            </Link>
            <Link to={`/${currentLang}/directory`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.businesses")}
            </Link>
            <Link to={`/${currentLang}/events`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.whatsOn")}
            </Link>
            <Link to={`/${currentLang}/residents`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.residents")}
            </Link>
            <Link to={`/${currentLang}/marketplace`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.marketplace")}
            </Link>
            <Link to={`/${currentLang}/for-businesses`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.forBusinesses")}
            </Link>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="w-full"
              >
                <Languages className="h-4 w-4 mr-2" />
                {currentLang === 'en' ? 'עברית' : 'English'}
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link to={`/${currentLang}/signin`}>{t("nav.signIn")}</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to={`/${currentLang}/add-business`}>{t("nav.addBusiness")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
