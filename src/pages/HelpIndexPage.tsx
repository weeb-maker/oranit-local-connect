import { useTranslation } from "react-i18next";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  User, 
  Briefcase, 
  Tag, 
  MapPin, 
  Settings, 
  Shield,
  MessageCircle,
  Clock
} from "lucide-react";
import { loadCatalog, searchArticles, filterByCategory, getCategoryCounts, type CatalogItem } from "@/lib/helpContent";

const HelpIndexPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLang = (lang || "he") as "en" | "he";

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = t("help.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("help.seo.description"));
    }

    // Add canonical and hreflang
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://oranit.biz/${currentLang}/help`);

    // Add schema.org FAQPage markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": t("help.seo.title"),
      "description": t("help.seo.description"),
      "mainEntity": []
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [t, currentLang]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadCatalog(currentLang);
      setCatalog(data);
      setIsLoading(false);
    };
    loadData();
  }, [currentLang]);

  const filteredArticles = useMemo(() => {
    let results = catalog;
    
    if (selectedCategory) {
      results = filterByCategory(results, selectedCategory);
    }
    
    if (searchQuery) {
      results = searchArticles(results, searchQuery);
    }
    
    return results;
  }, [catalog, searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => getCategoryCounts(catalog), [catalog]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(searchParams);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const popularSearches = t("help.hero.popularSearches", { returnObjects: true }) as string[];

  const categories = [
    { key: "account", icon: User, color: "bg-blue-500/10 text-blue-600" },
    { key: "business", icon: Briefcase, color: "bg-green-500/10 text-green-600" },
    { key: "deals", icon: Tag, color: "bg-orange-500/10 text-orange-600" },
    { key: "directory", icon: MapPin, color: "bg-purple-500/10 text-purple-600" },
    { key: "technical", icon: Settings, color: "bg-gray-500/10 text-gray-600" },
    { key: "privacy", icon: Shield, color: "bg-red-500/10 text-red-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Search Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("help.hero.title")}</h1>
            <p className="text-xl text-muted-foreground mb-8">{t("help.hero.subtitle")}</p>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("help.hero.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-muted-foreground">{t("help.hero.popular")}:</span>
              {popularSearches.map((search) => (
                <Badge
                  key={search}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("help.categories.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map(({ key, icon: Icon, color }) => (
              <Card
                key={key}
                className={`cursor-pointer transition-all hover:shadow-hover ${
                  selectedCategory === key ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleCategoryClick(key)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{t(`help.categories.${key}`)}</CardTitle>
                      <CardDescription>{categoryCounts[key] || 0} articles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List / Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {filteredArticles.length > 0
                    ? t("help.search.results", { count: filteredArticles.length })
                    : t("help.search.noResults")}
                </p>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory
                ? t(`help.categories.${selectedCategory}`)
                : t("help.popular.title")}
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t("help.empty.title")}</h3>
                  <p className="text-muted-foreground mb-6">{t("help.empty.body")}</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                      setSearchParams(new URLSearchParams());
                    }}
                  >
                    {t("help.empty.browseCategories")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/${currentLang}/help/${article.slug}`}
                  >
                    <Card className="hover:shadow-hover transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                            <CardDescription className="text-base">{article.excerpt}</CardDescription>
                          </div>
                          <Badge variant="secondary">{t(`help.categories.${article.category}`)}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(article.updatedAt).toLocaleDateString(currentLang === "he" ? "he-IL" : "en-US")}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("help.cta.title")}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to={`/${currentLang}/contact`}>{t("help.cta.button")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/972540000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("help.cta.whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpIndexPage;