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

const getSampleListings = (lang: string) => {
  if (lang === "he") {
    return [
      {
        id: "1",
        title: "וילה מרווחת עם גינה",
        type: "sale",
        propertyType: "villa",
        price: 3200000,
        rooms: 6,
        bathrooms: 3,
        size: 220,
        neighborhood: "אורנית מזרח",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
        description: "וילה מהממת עם גינה גדולה, 6 חדרים, מטבח מרווח ונוף פתוח."
      },
      {
        id: "2",
        title: "דירת 4 חדרים להשכרה",
        type: "rent",
        propertyType: "apartment",
        price: 5500,
        rooms: 4,
        bathrooms: 2,
        size: 110,
        neighborhood: "אורנית מרכז",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
        description: "דירה מוארת ומרווחת במיקום מרכזי, קרובה לבתי ספר ומרכז מסחרי."
      },
      {
        id: "3",
        title: "קוטג׳ דו-משפחתי",
        type: "sale",
        propertyType: "cottage",
        price: 2600000,
        rooms: 5,
        bathrooms: 2,
        size: 180,
        neighborhood: "אורנית צפון",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
        description: "קוטג׳ דו-משפחתי עם חניה כפולה, מרפסת שמש וגינה מטופחת."
      },
      {
        id: "4",
        title: "פנטהאוז עם נוף",
        type: "sale",
        propertyType: "penthouse",
        price: 2900000,
        rooms: 5,
        bathrooms: 2,
        size: 160,
        neighborhood: "אורנית דרום",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
        description: "פנטהאוז מפואר עם מרפסת גדולה ונוף פנורמי לנוף הפתוח."
      },
      {
        id: "5",
        title: "דירת גן 3 חדרים",
        type: "rent",
        propertyType: "apartment",
        price: 4800,
        rooms: 3,
        bathrooms: 1,
        size: 90,
        neighborhood: "אורנית מערב",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop",
        description: "דירת גן עם גינה פרטית, מתאימה למשפחה צעירה."
      },
      {
        id: "6",
        title: "מגרש לבנייה",
        type: "sale",
        propertyType: "land",
        price: 1800000,
        rooms: 0,
        bathrooms: 0,
        size: 500,
        neighborhood: "אורנית הרחבה",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
        description: "מגרש מושלם לבנייה עצמית באזור שקט עם נוף פתוח."
      }
    ];
  }

  return [
    {
      id: "1",
      title: "Spacious Villa with Garden",
      type: "sale",
      propertyType: "villa",
      price: 3200000,
      rooms: 6,
      bathrooms: 3,
      size: 220,
      neighborhood: "East Oranit",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
      description: "Stunning villa with a large garden, 6 rooms, spacious kitchen and open views."
    },
    {
      id: "2",
      title: "4-Room Apartment for Rent",
      type: "rent",
      propertyType: "apartment",
      price: 5500,
      rooms: 4,
      bathrooms: 2,
      size: 110,
      neighborhood: "Central Oranit",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
      description: "Bright and spacious apartment in a central location, close to schools and shopping."
    },
    {
      id: "3",
      title: "Semi-Detached Cottage",
      type: "sale",
      propertyType: "cottage",
      price: 2600000,
      rooms: 5,
      bathrooms: 2,
      size: 180,
      neighborhood: "North Oranit",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      description: "Semi-detached cottage with double parking, sun terrace and maintained garden."
    },
    {
      id: "4",
      title: "Penthouse with Views",
      type: "sale",
      propertyType: "penthouse",
      price: 2900000,
      rooms: 5,
      bathrooms: 2,
      size: 160,
      neighborhood: "South Oranit",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
      description: "Luxurious penthouse with a large terrace and panoramic countryside views."
    },
    {
      id: "5",
      title: "3-Room Garden Apartment",
      type: "rent",
      propertyType: "apartment",
      price: 4800,
      rooms: 3,
      bathrooms: 1,
      size: 90,
      neighborhood: "West Oranit",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop",
      description: "Garden apartment with private yard, ideal for a young family."
    },
    {
      id: "6",
      title: "Building Plot",
      type: "sale",
      propertyType: "land",
      price: 1800000,
      rooms: 0,
      bathrooms: 0,
      size: 500,
      neighborhood: "Oranit Extension",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
      description: "Perfect plot for self-build in a quiet area with open views."
    }
  ];
};

const formatPrice = (price: number, type: string, lang: string) => {
  const formatted = price.toLocaleString(lang === "he" ? "he-IL" : "en-IL");
  if (type === "rent") {
    return lang === "he" ? `₪${formatted}/חודש` : `₪${formatted}/mo`;
  }
  return `₪${formatted}`;
};

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

      {/* Hero Section */}
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

      {/* Filters Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-10 mb-12">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Listing Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("realEstate.filters.typeLabel")}
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {listingTypes.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("realEstate.filters.propertyLabel")}
                </label>
                <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
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

      {/* Listings Grid */}
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
              <Card key={listing.id} className="overflow-hidden hover-lift h-full">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-smooth hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    className="absolute top-3 left-3"
                    variant={listing.type === "rent" ? "secondary" : "default"}
                  >
                    {listing.type === "rent"
                      ? t("realEstate.badge.rent")
                      : t("realEstate.badge.sale")}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{listing.title}</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-3">
                    {formatPrice(listing.price, listing.type, currentLang)}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {listing.rooms > 0 && (
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        {listing.rooms}
                      </span>
                    )}
                    {listing.bathrooms > 0 && (
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {listing.bathrooms}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      {listing.size} {t("realEstate.sqm")}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.neighborhood}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      {t("realEstate.card.contact")}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA Banner */}
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
