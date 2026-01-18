import { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Store, Languages } from "lucide-react";
import { switchLocalePath } from "@/lib/slugMap";
import { useCategories } from "@/hooks/useCategories";
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
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = lang || 'he';
  const isRtl = currentLang === 'he';

  // Fetch categories from database
  const { data: categories = [], isLoading: categoriesLoading } = useCategories(currentLang);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'he' : 'en';
    const currentFullPath = `${location.pathname}${location.search}${location.hash}`;
    const newPath = switchLocalePath(currentFullPath, currentLang, newLang);
    navigate(newPath, { replace: false });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" style={{ height: 'var(--header-height)' }}>
      <nav className="container mx-auto flex items-center justify-between px-4 h-full" dir={isRtl ? "rtl" : "ltr"}>
        {/* Logo */}
        <Link
          to={`/${currentLang}`}
          className="flex items-center gap-2 font-bold text-xl text-primary transition-smooth hover:opacity-80"
        >
          <Store className="h-6 w-6" />
          Oranit.biz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center px-6">
          <NavigationMenu>
            <NavigationMenuList className={isRtl ? "flex-row-reverse" : "flex-row"}>
              <NavigationMenuItem>
                <Link to={`/${currentLang}`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.home")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to={`/${currentLang}/explore`}>
                  <NavigationMenuTrigger>{t("nav.businesses")}</NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover">
                    {categoriesLoading ? (
                      <li className="col-span-2 text-center text-muted-foreground py-4">
                        {t("common.loading", "Loading...")}
                      </li>
                    ) : (
                      categories.map((item) => (
                        <li key={item.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/${currentLang}/category/${item.slug}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                              {item.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to={`/${currentLang}/marketplace`}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("nav.marketplace")}
                  </NavigationMenuLink>
                </Link>
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
        <div className={`hidden lg:flex items-center gap-3 ${isRtl ? "" : ""}`}>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="transition-smooth"
            title={currentLang === "en" ? "עברית" : "English"}
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

        {/* Mobile Language Switcher & Menu Button */}
        <div className={`lg:hidden flex items-center gap-2 ${isRtl ? "" : ""}`}>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="transition-smooth"
            title={currentLang === "en" ? "עברית" : "English"}
          >
            <Languages className="h-5 w-5" />
          </Button>
          <button
            className="p-2 rounded-md hover:bg-accent transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link to={`/${currentLang}`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.home")}
            </Link>
            <Link to={`/${currentLang}/explore`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.businesses")}
            </Link>
            <Link to={`/${currentLang}/marketplace`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.marketplace")}
            </Link>
            <Link to={`/${currentLang}/events`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.whatsOn")}
            </Link>
            <Link to={`/${currentLang}/residents`} className="px-4 py-2 rounded-md hover:bg-accent transition-smooth">
              {t("nav.residents")}
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
                <Languages className="h-4 w-4 me-2" />
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