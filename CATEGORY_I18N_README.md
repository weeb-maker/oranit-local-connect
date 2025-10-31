# Category Page Internationalization (i18n) Guide

## Overview

This guide explains how category pages are localized in Oranit.biz, including category titles, descriptions, subcategories, and example businesses.

## File Structure

```
src/
├── i18n/
│   └── locales/
│       ├── en/
│       │   ├── common.json          # Common UI strings
│       │   └── categories.json      # Category/subcategory translations
│       └── he/
│           ├── common.json
│           └── categories.json
├── data/
│   └── fixtures/
│       ├── en/
│       │   ├── businesses-home-repairs.json      # Example businesses (EN)
│       │   ├── businesses-other-services.json
│       │   └── ...
│       └── he/
│           ├── businesses-home-repairs.json      # Example businesses (HE)
│           ├── businesses-other-services.json
│           └── ...
└── lib/
    ├── categoryConfig.ts            # Category structure & icons
    ├── slugMap.ts                   # EN ↔ HE slug mapping
    └── businessFixtures.ts          # Business fixture loader
```

## How It Works

### 1. Category Structure

Categories are defined in `src/lib/categoryConfig.ts` with:
- **Slugs**: URL-friendly identifiers (e.g., `home-repairs`, `other-services`)
- **Icons**: Lucide React icons
- **Title/Description Keys**: i18n keys pointing to translations

### 2. Slug to Key Conversion

URL slugs use kebab-case (e.g., `home-repairs`), but i18n keys use camelCase (e.g., `homeRepairs`).

The helper function `slugToCamelCase()` converts:
- `home-repairs` → `homeRepairs`
- `other-services` → `otherServices`

### 3. Translation Keys

#### Top-Level Categories

Located in `categories.json`:

```json
{
  "top": {
    "homeRepairs": {
      "title": "Home & Repairs",
      "description": "Trades, maintenance, and home services"
    },
    "otherServices": {
      "title": "Other Services", 
      "description": "Events, pets, travel, and general services"
    }
  }
}
```

**Usage in CategoryPage.tsx:**
```tsx
const categoryKey = slugToCamelCase(slug); // "home-repairs" → "homeRepairs"
const title = t(`categories:top.${categoryKey}.title`);
const description = t(`categories:top.${categoryKey}.description`);
```

#### Subcategories

Subcategory translations are nested under their parent category:

```json
{
  "shopsRetail": {
    "title": "Shops & Retail",
    "description": "...",
    "subcategories": {
      "clothingFashion": {
        "title": "Clothing & Fashion",
        "description": "Fashion stores and boutiques"
      }
    }
  }
}
```

### 4. Localized Business Fixtures

Example businesses for each category are stored as JSON files per locale:

**English:** `src/data/fixtures/en/businesses-home-repairs.json`
```json
{
  "businesses": [
    {
      "id": "1",
      "name": "Oranit Plumbing Pro",
      "category": "Home & Repairs",
      "subcategoryKey": "plumbingHeating",
      "description": "Expert plumbing and heating services...",
      "logo": "...",
      "rating": 4.9,
      "verified": true,
      "location": "Central Oranit"
    }
  ]
}
```

**Hebrew:** `src/data/fixtures/he/businesses-home-repairs.json`
```json
{
  "businesses": [
    {
      "id": "1",
      "name": "אינסטלציה פרו אורנית",
      "category": "בית ותיקונים",
      "subcategoryKey": "plumbingHeating",
      "description": "שירותי אינסטלציה וחימום מומחים...",
      "logo": "...",
      "rating": 4.9,
      "verified": true,
      "location": "מרכז אורנית"
    }
  ]
}
```

## Adding a New Category

### Step 1: Update `categoryConfig.ts`

Add your category to the config:

