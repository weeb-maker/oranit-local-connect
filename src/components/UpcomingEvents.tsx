import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    title: "Community Farmer's Market",
    date: "Every Sunday",
    time: "8:00 AM - 12:00 PM",
    venue: "Town Square",
    category: "Market",
    attendees: "50+",
    color: "from-green-500/10 to-green-600/10",
  },
  {
    title: "Youth Art Workshop",
    date: "Dec 15, 2024",
    time: "3:00 PM - 5:00 PM",
    venue: "Community Center",
    category: "Workshop",
    attendees: "20",
    color: "from-purple-500/10 to-purple-600/10",
  },
  {
    title: "Local Business Networking",
    date: "Dec 20, 2024",
    time: "6:00 PM - 8:00 PM",
    venue: "Café Central",
    category: "Networking",
    attendees: "35",
    color: "from-blue-500/10 to-blue-600/10",
  },
  {
    title: "Holiday Celebration",
    date: "Dec 25, 2024",
    time: "5:00 PM - 9:00 PM",
    venue: "Town Square",
    category: "Festival",
    attendees: "200+",
    color: "from-orange-500/10 to-orange-600/10",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Community Calendar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Happening in Oranit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join your neighbors at upcoming local events, workshops, and gatherings
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
                  <Badge variant="secondary">{event.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="default" size="lg" asChild>
            <a href="/events">View Community Calendar</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
