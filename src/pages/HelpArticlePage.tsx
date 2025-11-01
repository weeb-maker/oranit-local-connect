import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  ChevronRight, 
  Clock, 
  ThumbsUp, 
  ThumbsDown,
  MessageCircle,
  AlertCircle
} from "lucide-react";
import { loadArticle, loadCatalog, type HelpArticle, type CatalogItem } from "@/lib/helpContent";
import { useToast } from "@/hooks/use-toast";

const HelpArticlePage = () => {
  const { t } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const currentLang = (lang || "he") as "en" | "he";
  const { toast } = useToast();

  const [article, setArticle] = useState<HelpArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      const articleData = await loadArticle(slug, currentLang);
      
      if (articleData) {
        setArticle(articleData);
        
        // Load related articles
        const catalog = await loadCatalog(currentLang);
        const related = articleData.related
          ? catalog.filter(item => articleData.related?.includes(item.id))
          : catalog.filter(item => 
              item.category === articleData.category && 
              item.id !== articleData.id
            ).slice(0, 3);
        setRelatedArticles(related);
      }
      
      setIsLoading(false);
    };

    loadData();
  }, [slug, currentLang]);

  useEffect(() => {
    if (!article) return;

    document.title = `${article.title} - ${t("help.seo.title")}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", article.excerpt);
    }

    // Add canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://oranit.biz/${currentLang}/help/${article.slug}`);

    // Add schema.org Article markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "dateModified": article.updatedAt,
      "inLanguage": currentLang,
      "keywords": article.keywords.join(", "),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://oranit.biz/${currentLang}/help/${article.slug}`
      },
      ...(article.faq && {
        "mainEntity": article.faq.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      })
    });
    document.head.appendChild(script);

    // Add BreadcrumbList schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t("help.article.breadcrumbHome"),
          "item": `https://oranit.biz/${currentLang}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t("help.article.breadcrumbHelp"),
          "item": `https://oranit.biz/${currentLang}/help`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": t(`help.categories.${article.category}`),
          "item": `https://oranit.biz/${currentLang}/help?category=${article.category}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": article.title,
          "item": `https://oranit.biz/${currentLang}/help/${article.slug}`
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (breadcrumbScript.parentNode) breadcrumbScript.parentNode.removeChild(breadcrumbScript);
    };
  }, [article, currentLang, t]);

  const handleFeedback = async (helpful: boolean) => {
    if (!article) return;

    setIsSubmittingFeedback(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFeedbackGiven(true);
      toast({
        title: t("help.feedback.thanks"),
        description: helpful ? "😊" : t("help.feedback.commentLabel"),
      });
    } catch (error) {
      toast({
        title: t("help.feedback.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!article || !feedbackComment.trim()) return;

    setIsSubmittingFeedback(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: t("help.feedback.thanks"),
      });
      setFeedbackComment("");
    } catch (error) {
      toast({
        title: t("help.feedback.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <div className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
            <div className="h-12 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <div className="flex-1 container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">{t("help.empty.title")}</h2>
              <p className="text-muted-foreground mb-6">{t("help.empty.body")}</p>
              <Button asChild>
                <Link to={`/${currentLang}/help`}>{t("help.article.breadcrumbHelp")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const otherLang = currentLang === "en" ? "he" : "en";
  const otherLangSlug = article.slug_i18n[otherLang];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12">
        <article className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/${currentLang}`}>{t("help.article.breadcrumbHome")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/${currentLang}/help`}>{t("help.article.breadcrumbHelp")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/${currentLang}/help?category=${article.category}`}>
                      {t(`help.categories.${article.category}`)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{article.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">{t(`help.categories.${article.category}`)}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {t("help.article.updated")} {new Date(article.updatedAt).toLocaleDateString(currentLang === "he" ? "he-IL" : "en-US")}
                  </div>
                  <span>•</span>
                  <span>{article.readingTime} {t("help.article.readingTime")}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-muted-foreground">{article.excerpt}</p>
              
              {/* Language Switch */}
              {otherLangSlug && (
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link to={`/${otherLang}/help/${otherLangSlug}`}>
                    {t("help.article.switchLang", { lang: otherLang === "he" ? "עברית" : "English" })}
                  </Link>
                </Button>
              )}
            </header>

            {/* Article Content */}
            <Card className="mb-8">
              <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8">
                <div dangerouslySetInnerHTML={{ __html: article.html }} />
              </CardContent>
            </Card>

            {/* FAQ Section */}
            {article.faq && article.faq.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {article.faq.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Feedback Module */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("help.feedback.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                {!feedbackGiven ? (
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleFeedback(true)}
                      disabled={isSubmittingFeedback}
                    >
                      <ThumbsUp className="w-5 h-5 mr-2" />
                      {t("help.feedback.yes")}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleFeedback(false)}
                      disabled={isSubmittingFeedback}
                    >
                      <ThumbsDown className="w-5 h-5 mr-2" />
                      {t("help.feedback.no")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4" role="status" aria-live="polite">
                    <p className="text-primary font-medium">{t("help.feedback.thanks")}</p>
                    <div>
                      <label htmlFor="feedback-comment" className="block text-sm font-medium mb-2">
                        {t("help.feedback.commentLabel")}
                      </label>
                      <Textarea
                        id="feedback-comment"
                        placeholder={t("help.feedback.commentPlaceholder")}
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        rows={3}
                        className="mb-2"
                      />
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!feedbackComment.trim() || isSubmittingFeedback}
                      >
                        {isSubmittingFeedback ? t("help.feedback.submitting") : t("help.feedback.submit")}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("help.article.related")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      to={`/${currentLang}/help/${related.slug}`}
                    >
                      <Card className="h-full hover:shadow-hover transition-shadow">
                        <CardHeader>
                          <Badge variant="secondary" className="w-fit mb-2">
                            {t(`help.categories.${related.category}`)}
                          </Badge>
                          <CardTitle className="text-lg">{related.title}</CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-12 mt-12 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("help.cta.title")}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to={`/${currentLang}/contact`}>{t("help.cta.button")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/972540000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("help.cta.whatsapp")}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpArticlePage;