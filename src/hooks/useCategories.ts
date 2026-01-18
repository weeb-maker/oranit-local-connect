import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import { LucideIcon } from "lucide-react";

// Database category type from Supabase
export type CategoryType = "business" | "community_help" | "public_service" | "mixed";

// Category with resolved icon component
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: LucideIcon;
  iconKey: string | null;
  type: CategoryType;
  sortOrder: number;
  parentId: string | null;
  subcategories?: Category[];
}

// Raw category from database - using Json type for JSONB fields
interface RawCategory {
  id: string;
  slug: string;
  name: Record<string, string> | null;
  description: Record<string, string> | null;
  icon: string | null;
  type: CategoryType;
  sort_order: number;
  parent_id: string | null;
}

/**
 * Transform raw database category to frontend Category type
 */
const transformCategory = (raw: RawCategory, lang: string): Category => ({
  id: raw.id,
  slug: raw.slug,
  name: raw.name?.[lang] || raw.name?.en || raw.slug,
  description: raw.description?.[lang] || raw.description?.en || null,
  icon: getIcon(raw.icon),
  iconKey: raw.icon,
  type: raw.type,
  sortOrder: raw.sort_order,
  parentId: raw.parent_id,
});

/**
 * Fetch all categories with their subcategories
 */
export const useCategories = (lang: string = "en") => {
  return useQuery({
    queryKey: ["categories", lang],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      // Transform and organize into hierarchy
      const rawCategories = data as RawCategory[];
      const parents = rawCategories
        .filter((c) => c.parent_id === null)
        .map((c) => transformCategory(c, lang));

      // Attach subcategories to parents
      return parents.map((parent) => ({
        ...parent,
        subcategories: rawCategories
          .filter((c) => c.parent_id === parent.id)
          .map((c) => transformCategory(c, lang))
          .sort((a, b) => a.sortOrder - b.sortOrder),
      }));
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Fetch a single parent category by slug with its subcategories
 */
export const useCategory = (slug: string, lang: string = "en") => {
  return useQuery({
    queryKey: ["category", slug, lang],
    queryFn: async (): Promise<Category | null> => {
      // First get the parent category
      const { data: parentData, error: parentError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .is("parent_id", null)
        .maybeSingle();

      if (parentError) throw parentError;
      if (!parentData) return null;

      const parent = transformCategory(parentData as RawCategory, lang);

      // Then get its subcategories
      const { data: subData, error: subError } = await supabase
        .from("categories")
        .select("*")
        .eq("parent_id", parent.id)
        .order("sort_order", { ascending: true });

      if (subError) throw subError;

      return {
        ...parent,
        subcategories: (subData as RawCategory[]).map((c) => transformCategory(c, lang)),
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Fetch a subcategory by slug with its parent
 */
export const useSubcategory = (categorySlug: string, subcategorySlug: string, lang: string = "en") => {
  return useQuery({
    queryKey: ["subcategory", categorySlug, subcategorySlug, lang],
    queryFn: async (): Promise<{ category: Category; subcategory: Category } | null> => {
      // Get parent category
      const { data: parentData, error: parentError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", categorySlug)
        .is("parent_id", null)
        .maybeSingle();

      if (parentError) throw parentError;
      if (!parentData) return null;

      const parent = transformCategory(parentData as RawCategory, lang);

      // Get subcategory
      const { data: subData, error: subError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", subcategorySlug)
        .eq("parent_id", parent.id)
        .maybeSingle();

      if (subError) throw subError;
      if (!subData) return null;

      return {
        category: parent,
        subcategory: transformCategory(subData as RawCategory, lang),
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
