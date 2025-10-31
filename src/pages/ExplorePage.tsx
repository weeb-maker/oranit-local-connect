import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CategoryTile } from "@/components/shared/CategoryTile";
import { BusinessCard } from "@/components/shared/BusinessCard";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Utensils,
  Briefcase,
  Home,
  Heart,
  Car,
  Users,
  MoreHorizontal,
} from "lucide-react";

const categories = [
  { slug: "shops", titleKey: "categories.shops.title", icon: ShoppingBag, count: 24 },
  { slug: "food", titleKey: "categories.food.title", icon: Utensils, count: 18 },
  { slug: "professional", titleKey: "categories.professional.title", icon: Briefcase, count: 32 },
  { slug: "home", titleKey: "categories.home.title", icon: Home, count: 15 },
  { slug: "wellness", titleKey: "categories.wellness.title", icon: Heart, count: 12 },
  { slug: "mobility", titleKey: "categories.mobility.title", icon: Car, count: 8 },
  { slug: "youth", titleKey: "categories.youth.title", icon: Users, count: 10 },
  { slug: "other", titleKey: "categories.other.title", icon: MoreHorizontal, count: 6 },
];

const featuredBusinesses = [
  {
    id: "1",
    name: "Cafe Oranit",
    category: "Food & Drink",
    description: "Cozy neighborhood cafe serving fresh pastries and artisan coffee",
    logo: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=100&h=100&fit=crop",
    rating: 4.8,
    verified: true,
    location: "Main Street, Oranit",
  },
  {
    id: "2",
    name: "Green Thumb Gardening",
    category: "Home Services",
    description: "Professional landscaping and garden maintenance services",
    logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
    rating: 4.6,
    verified: true,
    location: "Oranit",
  },
  {
    id: "3",
    name: "Oranit Dental Clinic",
    category: "Health & Wellness",
    description: "Family dentistry with modern equipment and gentle care",
    logo: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&h=100&fit=crop",
    rating: 4.9,
    verified: true,
    location: "Medical Center, Oranit",
  },
];

const ExplorePage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("explore.title")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("explore.subtitle")}
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">{t("explore.categoriesTitle")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryTile
                key={category.slug}
                slug={category.slug}
                title={t(category.titleKey)}
                icon={category.icon}
                count={category.count}
              />
            ))}
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t("explore.featuredTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} {...business} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-primary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{t("explore.ctaTitle")}</h2>
            <p className="text-xl mb-8 opacity-90">{t("explore.ctaSubtitle")}</p>
            <Link to={`/${lang}/add-business`}>
              <Button size="lg" variant="hero">
                {t("explore.ctaButton")}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
