import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/shared/HeroBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Search, Plus, Share2, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-events.jpg";

// Sample events data - will be replaced with fixtures
const getSampleEvents = (lang: string) => {
  if (lang === 'he') {
    return [
      {
        id: "1",
        title: "קונצרט בפארק הקהילתי",
        category: "music",
        date: "2025-11-15",
        time: "19:00",
        location: "פארק אורנית",
        description: "ערב מוזיקה חי עם אמנים מקומיים. הביאו שמיכות וכיבוד!",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=500&fit=crop"
      },
      {
        id: "2",
        title: "יריד קהילתי",
        category: "community",
        date: "2025-11-20",
        time: "10:00",
        location: "כיכר המרכזית",
        description: "יריד עם מוצרי בית, אוכל ופעילויות לילדים",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop"
      },
      {
        id: "3",
        title: "סדנת בישול משפחתית",
        category: "family",
        date: "2025-11-22",
        time: "16:00",
        location: "מרכז קהילתי אורנית",
        description: "למדו להכין פיצה ביתית עם הילדים",
        image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&h=500&fit=crop"
      }
    ];
  }
  
  return [
    {
      id: "1",
      title: "Community Park Concert",
      category: "music",
      date: "2025-11-15",
      time: "19:00",
      location: "Oranit Park",
      description: "Live music evening featuring local artists. Bring blankets and snacks!",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=500&fit=crop"
    },
    {
      id: "2",
      title: "Community Market Fair",
      category: "community",
      date: "2025-11-20",
      time: "10:00",
      location: "Central Square",
      description: "Market featuring homemade goods, food, and activities for kids",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop"
    },
    {
      id: "3",
      title: "Family Cooking Workshop",
      category: "family",
      date: "2025-11-22",
      time: "16:00",
      location: "Oranit Community Center",
      description: "Learn to make homemade pizza with your kids",
      image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&h=500&fit=crop"
    }
  ];
};

const EventsPage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  const events = getSampleEvents(currentLang);

  const categories = [
    { value: "all", label: t("events.categories.all") },
    { value: "community", label: t("events.categories.community") },
    { value: "kids", label: t("events.categories.kids") },
    { value: "sports", label: t("events.categories.sports") },
    { value: "music", label: t("events.categories.music") },
    { value: "education", label: t("events.categories.education") },
    { value: "municipal", label: t("events.categories.municipal") },
    { value: "family", label: t("events.categories.family") }
  ];

  const dateFilters = [
    { value: "all", label: t("events.dateFilters.all") },
    { value: "today", label: t("events.dateFilters.today") },
    { value: "thisWeek", label: t("events.dateFilters.thisWeek") },
    { value: "thisMonth", label: t("events.dateFilters.thisMonth") }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToForm = () => {
    setShowAddEventForm(true);
    setTimeout(() => {
      document.getElementById('add-event-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroBanner
        imageUrl={heroImage}
        title={t("events.hero.title")}
        subtitle={t("events.hero.subtitle")}
        minHeight="md"
        align="left"
      >
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
          onClick={scrollToForm}
        >
          <Plus className="h-5 w-5 mr-2" />
          {t("events.hero.addButton")}
        </Button>
      </HeroBanner>

      {/* Filters Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-10 mb-12">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("events.filters.dateLabel")}
                </label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFilters.map(filter => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("events.filters.categoryLabel")}
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("events.filters.searchLabel")}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("events.filters.searchPlaceholder")}
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

      {/* Events Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">{t("events.noResults.title")}</h3>
            <p className="text-muted-foreground mb-6">{t("events.noResults.description")}</p>
            <Button onClick={scrollToForm}>
              <Plus className="h-4 w-4 mr-2" />
              {t("events.noResults.addButton")}
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <Link 
                key={event.id} 
                to={`/${currentLang}/events/${event.id}`}
                className="block"
              >
                <Card className="overflow-hidden hover-lift h-full">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-smooth hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="flex-1">
                        {t("events.card.viewDetails")}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // Share functionality
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Add Event Section */}
      {showAddEventForm && (
        <section id="add-event-form" className="container mx-auto px-4 pb-20">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">{t("events.addForm.title")}</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("events.addForm.eventName")}
                  </label>
                  <Input placeholder={t("events.addForm.eventNamePlaceholder")} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("events.addForm.category")}
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("events.addForm.categoryPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.value !== "all").map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("events.addForm.date")}
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("events.addForm.time")}
                    </label>
                    <Input type="time" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("events.addForm.location")}
                  </label>
                  <Input placeholder={t("events.addForm.locationPlaceholder")} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("events.addForm.description")}
                  </label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder={t("events.addForm.descriptionPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("events.addForm.contact")}
                  </label>
                  <Input placeholder={t("events.addForm.contactPlaceholder")} />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {t("events.addForm.submitButton")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Footer CTA Banner */}
      <section className="bg-primary-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            {t("events.footerCta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("events.footerCta.description")}
          </p>
          <Button size="lg" onClick={scrollToForm}>
            <Plus className="h-5 w-5 mr-2" />
            {t("events.footerCta.button")}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
