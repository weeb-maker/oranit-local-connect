import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Tag, Calendar, ShieldCheck, Star } from "lucide-react";
import dealsEn from "@/data/fixtures/en/deals.json";
import dealsHe from "@/data/fixtures/he/deals.json";
import heroImage from "@/assets/hero-deals-new.jpg";
import pizzaDeal from "@/assets/deals/pizza-deal.jpg";
import coffeeDeal from "@/assets/deals/coffee-deal.jpg";
import fitnessDeal from "@/assets/deals/fitness-deal.jpg";
import techRepairDeal from "@/assets/deals/tech-repair-deal.jpg";
import loyaltyDeal from "@/assets/deals/loyalty-deal.jpg";
import salonDeal from "@/assets/deals/salon-deal.jpg";

interface Deal {
  id: string;
  slug: string;
  titleEn: string;
  titleHe: string;
  descriptionEn: string;
  descriptionHe: string;
  businessName: string;
  businessNameHe: string;
  category: string;
  categoryHe: string;
  discountType: "percent" | "amount" | "bogo" | "freebie";
  discountValue?: number;
  image: string;
  startsAt: string;
  endsAt: string;
  verified: boolean;
  featured: boolean;
}

// Map image paths to imports
const imageMap: Record<string, string> = {
  "/src/assets/deals/pizza-deal.jpg": pizzaDeal,
  "/src/assets/deals/coffee-deal.jpg": coffeeDeal,
  "/src/assets/deals/fitness-deal.jpg": fitnessDeal,
  "/src/assets/deals/tech-repair-deal.jpg": techRepairDeal,
  "/src/assets/deals/loyalty-deal.jpg": loyaltyDeal,
  "/src/assets/deals/salon-deal.jpg": salonDeal,
};

const DealsPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "he" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isRTL = lang === "he";
  
  const deals = (lang === "he" ? dealsHe : dealsEn) as Deal[];
  
  // Initialize from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedDiscountType, setSelectedDiscountType] = useState(searchParams.get("type") || "all");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "all");
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get("verified") === "true");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");

  // SEO Meta Tags
  useEffect(() => {
    document.title = t("deals.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("deals.seo.description"));
    }
  }, [t]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedDiscountType !== "all") params.set("type", selectedDiscountType);
    if (selectedStatus !== "all") params.set("status", selectedStatus);
    if (verifiedOnly) params.set("verified", "true");
    if (sortBy !== "featured") params.set("sort", sortBy);
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, selectedDiscountType, selectedStatus, verifiedOnly, sortBy, setSearchParams]);

  const categories = useMemo(() => {
    const cats = new Set(deals.map(d => isRTL ? d.categoryHe : d.category));
    return Array.from(cats);
  }, [deals, isRTL]);

  const isEndingSoon = (endsAt: string) => {
    const endDate = new Date(endsAt);
    const today = new Date();
    const diffInDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7 && diffInDays >= 0;
  };

  const isActive = (startsAt: string, endsAt: string) => {
    const today = new Date();
    const start = new Date(startsAt);
    const end = new Date(endsAt);
    return today >= start && today <= end;
  };

  const filteredDeals = useMemo(() => {
    let filtered = deals.filter(deal => {
      // Only show active deals
      if (!isActive(deal.startsAt, deal.endsAt)) return false;
      
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const title = isRTL ? deal.titleHe : deal.titleEn;
        const description = isRTL ? deal.descriptionHe : deal.descriptionEn;
        const business = isRTL ? deal.businessNameHe : deal.businessName;
        
        if (
          !title.toLowerCase().includes(searchLower) &&
          !description.toLowerCase().includes(searchLower) &&
          !business.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
      
      // Category filter
      if (selectedCategory !== "all") {
        const category = isRTL ? deal.categoryHe : deal.category;
        if (category !== selectedCategory) return false;
      }
      
      // Discount type filter
      if (selectedDiscountType !== "all" && deal.discountType !== selectedDiscountType) {
        return false;
      }
      
      // Status filter
      if (selectedStatus === "endsSoon" && !isEndingSoon(deal.endsAt)) {
        return false;
      }
      
      // Verified filter
      if (verifiedOnly && !deal.verified) return false;
      
      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime();
        case "endingSoon":
          return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
        case "discountHigh":
          const aDiscount = a.discountType === "percent" ? (a.discountValue || 0) : 0;
          const bDiscount = b.discountType === "percent" ? (b.discountValue || 0) : 0;
          return bDiscount - aDiscount;
        case "featured":
        default:
          // Featured first, then ending soon, then newest
          if (a.featured !== b.featured) return b.featured ? 1 : -1;
          const aEndsSoon = isEndingSoon(a.endsAt);
          const bEndsSoon = isEndingSoon(b.endsAt);
          if (aEndsSoon !== bEndsSoon) return aEndsSoon ? -1 : 1;
          return new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime();
      }
    });

    return filtered;
  }, [deals, searchQuery, selectedCategory, selectedDiscountType, selectedStatus, verifiedOnly, sortBy, isRTL]);

  const getDealBadge = (deal: Deal) => {
    switch (deal.discountType) {
      case "percent":
        return t("deals.badge.percent", { value: deal.discountValue });
      case "amount":
        return t("deals.badge.amount", { value: deal.discountValue });
      case "bogo":
        return t("deals.badge.bogo");
      case "freebie":
        return t("deals.badge.freebie");
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(lang, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Schema.org ItemList structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredDeals.map((deal, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Offer",
        "name": isRTL ? deal.titleHe : deal.titleEn,
        "description": isRTL ? deal.descriptionHe : deal.descriptionEn,
        "seller": {
          "@type": "LocalBusiness",
          "name": isRTL ? deal.businessNameHe : deal.businessName
        },
        "validFrom": deal.startsAt,
        "priceValidUntil": deal.endsAt,
        "url": `${window.location.origin}/${lang}/deals/${deal.slug}`
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle" dir={isRTL ? "rtl" : "ltr"}>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt={t("deals.title")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-background max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t("deals.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-background/90 max-w-2xl">
              {t("deals.subtitle")}
            </p>
            <Button size="lg" variant="secondary" className="shadow-lg">
              {t("deals.submit")}
            </Button>
          </div>
        </section>

        {/* Filters Section */}
        <section className="sticky top-16 z-10 bg-card border-b shadow-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} h-4 w-4 text-muted-foreground`} />
                <Input
                  type="search"
                  placeholder={t("deals.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={isRTL ? "pr-10" : "pl-10"}
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder={t("deals.filters.category")} />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="all">{t("deals.filters.all")}</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Discount Type Filter */}
              <Select value={selectedDiscountType} onValueChange={setSelectedDiscountType}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder={t("deals.filters.discountType")} />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="all">{t("deals.discountTypes.all")}</SelectItem>
                  <SelectItem value="percent">{t("deals.discountTypes.percent")}</SelectItem>
                  <SelectItem value="amount">{t("deals.discountTypes.amount")}</SelectItem>
                  <SelectItem value="bogo">{t("deals.discountTypes.bogo")}</SelectItem>
                  <SelectItem value="freebie">{t("deals.discountTypes.freebie")}</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder={t("deals.sort.label")} />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="featured">{t("deals.sort.featured")}</SelectItem>
                  <SelectItem value="newest">{t("deals.sort.newest")}</SelectItem>
                  <SelectItem value="endingSoon">{t("deals.sort.endingSoon")}</SelectItem>
                  <SelectItem value="discountHigh">{t("deals.sort.discountHigh")}</SelectItem>
                </SelectContent>
              </Select>

              {/* Verified Toggle */}
              <Button
                variant={verifiedOnly ? "default" : "outline"}
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className="whitespace-nowrap"
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                {t("deals.filters.verified")}
              </Button>
            </div>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="container mx-auto px-4 py-12">
          {filteredDeals.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">{t("deals.empty")}</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map(deal => {
                const dealImage = imageMap[deal.image] || deal.image;
                return (
                  <Link key={deal.id} to={`/${lang}/deals/${deal.slug}`}>
                    <Card className="h-full hover:shadow-hover transition-shadow cursor-pointer">
                      <CardHeader className="p-0">
                        <div className="relative aspect-video">
                          <img
                            src={dealImage}
                            alt={isRTL ? deal.titleHe : deal.titleEn}
                            className="w-full h-full object-cover rounded-t-lg"
                            loading="lazy"
                          />
                          <div className="absolute top-3 right-3 flex flex-wrap gap-2">
                            {deal.featured && (
                              <Badge variant="default" className="bg-accent text-accent-foreground">
                                <Star className="h-3 w-3 mr-1" />
                                {t("deals.badge.featured")}
                              </Badge>
                            )}
                            {isEndingSoon(deal.endsAt) && (
                              <Badge variant="destructive">
                                <Calendar className="h-3 w-3 mr-1" />
                                {t("deals.badge.endsSoon")}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <Badge variant="secondary" className="text-lg font-bold">
                            {getDealBadge(deal)}
                          </Badge>
                          {deal.verified && (
                            <Badge variant="outline" className="gap-1">
                              <ShieldCheck className="h-3 w-3" />
                              {t("deals.badge.verified")}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="mb-2 line-clamp-2">
                          {isRTL ? deal.titleHe : deal.titleEn}
                        </CardTitle>
                        <CardDescription className="mb-3 line-clamp-1">
                          {isRTL ? deal.businessNameHe : deal.businessName}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {isRTL ? deal.descriptionHe : deal.descriptionEn}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{t("deals.validUntil", { date: formatDate(deal.endsAt) })}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline">
                          {t("deals.viewDetails")}
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DealsPage;
