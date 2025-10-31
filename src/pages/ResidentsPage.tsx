import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Phone, 
  GraduationCap, 
  Trash2, 
  Bus, 
  Home,
  Users,
  Heart,
  Trophy,
  Palette,
  HandHeart,
  Search,
  MessageSquarePlus
} from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";

const ResidentsPage = () => {
  const { t } = useTranslation();

  const services = [
    { icon: Building2, label: "Municipality", labelKey: "residents.services.municipality" },
    { icon: Phone, label: "Emergency", labelKey: "residents.services.emergency" },
    { icon: GraduationCap, label: "Schools", labelKey: "residents.services.schools" },
    { icon: Trash2, label: "Waste Schedule", labelKey: "residents.services.waste" },
    { icon: Bus, label: "Transportation", labelKey: "residents.services.transport" },
    { icon: Home, label: "Public Facilities", labelKey: "residents.services.facilities" }
  ];

  const clubs = [
    {
      icon: Trophy,
      name: "Oranit Sports Club",
      nameKey: "residents.clubs.sports",
      description: "Join our active sports community",
      descKey: "residents.clubs.sportsDesc",
      category: "Sports"
    },
    {
      icon: Palette,
      name: "Arts & Culture Society",
      nameKey: "residents.clubs.arts",
      description: "Creative workshops and exhibitions",
      descKey: "residents.clubs.artsDesc",
      category: "Culture"
    },
    {
      icon: Users,
      name: "Youth Movement",
      nameKey: "residents.clubs.youth",
      description: "Activities for teens and young adults",
      descKey: "residents.clubs.youthDesc",
      category: "Youth"
    },
    {
      icon: HandHeart,
      name: "Community Volunteers",
      nameKey: "residents.clubs.volunteer",
      description: "Make a difference in Oranit",
      descKey: "residents.clubs.volunteerDesc",
      category: "Volunteering"
    }
  ];

  const noticePosts = [
    {
      title: "Lost Cat - Fluffy",
      titleKey: "residents.notices.sample1.title",
      description: "White Persian cat, last seen near the park",
      descKey: "residents.notices.sample1.desc",
      category: "Lost & Found"
    },
    {
      title: "Babysitting Services Available",
      titleKey: "residents.notices.sample2.title",
      description: "Experienced babysitter, flexible hours",
      descKey: "residents.notices.sample2.desc",
      category: "Services"
    },
    {
      title: "Neighborhood Watch Update",
      titleKey: "residents.notices.sample3.title",
      description: "New security measures in place",
      descKey: "residents.notices.sample3.desc",
      category: "Community"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t("residents.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            {t("residents.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MessageSquarePlus className="h-5 w-5" />
              {t("residents.addPost")}
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <Search className="h-5 w-5" />
              {t("residents.findServices")}
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Community Notice Board */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("residents.noticeBoard.title")}</h2>
              <p className="text-muted-foreground">{t("residents.noticeBoard.subtitle")}</p>
            </div>
            <Button className="gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              {t("residents.addPost")}
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input 
              placeholder={t("residents.noticeBoard.searchPlaceholder")}
              className="sm:max-w-xs"
            />
            <Select>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder={t("residents.noticeBoard.categoryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("residents.noticeBoard.categories.all")}</SelectItem>
                <SelectItem value="lostfound">{t("residents.noticeBoard.categories.lostFound")}</SelectItem>
                <SelectItem value="services">{t("residents.noticeBoard.categories.services")}</SelectItem>
                <SelectItem value="community">{t("residents.noticeBoard.categories.community")}</SelectItem>
                <SelectItem value="events">{t("residents.noticeBoard.categories.events")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notice Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticePosts.map((post, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    {t("residents.noticeBoard.readMore")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resident Services */}
        <section>
          <h2 className="text-3xl font-bold mb-6">{t("residents.services.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, idx) => (
              <Card 
                key={idx}
                className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-center"
              >
                <CardContent className="pt-6 pb-6">
                  <service.icon className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <p className="font-semibold text-sm">{service.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Local Clubs & Associations */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{t("residents.clubs.title")}</h2>
            <p className="text-muted-foreground">{t("residents.clubs.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map((club, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <club.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{club.name}</CardTitle>
                  <CardDescription>{club.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge>{club.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg">
              {t("residents.clubs.joinButton")}
            </Button>
          </div>
        </section>

        {/* Volunteer & Donate Section */}
        <section className="bg-accent/30 rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Heart className="h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold">{t("residents.volunteer.title")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("residents.volunteer.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  <Users className="h-5 w-5" />
                  {t("residents.volunteer.viewButton")}
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <HandHeart className="h-5 w-5" />
                  {t("residents.volunteer.startButton")}
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img 
                src={heroImage}
                alt="Volunteer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Footer CTA Banner */}
        <section className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("residents.footerCta.title")}</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("residents.footerCta.description")}
          </p>
          <Button size="lg">
            {t("residents.footerCta.button")}
          </Button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ResidentsPage;
