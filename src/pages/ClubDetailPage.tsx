import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, Mail } from "lucide-react";
import { getClubBySlug } from "@/data/residentsData";

const ClubDetailPage = () => {
  const { t } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const isRTL = lang === "he";
  const club = getClubBySlug(slug || "");

  if (!club) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("residents.clubDetail.notFound")}</h1>
          <Link to={`/${lang}/residents`}>
            <Button>{t("buttons.back")}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const Icon = club.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to={`/${lang}/residents`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <BackArrow className="h-4 w-4" />
          {t("residents.clubDetail.backToClubs")}
        </Link>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{t(club.nameKey)}</h1>
              <Badge className="mt-2">{t(club.categoryKey)}</Badge>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 prose prose-lg max-w-none dark:prose-invert">
              <p>{t(club.longDescKey)}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("residents.clubDetail.meetingSchedule")}</h3>
                  <p className="text-muted-foreground text-sm">{t(club.meetingKey)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("residents.clubDetail.contactUs")}</h3>
                  <p className="text-muted-foreground text-sm">{t(club.contactKey)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button size="lg">{t("residents.clubs.joinButton")}</Button>
            <Link to={`/${lang}/residents`}>
              <Button variant="outline" size="lg">{t("buttons.back")}</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClubDetailPage;
