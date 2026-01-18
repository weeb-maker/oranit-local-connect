/**
 * @deprecated This file is maintained for backward compatibility.
 * Use the useCategories, useCategory, and useSubcategory hooks from
 * @/hooks/useCategories instead for database-backed categories.
 * 
 * The icon mapping is now in @/lib/iconMap.ts
 */

import { LucideIcon, MoreHorizontal } from "lucide-react";
import { getIcon, iconMap } from "@/lib/iconMap";

// Re-export types for backward compatibility
export interface Subcategory {
  slug: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

export interface Category {
  slug: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  subcategories?: Subcategory[];
}

// Empty config - categories are now fetched from database
export const categoryConfig: Record<string, Category> = {};

export type CategorySlug = string;

/**
 * @deprecated Use useCategory hook instead
 */
export const getCategoryConfig = (slug: string): Category => {
  console.warn(
    "getCategoryConfig is deprecated. Use useCategory hook from @/hooks/useCategories instead."
  );
  return {
    slug,
    icon: MoreHorizontal,
    titleKey: `categories:top.${slug}.title`,
    descriptionKey: `categories:top.${slug}.description`,
  };
};

/**
 * @deprecated Use useSubcategory hook instead
 */
export const getSubcategoryConfig = (
  categorySlug: string,
  subcategorySlug: string
): Subcategory | null => {
  console.warn(
    "getSubcategoryConfig is deprecated. Use useSubcategory hook from @/hooks/useCategories instead."
  );
  return null;
};

// Re-export icon utilities
export { getIcon, iconMap };

// Community Help & Youth Jobs tags - deprecated, now in database as category type
export const communityHelpTags = {
  titleKey: "tags.communityHelp.title",
  tags: [
    { slug: "babysitting", titleKey: "tags.communityHelp.babysitting" },
    { slug: "dog-walking", titleKey: "tags.communityHelp.dogWalking" },
    { slug: "tutoring", titleKey: "tags.communityHelp.tutoring" },
    { slug: "lawn-mowing", titleKey: "tags.communityHelp.lawnMowing" },
    { slug: "errands", titleKey: "tags.communityHelp.errands" },
  ],
};
