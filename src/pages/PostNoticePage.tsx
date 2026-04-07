import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const PostNoticePage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const isRtl = lang === "he";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("residents.postNotice.successTitle"),
      description: t("residents.postNotice.successDesc"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Link
          to={`/${lang}/residents`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <BackArrow className="h-4 w-4" />
          {t("residents.postNotice.backToBoard")}
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("residents.postNotice.title")}</CardTitle>
            <p className="text-muted-foreground">{t("residents.postNotice.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t("residents.postNotice.fields.title")}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("residents.postNotice.fields.titlePlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t("residents.postNotice.fields.category")}</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder={t("residents.postNotice.fields.categoryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lostfound">{t("residents.noticeBoard.categories.lostFound")}</SelectItem>
                    <SelectItem value="services">{t("residents.noticeBoard.categories.services")}</SelectItem>
                    <SelectItem value="community">{t("residents.noticeBoard.categories.community")}</SelectItem>
                    <SelectItem value="events">{t("residents.noticeBoard.categories.events")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">{t("residents.postNotice.fields.body")}</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={t("residents.postNotice.fields.bodyPlaceholder")}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">{t("residents.postNotice.fields.contact")}</Label>
                <Input
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t("residents.postNotice.fields.contactPlaceholder")}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="h-4 w-4" />
                {t("residents.postNotice.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PostNoticePage;
