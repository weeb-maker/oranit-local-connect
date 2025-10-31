import { useTranslation } from "react-i18next";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Plus,
  Search,
  MapPin,
  Clock,
  MessageCircle,
  Phone,
  Share2,
  Heart,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-marketplace.jpg";

interface Listing {
  id: string;
  title: string;
  category: string;
  priceType: "paid" | "free";
  price?: number;
  condition: string;
  image: string;
  neighborhood?: string;
  createdAt: string;
}

const MarketplacePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [priceTypeFilter, setPriceTypeFilter] = useState<string>("all");
  const [postingPriceType, setPostingPriceType] = useState<string>("paid");
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // Sample listings data
  const sampleListings: Listing[] = [
    {
      id: "1",
      title: "IKEA Sofa - Great Condition",
      category: "Furniture",
      priceType: "paid",
      price: 800,
      condition: "good",
      image: "/placeholder.svg",
      neighborhood: "Center",
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Kids Books Collection",
      category: "Books",
      priceType: "free",
      condition: "good",
      image: "/placeholder.svg",
      neighborhood: "North",
      createdAt: "2024-01-14T15:30:00Z"
    },
    {
      id: "3",
      title: "Baby Stroller",
      category: "Kids",
      priceType: "paid",
      price: 350,
      condition: "like_new",
      image: "/placeholder.svg",
      createdAt: "2024-01-13T09:20:00Z"
    },
    {
      id: "4",
      title: "Garden Tools Set",
      category: "Home & Garden",
      priceType: "free",
      condition: "fair",
      image: "/placeholder.svg",
      neighborhood: "South",
      createdAt: "2024-01-12T14:45:00Z"
    }
  ];

  const filteredListings = sampleListings.filter(listing => {
    if (priceTypeFilter === "paid") return listing.priceType === "paid";
    if (priceTypeFilter === "free") return listing.priceType === "free";
    return true;
  });

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("marketplace.title")}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            {t("marketplace.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  {t("marketplace.postButton")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("marketplace.postForm.title")}</DialogTitle>
                  <DialogDescription>{t("marketplace.postForm.subtitle")}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Step 1: Basics */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="listing-title">{t("marketplace.postForm.listingTitle")}</Label>
                      <Input id="listing-title" placeholder={t("marketplace.postForm.titlePlaceholder")} />
                    </div>

                    <div>
                      <Label htmlFor="category">{t("marketplace.postForm.category")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t("marketplace.postForm.categoryPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furniture">{t("marketplace.categories.furniture")}</SelectItem>
                          <SelectItem value="electronics">{t("marketplace.categories.electronics")}</SelectItem>
                          <SelectItem value="kids">{t("marketplace.categories.kids")}</SelectItem>
                          <SelectItem value="home">{t("marketplace.categories.home")}</SelectItem>
                          <SelectItem value="clothing">{t("marketplace.categories.clothing")}</SelectItem>
                          <SelectItem value="sports">{t("marketplace.categories.sports")}</SelectItem>
                          <SelectItem value="vehicles">{t("marketplace.categories.vehicles")}</SelectItem>
                          <SelectItem value="books">{t("marketplace.categories.books")}</SelectItem>
                          <SelectItem value="misc">{t("marketplace.categories.misc")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>{t("marketplace.postForm.priceType")}</Label>
                      <RadioGroup value={postingPriceType} onValueChange={setPostingPriceType} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paid" id="paid" />
                          <Label htmlFor="paid" className="cursor-pointer">{t("marketplace.filters.priceType.paid")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free" className="cursor-pointer">{t("marketplace.filters.priceType.free")}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {postingPriceType === "paid" && (
                      <div>
                        <Label htmlFor="price">{t("marketplace.postForm.price")}</Label>
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="0"
                          className="text-left"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="condition">{t("marketplace.postForm.condition")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t("marketplace.postForm.conditionPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">{t("marketplace.conditions.new")}</SelectItem>
                          <SelectItem value="like_new">{t("marketplace.conditions.likeNew")}</SelectItem>
                          <SelectItem value="good">{t("marketplace.conditions.good")}</SelectItem>
                          <SelectItem value="fair">{t("marketplace.conditions.fair")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">{t("marketplace.postForm.description")}</Label>
                      <Textarea 
                        id="description" 
                        placeholder={t("marketplace.postForm.descriptionPlaceholder")}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>{t("marketplace.postForm.photos")}</Label>
                      <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{t("marketplace.postForm.photosHelp")}</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="neighborhood">{t("marketplace.postForm.location")}</Label>
                      <Input id="neighborhood" placeholder={t("marketplace.postForm.locationPlaceholder")} />
                    </div>

                    <div>
                      <Label>{t("marketplace.postForm.contactOptions")}</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="whatsapp" />
                          <Label htmlFor="whatsapp" className="cursor-pointer">{t("marketplace.postForm.whatsapp")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="call" />
                          <Label htmlFor="call" className="cursor-pointer">{t("marketplace.postForm.call")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="message" />
                          <Label htmlFor="message" className="cursor-pointer">{t("marketplace.postForm.message")}</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="rules" />
                      <Label htmlFor="rules" className="text-sm cursor-pointer">
                        {t("marketplace.postForm.agreeRules")}
                      </Label>
                    </div>

                    <Button className="w-full" size="lg">
                      {t("marketplace.postForm.submit")}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setPriceTypeFilter("free")}
            >
              {t("marketplace.freeOnly")}
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <Card className="mb-8 sticky top-4 z-10">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={t("marketplace.filters.search")}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select>
                <SelectTrigger className="lg:w-[200px]">
                  <SelectValue placeholder={t("marketplace.filters.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("marketplace.filters.allCategories")}</SelectItem>
                  <SelectItem value="furniture">{t("marketplace.categories.furniture")}</SelectItem>
                  <SelectItem value="electronics">{t("marketplace.categories.electronics")}</SelectItem>
                  <SelectItem value="kids">{t("marketplace.categories.kids")}</SelectItem>
                  <SelectItem value="home">{t("marketplace.categories.home")}</SelectItem>
                  <SelectItem value="clothing">{t("marketplace.categories.clothing")}</SelectItem>
                  <SelectItem value="sports">{t("marketplace.categories.sports")}</SelectItem>
                  <SelectItem value="vehicles">{t("marketplace.categories.vehicles")}</SelectItem>
                  <SelectItem value="books">{t("marketplace.categories.books")}</SelectItem>
                  <SelectItem value="misc">{t("marketplace.categories.misc")}</SelectItem>
                </SelectContent>
              </Select>

              <ToggleGroup type="single" value={priceTypeFilter} onValueChange={setPriceTypeFilter}>
                <ToggleGroupItem value="all" aria-label="All listings">
                  {t("marketplace.filters.priceType.all")}
                </ToggleGroupItem>
                <ToggleGroupItem value="paid" aria-label="Paid listings">
                  {t("marketplace.filters.priceType.paid")}
                </ToggleGroupItem>
                <ToggleGroupItem value="free" aria-label="Free listings">
                  {t("marketplace.filters.priceType.free")}
                </ToggleGroupItem>
              </ToggleGroup>

              <Select>
                <SelectTrigger className="lg:w-[180px]">
                  <SelectValue placeholder={t("marketplace.filters.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("marketplace.filters.newest")}</SelectItem>
                  <SelectItem value="price-low">{t("marketplace.filters.priceLow")}</SelectItem>
                  <SelectItem value="price-high">{t("marketplace.filters.priceHigh")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card 
                key={listing.id} 
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(`/${i18n.language}/marketplace/${listing.id}`)}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {listing.priceType === "free" && (
                    <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white">
                      {t("marketplace.badge.free")}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{listing.category}</Badge>
                    <Badge variant="secondary">{t(`marketplace.conditions.${listing.condition}`)}</Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-1">{listing.title}</CardTitle>
                  <div className="flex justify-between items-center mt-2">
                    {listing.priceType === "paid" ? (
                      <span className="text-2xl font-bold text-primary">₪{listing.price}</span>
                    ) : (
                      <span className="text-lg font-semibold text-green-600">{t("marketplace.badge.free")}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.neighborhood || "Oranit"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{getTimeAgo(listing.createdAt)}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    {t("marketplace.view")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">{t("marketplace.empty")}</p>
            <Button className="mt-4" onClick={() => setIsPostDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("marketplace.postButton")}
            </Button>
          </Card>
        )}

        {/* Safety Rules Footer */}
        <Card className="mt-8 bg-accent/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">{t("marketplace.rules.title")}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t("marketplace.safetyNote")}
            </p>
            <Button variant="link" className="p-0 h-auto">
              {t("marketplace.rules.link")}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default MarketplacePage;
