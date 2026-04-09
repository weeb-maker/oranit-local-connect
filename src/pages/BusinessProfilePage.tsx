import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  CheckCircle2,
  Share2,
  Clock,
  MessageCircle,
  Heart,
} from "lucide-react";

const mockBusiness = {
  id: "1",
  name: "Cafe Oranit",
  category: "Food & Drink",
  subcategory: "Cafe",
  description:
    "Welcome to Cafe Oranit, your neighborhood's favorite spot for exceptional coffee and fresh pastries. We pride ourselves on creating a warm, welcoming atmosphere where friends and family can gather. Our baristas are passionate about crafting the perfect cup, using locally sourced beans and organic ingredients. Whether you're looking for a quick morning espresso or a leisurely afternoon with friends, we're here to serve you with a smile.",
  logo: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=400&fit=crop",
  rating: 4.8,
  reviewCount: 127,
  verified: true,
  location: "15 Main Street, Oranit",
  phone: "+972-50-123-4567",
  email: "hello@cafeoranit.com",
  website: "https://cafeoranit.com",
  whatsapp: "+972501234567",
  hours: [
    { day: "Sunday - Thursday", time: "7:00 AM - 8:00 PM" },
    { day: "Friday", time: "7:00 AM - 4:00 PM" },
    { day: "Saturday", time: "Closed" },
  ],
  images: [
    "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
  ],
};

const relatedBusinesses = [
  {
    id: "2",
    name: "Pizza Paradise",
    category: "Food & Drink",
    description: "Authentic Italian pizza with fresh ingredients",
    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop",
    rating: 4.7,
    verified: true,
    location: "Center, Oranit",
  },
  {
    id: "3",
    name: "Sushi Corner",
    category: "Food & Drink",
    description: "Fresh sushi and Japanese cuisine",
    logo: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop",
    rating: 4.9,
    verified: false,
    location: "North Oranit",
  },
];

const BusinessProfilePage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockBusiness.name,
        text: mockBusiness.description,
        url: window.location.href,
      });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm reaching out about ${mockBusiness.name}`);
    window.open(`https://wa.me/${mockBusiness.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${lang}`}>{t("nav.home")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${lang}/explore`}>
                  {t("nav.businesses")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${lang}/category/${mockBusiness.category.toLowerCase()}`}>
                  {mockBusiness.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{mockBusiness.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Image Gallery — matches Real Estate pattern */}
        <div className="mb-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-3">
            <img
              src={mockBusiness.images[activeImage]}
              alt={mockBusiness.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="secondary" size="icon" className="shadow-lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleShare} className="shadow-lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {mockBusiness.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockBusiness.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeImage
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Identity */}
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 border">
                  <img
                    src={mockBusiness.logo}
                    alt={mockBusiness.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl md:text-4xl font-bold">{mockBusiness.name}</h1>
                    {mockBusiness.verified && (
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{mockBusiness.category}</Badge>
                    <Badge variant="secondary">{mockBusiness.subcategory}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{mockBusiness.rating}</span>
                </div>
                <span>({mockBusiness.reviewCount} {t("business.reviews")})</span>
                <span className="mx-2">·</span>
                <MapPin className="h-4 w-4" />
                <span>{mockBusiness.location}</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("business.about")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {mockBusiness.description}
                </p>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t("business.hours")}
                </h2>
                <div className="space-y-2">
                  {mockBusiness.hours.map((h, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("business.reviews")}</h2>
                <p className="text-muted-foreground">
                  {t("business.reviewsComingSoon")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card — matches Marketplace/Real Estate sidebar */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">{t("business.contact")}</h2>

                {mockBusiness.whatsapp && (
                  <Button className="w-full gap-2" size="lg" onClick={handleWhatsApp}>
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </Button>
                )}

                {mockBusiness.phone && (
                  <Button className="w-full gap-2" variant="outline" size="lg" asChild>
                    <a href={`tel:${mockBusiness.phone}`}>
                      <Phone className="h-5 w-5" />
                      {mockBusiness.phone}
                    </a>
                  </Button>
                )}

                {mockBusiness.email && (
                  <Button className="w-full gap-2" variant="outline" size="lg" asChild>
                    <a href={`mailto:${mockBusiness.email}`}>
                      <Mail className="h-5 w-5" />
                      {t("business.email")}
                    </a>
                  </Button>
                )}

                {mockBusiness.website && (
                  <Button className="w-full gap-2" variant="outline" size="lg" asChild>
                    <a href={mockBusiness.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-5 w-5" />
                      {t("business.website")}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("business.address")}</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">{mockBusiness.location}</p>
              </CardContent>
            </Card>

            {/* Similar Businesses */}
            {relatedBusinesses.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t("business.relatedBusinesses")}</h2>
                  <div className="space-y-4">
                    {relatedBusinesses.map((biz) => (
                      <Link
                        key={biz.id}
                        to={`/${lang}/business/${biz.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border">
                            <img
                              src={biz.logo}
                              alt={biz.name}
                              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1 group-hover:text-primary transition-smooth">
                              {biz.name}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{biz.description}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="text-xs font-medium">{biz.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Claim Business */}
            <Button variant="outline" className="w-full">
              {t("business.claimBusiness")}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessProfilePage;
