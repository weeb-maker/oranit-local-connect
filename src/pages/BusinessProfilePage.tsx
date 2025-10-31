import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Navigation as NavigationIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  hours: "Sun-Thu: 7:00 AM - 8:00 PM, Fri: 7:00 AM - 4:00 PM, Sat: Closed",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-4">
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
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-smooth-lg flex-shrink-0">
                <img
                  src={mockBusiness.logo}
                  alt={mockBusiness.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {mockBusiness.name}
                  </h1>
                  {mockBusiness.verified && (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {mockBusiness.category}
                  </Badge>
                  <Badge variant="outline" className="text-sm border-white text-white">
                    {mockBusiness.subcategory}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-white mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{mockBusiness.rating}</span>
                  </div>
                  <span className="opacity-75">({mockBusiness.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg">
                    <Phone className="w-4 h-4" />
                    {t("business.call")}
                  </Button>
                  <Button variant="hero" size="lg">
                    <Globe className="w-4 h-4" />
                    {t("business.website")}
                  </Button>
                  <Button variant="hero" size="lg">
                    <NavigationIcon className="w-4 h-4" />
                    {t("business.directions")}
                  </Button>
                  <Button variant="hero" size="lg">
                    <Share2 className="w-4 h-4" />
                    {t("business.share")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("business.about")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockBusiness.description}
                  </p>
                </CardContent>
              </Card>

              {/* Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("business.gallery")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockBusiness.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={image}
                          alt={`${mockBusiness.name} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-smooth"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("business.reviews")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t("business.reviewsComingSoon")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("business.contact")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">{t("business.address")}</p>
                      <p className="text-sm text-muted-foreground">
                        {mockBusiness.location}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium mb-1">{t("business.phone")}</p>
                      <a
                        href={`tel:${mockBusiness.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {mockBusiness.phone}
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium mb-1">{t("business.email")}</p>
                      <a
                        href={`mailto:${mockBusiness.email}`}
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {mockBusiness.email}
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium mb-1">{t("business.website")}</p>
                      <a
                        href={mockBusiness.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {mockBusiness.website}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t("business.hours")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{mockBusiness.hours}</p>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              {/* Claim Business */}
              <Button variant="outline" className="w-full">
                {t("business.claimBusiness")}
              </Button>
            </div>
          </div>
        </section>

        {/* Related Businesses */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t("business.relatedBusinesses")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBusinesses.map((business) => (
                <BusinessCard key={business.id} {...business} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessProfilePage;
