/**
 * Bidirectional slug mapping for EN ↔ HE localization
 * Supports categories, subcategories, businesses, and other route segments
 */

export const slugMap = {
  categories: {
    "shops-retail": "חנויות-וקמעונאות",
    "food-drink": "אוכל-ושתייה",
    "professional-services": "שירותים-מקצועיים",
    "home-repairs": "בית-ותיקונים",
    "wellness-care": "בריאות-ורווחה",
    "mobility-transport": "ניידות-ותחבורה",
    "youth-services": "שירותי-נוער",
    "other-services": "שירותים-נוספים",
  },
  subcategories: {
    // Shops & Retail
    "clothing-fashion": "אופנה-וביגוד",
    "home-goods-furniture": "רהיטים-ומוצרי-בית",
    "electronics-appliances": "אלקטרוניקה-והמכשירים",
    "books-stationery-gifts": "ספרים-כלי-כתיבה-ומתנות",
    "beauty-cosmetics": "יופי-וקוסמטיקה",
    "sports-outdoor-equipment": "ציוד-ספורט-ואאוטדור",
    "specialty-boutique-stores": "חנויות-יוקרה-ובוטיק",
    
    // Food & Drink
    "restaurants": "מסעדות",
    "cafes-coffee-shops": "בתי-קפה",
    "takeaway-delivery": "טייק-אווי-ומשלוחים",
    "bakeries-patisseries": "מאפיות-ומזון-אפוי",
    "bars-pubs": "ברים-ומועדונים",
    "grocery-stores-markets": "חנויות-מכולת-ושווקים",
    "food-trucks-street-food": "משאיות-מזון-ואוכל-רחוב",
    
    // Professional Services
    "legal-notary": "משפטי-ונוטריון",
    "accounting-tax-services": "הנהלת-חשבונות-ושירותי-מס",
    "marketing-digital-agencies": "שיווק-וסוכנויות-דיגיטל",
    "it-software-services": "שירותי-IT-ותוכנה",
    "consulting-advisory": "ייעוץ-ושירותי-ייעוץ",
    "architecture-engineering": "אדריכלות-והנדסה",
    "recruitment-hr": "גיוס-ומשאבי-אנוש",
    
    // Home & Repairs
    "general-contractors-builders": "קבלני-כללי-ובוני-מבנים",
    "plumbing-heating": "אינסטלציה-וחימום",
    "electrical-services": "שירותים-חשמליים",
    "painting-decorating": "צביעה-וקישוט-פנים",
    "home-cleaning-maintenance": "ניקוי-ותחזוקת-בית",
    "landscaping-garden-services": "שירותי-גינון-ונוף",
    "handyman-odd-jobs": "שירותים-כלליים-ושיפוצים-קטנים",
    
    // Wellness & Care
    "medical-clinics-specialists": "מרפאות-ומומחים",
    "dental-services": "שירותי-שיניים",
    "physical-therapy-rehabilitation": "פיזיותרפיה-ושיקום",
    "fitness-personal-training": "כושר-ואימון-אישי",
    "beauty-spa": "יופי-וספא",
    "childcare-elder-care": "טיפול-בילדים-וקשישים",
    "mental-health-counselling": "בריאות-נפש-וייעוץ",
    
    // Mobility & Transport
    "car-rental-sharing": "השכרת-רכב-ושיתופיות",
    "taxi-private-hire": "מוניות-והשכרה-פרטית",
    "bike-scooter-rental": "השכרת-אופניים-וקטנועים",
    "auto-repair-servicing": "תיקון-רכב-ושירותים",
    "moving-relocation-services": "שירותי-הובלה-והתקנה",
    "public-transport-shuttle": "תחבורה-ציבורית-ושאטלים",
    
    // Youth Services
    "after-school-activities-clubs": "פעילויות-ואגודות-חוץ-לימודיות",
    "youth-sports-recreation": "ספורט-ופנאי-לנוער",
    "tutors-learning-centres": "לימוד-ומרכזי-הדרכה",
    "childcare-playgroups": "טיפול-ילדים-וקבוצות-משחק",
    "youth-counselling-support": "ייעוץ-ותמיכה-לנוער",
    "kids-parties-events": "מסיבות-ואירועים-לילדים",
    
    // Other Services
    "event-planning-catering": "תכנון-אירועים-וקייטרינג",
    "photography-videography": "צילום-ווידאו",
    "pet-services-grooming": "שירותי-חיות-מחמד-וטיפוח",
    "travel-tourism-services": "שירותי-תיירות",
    "nonprofit-community-organisations": "ארגונים-ללא-רווח-וקהילה",
    "miscellaneous-general-services": "שירותים-כלליים-מגוונים",
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
        // Map category slug
        if (pathSegments[2]) {
          pathSegments[2] = getSlugInLocale(
            "categories",
            pathSegments[2],
            currentLocale,
            targetLocale
          );
        }
        // Map subcategory slug if present
        if (pathSegments[3]) {
          pathSegments[3] = getSlugInLocale(
            "subcategories",
            pathSegments[3],
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
