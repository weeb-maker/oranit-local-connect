import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

const getEvents = (t: any) => [
  {
    titleKey: "upcomingEvents.event1.title",
    dateKey: "upcomingEvents.event1.date",
    timeKey: "upcomingEvents.event1.time",
    venueKey: "upcomingEvents.event1.venue",
    categoryKey: "upcomingEvents.event1.category",
    attendeesKey: "upcomingEvents.event1.attendees",
    color: "from-green-500/10 to-green-600/10",
  },
  {
    titleKey: "upcomingEvents.event2.title",
    dateKey: "upcomingEvents.event2.date",
    timeKey: "upcomingEvents.event2.time",
    venueKey: "upcomingEvents.event2.venue",
    categoryKey: "upcomingEvents.event2.category",
    attendeesKey: "upcomingEvents.event2.attendees",
    color: "from-purple-500/10 to-purple-600/10",
  },
  {
    titleKey: "upcomingEvents.event3.title",
    dateKey: "upcomingEvents.event3.date",
    timeKey: "upcomingEvents.event3.time",
    venueKey: "upcomingEvents.event3.venue",
    categoryKey: "upcomingEvents.event3.category",
    attendeesKey: "upcomingEvents.event3.attendees",
    color: "from-blue-500/10 to-blue-600/10",
  },
  {
    titleKey: "upcomingEvents.event4.title",
    dateKey: "upcomingEvents.event4.date",
    timeKey: "upcomingEvents.event4.time",
    venueKey: "upcomingEvents.event4.venue",
    categoryKey: "upcomingEvents.event4.category",
    attendeesKey: "upcomingEvents.event4.attendees",
    color: "from-orange-500/10 to-orange-600/10",
  },
];

const UpcomingEvents = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he';
  const events = getEvents(t);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("upcomingEvents.title")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("upcomingEvents.subtitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("upcomingEvents.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className={`transition-smooth hover:shadow-smooth-lg hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 bg-gradient-to-br ${event.color}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{t(event.categoryKey)}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{t(event.attendeesKey)}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{t(event.titleKey)}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{t(event.dateKey)} • {t(event.timeKey)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{t(event.venueKey)}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  {t("upcomingEvents.learnMore")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="default" size="lg" asChild>
            <a href={`/${currentLang}/events`}>{t("upcomingEvents.viewCalendar")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
