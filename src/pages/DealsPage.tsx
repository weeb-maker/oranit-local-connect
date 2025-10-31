import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
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

const DealsPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "he" } = useParams();
  const isRTL = lang === "he";
  
  const deals = (lang === "he" ? dealsHe : dealsEn) as Deal[];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiscountType, setSelectedDiscountType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

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
    return deals.filter(deal => {
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
    }).sort((a, b) => {
      // Sort: Featured first, then ending soon, then newest
      if (a.featured !== b.featured) return b.featured ? 1 : -1;
      const aEndsSoon = isEndingSoon(a.endsAt);
      const bEndsSoon = isEndingSoon(b.endsAt);
      if (aEndsSoon !== bEndsSoon) return aEndsSoon ? -1 : 1;
      return new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime();
    });
  }, [deals, searchQuery, selectedCategory, selectedDiscountType, selectedStatus, verifiedOnly, isRTL]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t("deals.title")}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                {t("deals.subtitle")}
              </p>
              <Button size="lg" variant="secondary">
                {t("deals.submit")}
              </Button>
            </div>
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
                <SelectContent>
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
                <SelectContent>
                  <SelectItem value="all">{t("deals.discountTypes.all")}</SelectItem>
                  <SelectItem value="percent">{t("deals.discountTypes.percent")}</SelectItem>
                  <SelectItem value="amount">{t("deals.discountTypes.amount")}</SelectItem>
                  <SelectItem value="bogo">{t("deals.discountTypes.bogo")}</SelectItem>
                  <SelectItem value="freebie">{t("deals.discountTypes.freebie")}</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder={t("deals.filters.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("deals.status.all")}</SelectItem>
                  <SelectItem value="endsSoon">{t("deals.status.endsSoon")}</SelectItem>
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
              {filteredDeals.map(deal => (
                <Link key={deal.id} to={`/${lang}/deals/${deal.slug}`}>
                  <Card className="h-full hover:shadow-hover transition-shadow cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative aspect-video">
                        <img
                          src={deal.image}
                          alt={isRTL ? deal.titleHe : deal.titleEn}
                          className="w-full h-full object-cover rounded-t-lg"
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
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DealsPage;
