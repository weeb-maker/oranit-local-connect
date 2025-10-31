import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Share2, ExternalLink, ArrowLeft } from "lucide-react";

const EventDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { lang, id } = useParams<{ lang: string; id: string }>();
  const currentLang = lang || 'he';

  // Sample event data - will be replaced with actual data fetching
  const event = currentLang === 'he' ? {
    id: id || "1",
    title: "קונצרט בפארק הקהילתי",
    category: "מוזיקה",
    date: "2025-11-15",
    time: "19:00",
    location: "פארק אורנית",
    address: "רחוב הפארק 1, אורנית",
    description: "ערב מוזיקה חי מרגש עם אמנים מקומיים מוכשרים. האירוע כולל הופעות של להקות רוק, פופ וג'אז מהאזור. הביאו שמיכות, כיסאות ואת המשפחה לערב בלתי נשכח של מוזיקה טובה ואווירה קהילתית חמה.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop",
    contact: "events@oranit.com",
    organizer: "ועד אורנית"
  } : {
    id: id || "1",
    title: "Community Park Concert",
    category: "Music",
    date: "2025-11-15",
    time: "19:00",
    location: "Oranit Park",
    address: "Park Street 1, Oranit",
    description: "An exciting live music evening featuring talented local artists. The event includes performances by rock, pop, and jazz bands from the area. Bring blankets, chairs, and your family for an unforgettable evening of great music and warm community atmosphere.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop",
    contact: "events@oranit.com",
    organizer: "Oranit Community"
  };

  const similarEvents = [
    {
      id: "2",
      title: currentLang === 'he' ? "יריד קהילתי" : "Community Market Fair",
      date: "2025-11-20",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      title: currentLang === 'he' ? "סדנת בישול משפחתית" : "Family Cooking Workshop",
      date: "2025-11-22",
      image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400&h=300&fit=crop"
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to={`/${currentLang}/events`}
          className="inline-flex items-center text-primary hover:text-primary-hover mb-6 transition-smooth"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("events.detail.backToEvents")}
        </Link>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Button 
              variant="secondary" 
              size="icon"
              onClick={handleShare}
              className="shadow-lg"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-lg text-muted-foreground">{event.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("events.detail.aboutEvent")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("events.detail.location")}</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">{event.address}</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("events.detail.openInMaps")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">{t("events.detail.eventDetails")}</h2>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t("events.detail.date")}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t("events.detail.time")}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t("events.detail.venue")}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium mb-2">{t("events.detail.organizer")}</p>
                  <p className="text-sm text-muted-foreground">{event.organizer}</p>
                </div>

                <Button className="w-full" size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("events.detail.addToCalendar")}
                </Button>
              </CardContent>
            </Card>

            {/* Similar Events */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("events.detail.similarEvents")}</h2>
                <div className="space-y-4">
                  {similarEvents.map(similar => (
                    <Link 
                      key={similar.id}
                      to={`/${currentLang}/events/${similar.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3 items-center hover-lift">
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
                          <p className="text-xs text-muted-foreground mt-1">{similar.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
