import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Share2,
  Calendar,
  Car,
  Building,
  CheckCircle2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSampleListings, formatPrice } from "@/data/realEstateListings";

const RealEstateDetailPage = () => {
  const { t } = useTranslation();
  const { lang, id } = useParams<{ lang: string; id: string }>();
  const currentLang = lang || "he";

  const listings = getSampleListings(currentLang);
  const listing = listings.find((l) => l.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("realEstate.detail.notFound")}</h1>
          <Link to={`/${currentLang}/real-estate`}>
            <Button>{t("realEstate.detail.backToListings")}</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const similarListings = listings
    .filter((l) => l.id !== listing.id && l.type === listing.type)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
      });
    }
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
                <BreadcrumbLink href={`/${currentLang}`}>
                  {t("common:nav.home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${currentLang}/real-estate`}>
                  {t("common:nav.realEstate")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{listing.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-3">
            <img
              src={listing.images[activeImage]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant={listing.type === "rent" ? "secondary" : "default"} className="text-sm px-3 py-1">
                {listing.type === "rent" ? t("realEstate.badge.rent") : t("realEstate.badge.sale")}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Button variant="secondary" size="icon" onClick={handleShare} className="shadow-lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {listing.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeImage ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-70 hover:opacity-100"
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
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.neighborhood}
              </div>
              <p className="text-3xl font-bold text-primary">
                {formatPrice(listing.price, listing.type, currentLang)}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {listing.rooms > 0 && (
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <BedDouble className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xl font-bold">{listing.rooms}</span>
                    <span className="text-xs text-muted-foreground">{t("realEstate.detail.rooms")}</span>
                  </CardContent>
                </Card>
              )}
              {listing.bathrooms > 0 && (
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Bath className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xl font-bold">{listing.bathrooms}</span>
                    <span className="text-xs text-muted-foreground">{t("realEstate.detail.bathrooms")}</span>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Maximize className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xl font-bold">{listing.size}</span>
                  <span className="text-xs text-muted-foreground">{t("realEstate.sqm")}</span>
                </CardContent>
              </Card>
              {listing.parking !== undefined && listing.parking > 0 && (
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Car className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xl font-bold">{listing.parking}</span>
                    <span className="text-xs text-muted-foreground">{t("realEstate.detail.parking")}</span>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("realEstate.detail.description")}</h2>
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            {listing.features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t("realEstate.detail.features")}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {listing.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("realEstate.detail.location")}</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mt-3">{listing.neighborhood}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Details Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">{t("realEstate.detail.propertyDetails")}</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("realEstate.detail.propertyType")}</span>
                    <span className="font-medium">
                      {t(`realEstate.filters.propertyTypes.${listing.propertyType}`)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("realEstate.detail.listingType")}</span>
                    <span className="font-medium">
                      {listing.type === "rent" ? t("realEstate.badge.rent") : t("realEstate.badge.sale")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("realEstate.detail.size")}</span>
                    <span className="font-medium">{listing.size} {t("realEstate.sqm")}</span>
                  </div>
                  {listing.floor !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("realEstate.detail.floor")}</span>
                      <span className="font-medium">
                        {listing.floor === 0
                          ? t("realEstate.detail.groundFloor")
                          : `${listing.floor}/${listing.totalFloors}`}
                      </span>
                    </div>
                  )}
                  {listing.yearBuilt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("realEstate.detail.yearBuilt")}</span>
                      <span className="font-medium">{listing.yearBuilt}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">{t("realEstate.detail.contactSeller")}</h2>
                <p className="text-sm text-muted-foreground">{listing.contactName}</p>
                <Button className="w-full" size="lg" asChild>
                  <a href={`tel:${listing.contactPhone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {listing.contactPhone}
                  </a>
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("realEstate.detail.share")}
                </Button>
              </CardContent>
            </Card>

            {/* Similar Listings */}
            {similarListings.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t("realEstate.detail.similarListings")}</h2>
                  <div className="space-y-4">
                    {similarListings.map((similar) => (
                      <Link
                        key={similar.id}
                        to={`/${currentLang}/real-estate/${similar.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={similar.image}
                              alt={similar.title}
                              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-2 group-hover:text-primary transition-smooth">
                              {similar.title}
                            </p>
                            <p className="text-sm font-bold text-primary mt-1">
                              {formatPrice(similar.price, similar.type, currentLang)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RealEstateDetailPage;
