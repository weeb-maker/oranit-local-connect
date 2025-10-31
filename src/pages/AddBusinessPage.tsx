import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Upload } from "lucide-react";

const AddBusinessPage = () => {
  const { t } = useTranslation();

  const benefits = [
    { key: "addBusiness.benefit1" },
    { key: "addBusiness.benefit2" },
    { key: "addBusiness.benefit3" },
    { key: "addBusiness.benefit4" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {t("addBusiness.title")}
            </h1>
            <p className="text-xl text-white/90">{t("addBusiness.subtitle")}</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>{t("addBusiness.whyListTitle")}</CardTitle>
                  <CardDescription>{t("addBusiness.whyListDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{t(benefit.key)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("addBusiness.formTitle")}</CardTitle>
                  <CardDescription>{t("addBusiness.formDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <Label htmlFor="businessName">{t("addBusiness.businessName")} *</Label>
                      <Input id="businessName" placeholder={t("addBusiness.businessNamePlaceholder")} required />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">{t("addBusiness.category")} *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t("addBusiness.selectCategory")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shops">{t("categories.shops.title")}</SelectItem>
                          <SelectItem value="food">{t("categories.food.title")}</SelectItem>
                          <SelectItem value="professional">{t("categories.professional.title")}</SelectItem>
                          <SelectItem value="home">{t("categories.home.title")}</SelectItem>
                          <SelectItem value="wellness">{t("categories.wellness.title")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">{t("addBusiness.address")} *</Label>
                      <Input id="address" placeholder={t("addBusiness.addressPlaceholder")} required />
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">{t("addBusiness.contactPerson")} *</Label>
                      <Input id="contactPerson" placeholder={t("addBusiness.contactPersonPlaceholder")} required />
                    </div>

                    {/* Phone & Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("addBusiness.phone")} *</Label>
                        <Input id="phone" type="tel" placeholder="050-123-4567" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("addBusiness.email")} *</Label>
                        <Input id="email" type="email" placeholder="business@example.com" required />
                      </div>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                      <Label htmlFor="website">{t("addBusiness.website")}</Label>
                      <Input id="website" type="url" placeholder="https://www.example.com" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">{t("addBusiness.description")} *</Label>
                      <Textarea
                        id="description"
                        placeholder={t("addBusiness.descriptionPlaceholder")}
                        rows={4}
                        required
                      />
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="logo">{t("addBusiness.logo")}</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-smooth cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          {t("addBusiness.uploadLogo")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("addBusiness.uploadLogoHelp")}
                        </p>
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <Checkbox id="consent" required />
                      <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
                        {t("addBusiness.consent")}
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full">
                      {t("addBusiness.submit")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddBusinessPage;
