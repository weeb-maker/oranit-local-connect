/**
 * Bidirectional slug mapping for EN ↔ HE localization
 * Supports categories, businesses, and other route segments
 */

export const slugMap = {
  categories: {
    shops: "חנויות",
    food: "מסעדות",
    professional: "שירותים-מקצועיים",
    home: "שירותי-בית",
    wellness: "בריאות",
    mobility: "תחבורה",
    youth: "נוער",
    other: "אחר",
  },
  businesses: {
    "spring-bakery": "מאפיית-ספירנג",
  },
  routes: {
    explore: "עיון",
    search: "חיפוש",
    "add-business": "הוסף-עסק",
  },
} as const;

type SlugType = keyof typeof slugMap;

/**
 * Convert English slug to Hebrew
 */
export function toHeSlug(type: SlugType, enSlug: string): string {
  const map = slugMap[type] as Record<string, string>;
  return map[enSlug] || enSlug; // fallback to original if no translation
}

/**
 * Convert Hebrew slug to English
 */
export function toEnSlug(type: SlugType, heSlug: string): string {
  const map = slugMap[type] as Record<string, string>;
  // Reverse lookup
  const entry = Object.entries(map).find(([_, he]) => he === heSlug);
  return entry ? entry[0] : heSlug; // fallback to original if no translation
}

/**
 * Get slug in target locale
 */
export function getSlugInLocale(
  type: SlugType,
  slug: string,
  currentLocale: string,
  targetLocale: string
): string {
  if (currentLocale === targetLocale) return slug;

  if (targetLocale === "he") {
    return toHeSlug(type, slug);
  } else {
    return toEnSlug(type, slug);
  }
}

/**
 * Main function to switch locale path
 * Preserves route structure, maps slugs, keeps query params and hash
 */
export function switchLocalePath(
  currentPath: string,
  currentLocale: string,
  targetLocale: string
): string {
  // Parse URL
  const url = new URL(currentPath, window.location.origin);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  
  // First segment should be locale
  if (pathSegments[0] !== currentLocale) {
    // If no locale prefix, add target locale
    return `/${targetLocale}${url.pathname}${url.search}${url.hash}`;
  }

  // Replace locale
  pathSegments[0] = targetLocale;

  // Map slugs based on route type
  if (pathSegments.length >= 3) {
    const routeType = pathSegments[1]; // e.g., "category", "business", "explore"

    switch (routeType) {
      case "category":
        if (pathSegments[2]) {
          pathSegments[2] = getSlugInLocale(
            "categories",
            pathSegments[2],
            currentLocale,
            targetLocale
          );
        }
        break;

      case "business":
        if (pathSegments[2]) {
          pathSegments[2] = getSlugInLocale(
            "businesses",
            pathSegments[2],
            currentLocale,
            targetLocale
          );
        }
        break;

      default:
        // For other routes like /explore, /search, /add-business
        // Check if the route itself has a translation
        if (slugMap.routes[routeType as keyof typeof slugMap.routes]) {
          pathSegments[1] = getSlugInLocale(
            "routes",
            routeType,
            currentLocale,
            targetLocale
          );
        }
        break;
    }
  }

  // Reconstruct path with query and hash
  const newPath = `/${pathSegments.join("/")}${url.search}${url.hash}`;
  return newPath;
}
