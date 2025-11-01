import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageCircle, HelpCircle, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().min(1, "nameRequired"),
  email: z.string().min(1, "emailRequired").email("emailInvalid"),
  phone: z.string().optional(),
  topic: z.string().min(1, "topicRequired"),
  message: z.string().min(20, "messageMin"),
  honeypot: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = t("contact.seo.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("contact.seo.description"));
    }
  }, [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const selectedTopic = watch("topic");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production, this would POST to /api/contact
      console.log("Form submission:", { ...data, lang });
      
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("contact.title")}</h1>
              <p className="text-xl text-muted-foreground">{t("contact.subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Quick Contact Channels */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Email Card */}
              <a
                href="mailto:contact@oranit.biz"
                className="bg-card p-6 rounded-lg shadow-card hover:shadow-hover transition-shadow border border-border text-center group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.channels.email.title")}</h3>
                <p className="text-sm text-primary">contact@oranit.biz</p>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/972540000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-6 rounded-lg shadow-card hover:shadow-hover transition-shadow border border-border text-center group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.channels.whatsapp.title")}</h3>
                <p className="text-sm text-primary">+972-54-000-0000</p>
              </a>

              {/* Help Center Card */}
              <button
                onClick={() => navigate(`/${lang}/help`)}
                className="bg-card p-6 rounded-lg shadow-card hover:shadow-hover transition-shadow border border-border text-center group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.channels.help.title")}</h3>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("contact.form.title")}</h2>

              {submitStatus === "success" && (
                <div className="mb-8 p-6 bg-primary/10 border border-primary rounded-lg flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("contact.success.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.success.body")}</p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-8 p-6 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("contact.error.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.error.body")}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-lg shadow-card border border-border">
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  {...register("honeypot")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{t(`contact.form.errors.${errors.name.message}`)}</p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{t(`contact.form.errors.${errors.email.message}`)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic">{t("contact.form.topic")}</Label>
                  <Select
                    value={selectedTopic}
                    onValueChange={(value) => setValue("topic", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={errors.topic ? "border-destructive" : ""}>
                      <SelectValue placeholder={t("contact.form.topicPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="general">{t("contact.form.options.general")}</SelectItem>
                      <SelectItem value="addBusiness">{t("contact.form.options.addBusiness")}</SelectItem>
                      <SelectItem value="report">{t("contact.form.options.report")}</SelectItem>
                      <SelectItem value="eventHelp">{t("contact.form.options.eventHelp")}</SelectItem>
                      <SelectItem value="sponsor">{t("contact.form.options.sponsor")}</SelectItem>
                      <SelectItem value="tech">{t("contact.form.options.tech")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.topic && (
                    <p className="text-sm text-destructive">{t(`contact.form.errors.${errors.topic.message}`)}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{t(`contact.form.errors.${errors.message.message}`)}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">{t("contact.location.title")}</h2>
              <p className="text-muted-foreground">{t("contact.location.address")}</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">{t("contact.faq.title")}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {t(`contact.faq.items.${index}.q`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {t(`contact.faq.items.${index}.a`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Footer CTA Banner */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold text-foreground">{t("contact.footer.title")}</h2>
          </div>
        </section>

        <Footer />
    </div>
  );
};

export default ContactPage;
