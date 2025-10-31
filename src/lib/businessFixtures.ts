/**
 * Business fixtures loader
 * Loads locale-specific business examples for category pages
 */

interface Business {
  id: string;
  name: string;
  category: string;
  subcategoryKey: string;
  description: string;
  logo: string;
  rating: number;
  verified: boolean;
  location: string;
}

interface BusinessFixtures {
  businesses: Business[];
}

/**
 * Load business fixtures for a category in the given locale
 * @param categorySlug - The category slug (e.g., "home-repairs", "other-services")
 * @param locale - The locale ("en" or "he")
 * @returns Promise resolving to business fixtures or null if not found
 */
export async function loadBusinessFixtures(
  categorySlug: string,
  locale: string
): Promise<Business[]> {
  try {
    const fixtures = await import(
      `../data/fixtures/${locale}/businesses-${categorySlug}.json`
    );
    return fixtures.businesses || [];
  } catch (error) {
    console.warn(
      `No business fixtures found for category "${categorySlug}" in locale "${locale}"`
    );
    return [];
  }
}

/**
 * Convert slug to camelCase key for i18n lookups
 * @param slug - kebab-case slug (e.g., "home-repairs")
 * @returns camelCase key (e.g., "homeRepairs")
 */
export function slugToCamelCase(slug: string): string {
  return slug
    .split("-")
    .map((part, index) =>
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join("");
}
