import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/shared/HeroBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, HandHeart, Search, MessageSquarePlus } from "lucide-react";
import heroImage from "@/assets/hero-residents.jpg";
import { noticePosts, services, clubs } from "@/data/residentsData";

const ResidentsPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroBanner
        imageUrl={heroImage}
        title={t("residents.title")}
        subtitle={t("residents.subtitle")}
        minHeight="md"
        align="center"
      >
        <Link to={`/${lang}/residents/post`}>
          <Button size="lg" className="gap-2 shadow-lg">
            <MessageSquarePlus className="h-5 w-5" />
            {t("residents.addPost")}
          </Button>
        </Link>
        <Button size="lg" variant="secondary" className="gap-2 shadow-lg">
          <Search className="h-5 w-5" />
          {t("residents.findServices")}
        </Button>
      </HeroBanner>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Community Notice Board */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("residents.noticeBoard.title")}</h2>
              <p className="text-muted-foreground">{t("residents.noticeBoard.subtitle")}</p>
            </div>
            <Link to={`/${lang}/residents/post`}>
              <Button className="gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                {t("residents.addPost")}
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input placeholder={t("residents.noticeBoard.searchPlaceholder")} className="sm:max-w-xs" />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticePosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{t(post.categoryKey)}</Badge>
                  </div>
                  <CardTitle className="text-xl">{t(post.titleKey)}</CardTitle>
                  <CardDescription>{t(post.descKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/${lang}/residents/notices/${post.id}`}>
                    <Button variant="outline" className="w-full">
                      {t("residents.noticeBoard.readMore")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resident Services */}
        <section>
          <h2 className="text-3xl font-bold mb-6">{t("residents.services.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service) => (
              <Link key={service.slug} to={`/${lang}/residents/services/${service.slug}`}>
                <Card className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-center">
                  <CardContent className="pt-6 pb-6">
                    <service.icon className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <p className="font-semibold text-sm">{t(service.labelKey)}</p>
                  </CardContent>
                </Card>
              </Link>
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
            {clubs.map((club) => (
              <Link key={club.slug} to={`/${lang}/residents/clubs/${club.slug}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <club.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{t(club.nameKey)}</CardTitle>
                    <CardDescription>{t(club.descKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge>{t(club.categoryKey)}</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg">{t("residents.clubs.joinButton")}</Button>
          </div>
        </section>

        {/* Volunteer & Donate Section */}
        <section className="bg-accent/30 rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Heart className="h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold">{t("residents.volunteer.title")}</h2>
              <p className="text-lg text-muted-foreground">{t("residents.volunteer.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/${lang}/residents/volunteer`}>
                  <Button size="lg" className="gap-2">
                    <Users className="h-5 w-5" />
                    {t("residents.volunteer.viewButton")}
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <HandHeart className="h-5 w-5" />
                  {t("residents.volunteer.startButton")}
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img src={heroImage} alt="Volunteer" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Footer CTA Banner */}
        <section className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("residents.footerCta.title")}</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">{t("residents.footerCta.description")}</p>
          <Button size="lg">{t("residents.footerCta.button")}</Button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ResidentsPage;
