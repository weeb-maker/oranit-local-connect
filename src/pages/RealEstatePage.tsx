import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/shared/HeroBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, Search, Plus, Share2, BedDouble, Bath, Maximize, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-realestate.jpg";
import { getSampleListings, formatPrice } from "@/data/realEstateListings";

const RealEstatePage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "he";

  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const listings = getSampleListings(currentLang);

  const listingTypes = [
    { value: "all", label: t("realEstate.filters.types.all") },
    { value: "sale", label: t("realEstate.filters.types.sale") },
    { value: "rent", label: t("realEstate.filters.types.rent") },
  ];

  const propertyTypes = [
    { value: "all", label: t("realEstate.filters.propertyTypes.all") },
    { value: "villa", label: t("realEstate.filters.propertyTypes.villa") },
    { value: "cottage", label: t("realEstate.filters.propertyTypes.cottage") },
    { value: "apartment", label: t("realEstate.filters.propertyTypes.apartment") },
    { value: "penthouse", label: t("realEstate.filters.propertyTypes.penthouse") },
    { value: "land", label: t("realEstate.filters.propertyTypes.land") },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesType = selectedType === "all" || listing.type === selectedType;
    const matchesProperty = selectedPropertyType === "all" || listing.propertyType === selectedPropertyType;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesProperty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <HeroBanner
        imageUrl={heroImage}
        title={t("realEstate.hero.title")}
        subtitle={t("realEstate.hero.subtitle")}
        minHeight="md"
        align="left"
      >
        <Button
          size="lg"
          className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t("realEstate.hero.addButton")}
        </Button>
      </HeroBanner>

      <section className="container mx-auto px-4 -mt-10 relative z-10 mb-12">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("realEstate.filters.typeLabel")}
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {listingTypes.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>{filter.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("realEstate.filters.propertyLabel")}
                </label>
                <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("realEstate.filters.searchLabel")}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("realEstate.filters.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 pb-20">
        {filteredListings.length === 0 ? (
          <Card className="p-12 text-center">
            <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">{t("realEstate.noResults.title")}</h3>
            <p className="text-muted-foreground mb-6">{t("realEstate.noResults.description")}</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                to={`/${currentLang}/real-estate/${listing.id}`}
                className="block group"
              >
                <Card className="overflow-hidden hover-lift h-full">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                      loading="lazy"
                    />
                    <Badge
                      className="absolute top-3 left-3"
                      variant={listing.type === "rent" ? "secondary" : "default"}
                    >
                      {listing.type === "rent" ? t("realEstate.badge.rent") : t("realEstate.badge.sale")}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg line-clamp-1 mb-2">{listing.title}</h3>
                    <p className="text-2xl font-bold text-primary mb-3">
                      {formatPrice(listing.price, listing.type, currentLang)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      {listing.rooms > 0 && (
                        <span className="flex items-center gap-1">
                          <BedDouble className="h-4 w-4" /> {listing.rooms}
                        </span>
                      )}
                      {listing.bathrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" /> {listing.bathrooms}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Maximize className="h-4 w-4" /> {listing.size} {t("realEstate.sqm")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" /> {listing.neighborhood}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-primary-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            {t("realEstate.footerCta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("realEstate.footerCta.description")}
          </p>
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            {t("realEstate.footerCta.button")}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstatePage;
