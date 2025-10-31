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

export const categoryConfig = {
  shops: {
    slug: "shops",
    icon: ShoppingBag,
    titleKey: "categories.shops.title",
    descriptionKey: "categories.shops.description",
  },
  food: {
    slug: "food",
    icon: Utensils,
    titleKey: "categories.food.title",
    descriptionKey: "categories.food.description",
  },
  professional: {
    slug: "professional",
    icon: Briefcase,
    titleKey: "categories.professional.title",
    descriptionKey: "categories.professional.description",
  },
  home: {
    slug: "home",
    icon: Home,
    titleKey: "categories.home.title",
    descriptionKey: "categories.home.description",
  },
  wellness: {
    slug: "wellness",
    icon: Heart,
    titleKey: "categories.wellness.title",
    descriptionKey: "categories.wellness.description",
  },
  mobility: {
    slug: "mobility",
    icon: Car,
    titleKey: "categories.mobility.title",
    descriptionKey: "categories.mobility.description",
  },
  youth: {
    slug: "youth",
    icon: Users,
    titleKey: "categories.youth.title",
    descriptionKey: "categories.youth.description",
  },
  other: {
    slug: "other",
    icon: MoreHorizontal,
    titleKey: "categories.other.title",
    descriptionKey: "categories.other.description",
  },
} as const;

export type CategorySlug = keyof typeof categoryConfig;

export const getCategoryConfig = (slug: string) => {
  return categoryConfig[slug as CategorySlug] || categoryConfig.other;
};
