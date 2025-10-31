import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  ArrowLeft,
  MapPin,
  Clock,
  MessageCircle,
  Phone,
  Share2,
  Heart,
  AlertCircle
} from "lucide-react";

const MarketplaceDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample listing data
  const listing: {
    id: string;
    title: string;
    category: string;
    priceType: "paid" | "free";
    price?: number;
    condition: string;
    description: string;
    images: string[];
    neighborhood: string;
    createdAt: string;
    contact: {
      whatsapp?: string;
      phone?: string;
      allowMessages?: boolean;
    };
  } = {
    id: "1",
    title: "IKEA Sofa - Great Condition",
    category: "Furniture",
    priceType: "paid",
    price: 800,
    condition: "good",
    description: "Beautiful 3-seater sofa in excellent condition. Only 2 years old, no stains or damages. Perfect for a living room or office space. Must pick up from Oranit Center.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    neighborhood: "Center",
    createdAt: "2024-01-15T10:00:00Z",
    contact: {
      whatsapp: "+972501234567",
      phone: "+972501234567",
      allowMessages: true
    }
  };

  const relatedListings: Array<{
    id: string;
    title: string;
    priceType: "paid" | "free";
    price?: number;
    image: string;
  }> = [
    {
      id: "2",
      title: "Dining Table Set",
      priceType: "paid",
      price: 600,
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Office Chair",
      priceType: "free",
      image: "/placeholder.svg"
    }
  ];

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in: ${listing.title}`);
    window.open(`https://wa.me/${listing.contact.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate(`/${i18n.language}/marketplace`)}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("marketplace.detail.backToMarketplace")}
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="pt-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {listing.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video overflow-hidden rounded-lg">
                          <img 
                            src={image}
                            alt={`${listing.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{listing.category}</Badge>
                      <Badge variant="secondary">{t(`marketplace.conditions.${listing.condition}`)}</Badge>
                      {listing.priceType === "free" && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          {t("marketplace.badge.free")}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-3xl">{listing.title}</CardTitle>
                    {listing.priceType === "paid" ? (
                      <p className="text-3xl font-bold text-primary">₪{listing.price}</p>
                    ) : (
                      <p className="text-2xl font-semibold text-green-600">{t("marketplace.badge.free")}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("marketplace.detail.description")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                </div>

                <div className="flex gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.neighborhood}, Oranit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{getTimeAgo(listing.createdAt)}</span>
                  </div>
                </div>

                <Card className="bg-accent/30 border-accent">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        {t("marketplace.safetyNote")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>{t("marketplace.detail.contactSeller")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {listing.contact.whatsapp && (
                  <Button className="w-full gap-2" size="lg" onClick={handleWhatsApp}>
                    <MessageCircle className="h-5 w-5" />
                    {t("marketplace.detail.whatsapp")}
                  </Button>
                )}
                {listing.contact.phone && (
                  <Button className="w-full gap-2" variant="outline" size="lg" asChild>
                    <a href={`tel:${listing.contact.phone}`}>
                      <Phone className="h-5 w-5" />
                      {t("marketplace.detail.call")}
                    </a>
                  </Button>
                )}
                {listing.contact.allowMessages && (
                  <Button className="w-full gap-2" variant="outline" size="lg">
                    <MessageCircle className="h-5 w-5" />
                    {t("marketplace.detail.message")}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>{t("marketplace.detail.location")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{listing.neighborhood}, Oranit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Listings */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{t("marketplace.detail.similarListings")}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedListings.map((item) => (
              <Card 
                key={item.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/${i18n.language}/marketplace/${item.id}`)}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.priceType === "free" && (
                    <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                      {t("marketplace.badge.free")}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  {item.priceType === "paid" ? (
                    <p className="text-xl font-bold text-primary">₪{item.price}</p>
                  ) : (
                    <p className="text-lg font-semibold text-green-600">{t("marketplace.badge.free")}</p>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default MarketplaceDetailPage;
