import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { getServiceBySlug } from "@/data/residentsData";

const ServiceDetailPage = () => {
  const { t } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const isRTL = lang === "he";
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("residents.serviceDetail.notFound")}</h1>
          <Link to={`/${lang}/residents`}>
            <Button>{t("buttons.back")}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to={`/${lang}/residents`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <BackArrow className="h-4 w-4" />
          {t("residents.serviceDetail.backToServices")}
        </Link>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{t(service.labelKey)}</h1>
          </div>

          <Card>
            <CardContent className="pt-6 prose prose-lg max-w-none dark:prose-invert">
              <p>{t(service.descKey)}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("residents.serviceDetail.phone")}</h3>
                  <p className="text-muted-foreground text-sm">{t(service.phoneKey)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("residents.serviceDetail.address")}</h3>
                  <p className="text-muted-foreground text-sm">{t(service.addressKey)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{t("residents.serviceDetail.hours")}</h3>
                  <p className="text-muted-foreground text-sm">{t(service.hoursKey)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            {service.websiteUrl && (
              <a href={service.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {t("residents.serviceDetail.visitWebsite")}
                </Button>
              </a>
            )}
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

export default ServiceDetailPage;
