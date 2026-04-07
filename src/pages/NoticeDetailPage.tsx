import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, MessageSquarePlus } from "lucide-react";
import { getNoticeById } from "@/data/residentsData";

const NoticeDetailPage = () => {
  const { t } = useTranslation();
  const { lang, id } = useParams<{ lang: string; id: string }>();
  const isRTL = lang === "he";
  const notice = getNoticeById(id || "");

  if (!notice) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("residents.noticeDetail.notFound")}</h1>
          <Link to={`/${lang}/residents`}>
            <Button>{t("buttons.back")}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Breadcrumb */}
        <Link to={`/${lang}/residents`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <BackArrow className="h-4 w-4" />
          {t("residents.noticeDetail.backToBoard")}
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{t(notice.categoryKey)}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {notice.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">{t(notice.titleKey)}</h1>
          <p className="text-lg text-muted-foreground">{t(notice.descKey)}</p>

          <Card>
            <CardContent className="pt-6 prose prose-lg max-w-none dark:prose-invert">
              <p>{t(notice.bodyKey)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">{t("residents.noticeDetail.contactInfo")}</h3>
              <p className="text-muted-foreground">{t(notice.contactKey)}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button className="gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              {t("residents.noticeDetail.respond")}
            </Button>
            <Link to={`/${lang}/residents`}>
              <Button variant="outline">{t("buttons.back")}</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoticeDetailPage;