```typescript
"new-category": {
  slug: "new-category",
  icon: YourIcon,
  titleKey: "categories.newCategory.title",
  descriptionKey: "categories.newCategory.description",
  subcategories: [
    {
      slug: "sub-one",
      icon: SubIcon,
      titleKey: "categories.newCategory.subcategories.subOne.title",
      descriptionKey: "categories.newCategory.subcategories.subOne.description",
    }
  ]
}
```

### Step 2: Add Translations

**English** (`src/i18n/locales/en/categories.json`):
```json
{
  "top": {
    "newCategory": {
      "title": "New Category",
      "description": "Category description"
    }
  },
  "newCategory": {
    "title": "New Category",
    "description": "...",
    "subcategories": {
      "subOne": {
        "title": "Sub Category One",
        "description": "..."
      }
    }
  }
}
```

**Hebrew** (`src/i18n/locales/he/categories.json`):
```json
{
  "top": {
    "newCategory": {
      "title": "קטגוריה חדשה",
      "description": "תיאור הקטגוריה"
    }
  },
  "newCategory": {
    "title": "קטגוריה חדשה",
    "description": "...",
    "subcategories": {
      "subOne": {
        "title": "תת-קטגוריה אחת",
        "description": "..."
      }
    }
  }
}
```

### Step 3: Add Slug Mapping

Update `src/lib/slugMap.ts`:

```typescript
export const slugMap = {
  categories: {
    "new-category": "קטגוריה-חדשה",
    // ...
  },
  subcategories: {
    "sub-one": "תת-אחת",
    // ...
  }
}
```

### Step 4: Create Business Fixtures

Create fixture files for both locales:

**English:** `src/data/fixtures/en/businesses-new-category.json`
**Hebrew:** `src/data/fixtures/he/businesses-new-category.json`

Follow the structure shown above with 3 example businesses.

## Adding Localized Example Businesses

To add new example businesses to an existing category:

1. Open the fixture file for your locale:
   - EN: `src/data/fixtures/en/businesses-{category-slug}.json`
   - HE: `src/data/fixtures/he/businesses-{category-slug}.json`

2. Add a new business object to the `businesses` array:

```json
{
  "id": "unique-id",
  "name": "Business Name (localized)",
  "category": "Category Name (localized)",
  "subcategoryKey": "subcategorySlug",
  "description": "Description in active locale",
  "logo": "image-url",
  "rating": 4.8,
  "verified": true,
  "location": "Location (localized)"
}
```

## Common Issues & Troubleshooting

### Raw Keys Showing Instead of Translations

**Problem:** You see `categories.homeRepairs.title` instead of "Home & Repairs"

**Solution:** Check that:
1. The key exists in both `en/categories.json` and `he/categories.json`
2. The namespace is specified: `t('categories:top.homeRepairs.title')`
3. The `categories` namespace is loaded in the component's `useTranslation(['common', 'categories'])`

### Wrong Locale Showing

**Problem:** Hebrew page shows English text

**Solution:** 
1. Verify the fixture file exists for that locale: `he/businesses-{slug}.json`
2. Check that the slug matches exactly (case-sensitive)
3. Ensure `i18n.language` or `lang` param is correctly set

### Language Switcher Not Working

**Problem:** Switching languages redirects to homepage

**Solution:** 
1. Verify slug mappings exist in `slugMap.ts` for both EN and HE
2. Check that `switchLocalePath()` is being used in the language switcher
3. Ensure category slugs in URLs match those in `slugMap.ts`

## Key Points

- **Always use i18n keys**, never hardcoded strings
- **Maintain both locales** when adding content
- **Test in both languages** after changes
- **Use semantic tokens** from the design system for styling
- **Keep fixture files consistent** between locales (same number of businesses)
- **Log missing keys in dev** for easy debugging

## Resources

- Main i18n docs: `I18N_README.md`
- Category config: `src/lib/categoryConfig.ts`
- Slug mappings: `src/lib/slugMap.ts`
- Business loader: `src/lib/businessFixtures.ts`
