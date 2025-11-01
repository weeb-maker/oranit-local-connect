import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Share2,
  Star,
  Tag
} from "lucide-react";
import dealsEn from "@/data/fixtures/en/deals.json";
import dealsHe from "@/data/fixtures/he/deals.json";
import { toast } from "@/hooks/use-toast";
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
  businessId: string;
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
  phone?: string;
  whatsapp?: string;
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

const DealDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "he", slug } = useParams();
  const navigate = useNavigate();
  const isRTL = lang === "he";
  
  const deals = (lang === "he" ? dealsHe : dealsEn) as Deal[];
  const deal = deals.find(d => d.slug === slug);

  // SEO Meta Tags
  useEffect(() => {
    if (deal) {
      const title = isRTL ? deal.titleHe : deal.titleEn;
      const business = isRTL ? deal.businessNameHe : deal.businessName;
      document.title = `${title} - ${business} | ${t("deals.seo.title")}`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const description = isRTL ? deal.descriptionHe : deal.descriptionEn;
        metaDescription.setAttribute("content", description);
      }
    }
  }, [deal, t, isRTL]);

  if (!deal) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-subtle" dir={isRTL ? "rtl" : "ltr"}>
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Tag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-4">Deal not found</h2>
            <Button onClick={() => navigate(`/${lang}/deals`)}>
              {t("deals.filters.all")}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isEndingSoon = (endsAt: string) => {
    const endDate = new Date(endsAt);
    const today = new Date();
    const diffInDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7 && diffInDays >= 0;
  };

  const getDealBadge = () => {
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
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: isRTL ? deal.titleHe : deal.titleEn,
        text: isRTL ? deal.descriptionHe : deal.descriptionEn,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: isRTL ? "הקישור הועתק" : "Link copied",
        description: isRTL ? "הקישור הועתק ללוח" : "Link copied to clipboard"
      });
    }
  };

  const relatedDeals = deals
    .filter(d => 
      d.id !== deal.id && 
      (d.category === deal.category || d.categoryHe === deal.categoryHe)
    )
    .slice(0, 3);

  const dealImage = imageMap[deal.image] || deal.image;

  // Schema.org Offer structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": isRTL ? deal.titleHe : deal.titleEn,
    "description": isRTL ? deal.descriptionHe : deal.descriptionEn,
    "image": `${window.location.origin}${dealImage}`,
    "url": window.location.href,
    "seller": {
      "@type": "LocalBusiness",
      "name": isRTL ? deal.businessNameHe : deal.businessName,
      "telephone": deal.phone
    },
    "validFrom": deal.startsAt,
    "priceValidUntil": deal.endsAt,
    "availability": "https://schema.org/InStock",
    "category": isRTL ? deal.categoryHe : deal.category
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
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/${lang}/deals`)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("deals.filters.all")}
          </Button>
        </div>

        {/* Hero Image */}
        <section className="container mx-auto px-4 mb-8">
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden shadow-card">
            <img
              src={dealImage}
              alt={isRTL ? deal.titleHe : deal.titleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex flex-wrap gap-2">
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
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Deal Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Badge variant="secondary" className="text-2xl font-bold py-2 px-4">
                    {getDealBadge()}
                  </Badge>
                  {deal.verified && (
                    <Badge variant="outline" className="gap-1">
                      <ShieldCheck className="h-4 w-4" />
                      {t("deals.badge.verified")}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {isRTL ? deal.titleHe : deal.titleEn}
                </h1>
                
                <Link 
                  to={`/${lang}/business/${deal.businessId}`}
                  className="text-lg text-primary hover:underline inline-flex items-center gap-2"
                >
                  {isRTL ? deal.businessNameHe : deal.businessName}
                  <MapPin className="h-4 w-4" />
                </Link>
              </div>

              <Separator />

              {/* Validity */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        {t("deals.validity", { 
                          start: formatDate(deal.startsAt), 
                          end: formatDate(deal.endsAt) 
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  {t("deals.viewDetails")}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {isRTL ? deal.descriptionHe : deal.descriptionEn}
                </p>
              </div>

              {/* Redemption Instructions */}
              <Card className="bg-accent/10">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {t("deals.redemption")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? "הציגו את המסך הזה בקופה או הזכירו את המבצע בעת הזמנה."
                      : "Show this screen at checkout or mention this deal when ordering."
                    }
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-4">
              {/* Contact Card */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <h3 className="font-semibold mb-4">{t("deals.contact")}</h3>
                  
                  {deal.whatsapp && (
                    <Button 
                      variant="default" 
                      className="w-full justify-start gap-3"
                      onClick={() => window.open(`https://wa.me/${deal.whatsapp}`, '_blank')}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  )}
                  
                  {deal.phone && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3"
                      onClick={() => window.open(`tel:${deal.phone}`, '_blank')}
                    >
                      <Phone className="h-4 w-4" />
                      {deal.phone}
                    </Button>
                  )}
                  
                  <Link to={`/${lang}/business/${deal.businessId}`}>
                    <Button variant="outline" className="w-full justify-start gap-3">
                      <MapPin className="h-4 w-4" />
                      {isRTL ? "צפו בעמוד העסק" : "View Business"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Share Button */}
              <Button 
                variant="secondary" 
                className="w-full gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                {t("deals.share")}
              </Button>

              {/* Category Badge */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("deals.filters.category")}
                  </div>
                  <Badge variant="outline">
                    {isRTL ? deal.categoryHe : deal.category}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Deals */}
          {relatedDeals.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">{t("deals.relatedDeals")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedDeals.map(relatedDeal => {
                  const relatedImage = imageMap[relatedDeal.image] || relatedDeal.image;
                  return (
                    <Link key={relatedDeal.id} to={`/${lang}/deals/${relatedDeal.slug}`}>
                      <Card className="h-full hover:shadow-hover transition-shadow cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                            <img
                              src={relatedImage}
                              alt={isRTL ? relatedDeal.titleHe : relatedDeal.titleEn}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <Badge variant="secondary" className="mb-2">
                            {relatedDeal.discountType === "percent" 
                              ? t("deals.badge.percent", { value: relatedDeal.discountValue })
                              : relatedDeal.discountType === "amount"
                              ? t("deals.badge.amount", { value: relatedDeal.discountValue })
                              : t(`deals.badge.${relatedDeal.discountType}`)
                            }
                          </Badge>
                          <h3 className="font-semibold line-clamp-2 mb-2">
                            {isRTL ? relatedDeal.titleHe : relatedDeal.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? relatedDeal.businessNameHe : relatedDeal.businessName}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DealDetailPage;
