# Internationalization (i18n) Guide for Oranit.biz

## Overview

This project uses **i18next** with React for internationalization. We support **English (en)** and **Hebrew (he)** locales with RTL (right-to-left) support for Hebrew.

## File Structure

```
src/i18n/
├── config.ts                    # i18n configuration
└── locales/
    ├── en/
    │   ├── common.json          # Common UI strings (navigation, buttons, footer, etc.)
    │   ├── categories.json      # Business category names and descriptions
    │   └── specials.json        # Local deals and specials content
    └── he/
        ├── common.json          # Hebrew translations for common UI
        ├── categories.json      # Hebrew business categories
        └── specials.json        # Hebrew deals and specials
```

## Namespaces

We use three namespaces to organize translations:

1. **common** (default): General UI elements, navigation, buttons, forms
2. **categories**: All business category and subcategory names/descriptions
3. **specials**: Local deals and promotional content

## Usage in Components

### Basic Usage (Common namespace)

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation(); // Defaults to 'common' namespace
  
  return <button>{t('buttons.viewAll')}</button>;
}
```

### Using Multiple Namespaces

```tsx
import { useTranslation } from 'react-i18next';

function CategoryPage() {
  const { t } = useTranslation(['common', 'categories']);
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>  {/* from common */}
      <h2>{t('shopsRetail.title', { ns: 'categories' })}</h2>  {/* from categories */}
    </div>
  );
}
```

### Getting Current Language

```tsx
import { useParams } from 'react-router-dom';

function MyComponent() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'he'; // Default to Hebrew
  
  return <div dir={currentLang === 'he' ? 'rtl' : 'ltr'}>...</div>;
}
```

## Adding New Translations

### 1. Add to Common Strings

For buttons, labels, or general UI text:

**English** (`src/i18n/locales/en/common.json`):
```json
{
  "buttons": {
    "newButton": "Click Me"
  }
}
```

**Hebrew** (`src/i18n/locales/he/common.json`):
```json
{
  "buttons": {
    "newButton": "לחץ עלי"
  }
}
```

### 2. Add New Categories

**English** (`src/i18n/locales/en/categories.json`):
```json
{
  "newCategory": {
    "title": "New Category",
    "description": "Category description",
    "subcategories": {
      "subcat1": {
        "title": "Subcategory Name",
        "description": "Subcategory description"
      }
    }
  }
}
```

**Hebrew** (`src/i18n/locales/he/categories.json`):
```json
{
  "newCategory": {
    "title": "קטגוריה חדשה",
    "description": "תיאור הקטגוריה",
    "subcategories": {
      "subcat1": {
        "title": "שם תת-קטגוריה",
        "description": "תיאור תת-קטגוריה"
      }
    }
  }
}
```

### 3. Add New Specials/Deals

**English** (`src/i18n/locales/en/specials.json`):
```json
{
  "cards": [
    {
      "category": "Food & Drink",
      "businessName": "New Restaurant",
      "offer": "20% off dinner",
      "validUntil": "2025-12-31"
    }
  ]
}
```

**Hebrew** (`src/i18n/locales/he/specials.json`):
```json
{
  "cards": [
    {
      "category": "אוכל ושתייה",
      "businessName": "מסעדה חדשה",
      "offer": "20% הנחה על ארוחת ערב",
      "validUntil": "2025-12-31"
    }
  ]
}
```

## Date Formatting

For locale-aware date formatting:

```tsx
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(currentLang === 'he' ? 'he-IL' : 'en-US', {
    dateStyle: 'medium',
  }).format(date);
};
```

**Output:**
- EN: "Dec 31, 2025"
- HE: "‎31 בדצמ׳ ‎2025"

## RTL Support

For RTL layout in Hebrew:

```tsx
<div dir={currentLang === 'he' ? 'rtl' : 'ltr'}>
  {/* Content */}
</div>
```

For directional icons/arrows:

```tsx
<Button>
  {lang === 'he' ? '→' : '←'} {t('buttons.back')}
</Button>
```

## Fallback Behavior

- **Primary language:** Hebrew (he)
- **Fallback language:** English (en)
- **Missing keys:** Logged to console in development mode
- If a Hebrew key is missing, the English value is displayed automatically

## Language Switching

The language is detected from the URL path:
- `/en/...` - English
- `/he/...` - Hebrew

The language switcher should:
1. Keep the user on the same page
2. Swap the locale slug in the URL
3. Use localized slugs for categories (e.g., `/en/category/shops-retail` ↔ `/he/category/חנויות-וקמעונאות`)

## Testing Translations

1. **Check for missing keys:** Run the app in development mode and watch the console
2. **Test both locales:** Navigate to `/en` and `/he` routes
3. **Test RTL layout:** Ensure Hebrew pages display correctly with right-aligned text
4. **Test language switcher:** Verify it preserves the current page/category
5. **Test dates:** Verify dates format correctly in both languages

## Best Practices

1. **Never hardcode text** - Always use `t()` function
2. **Keep keys semantic** - Use descriptive keys like `buttons.submit` not `btn1`
3. **Group related keys** - Organize translations logically
4. **Add both locales** - Always add translations for both EN and HE
5. **Use namespaces** - Keep translation files focused and manageable
6. **Test RTL** - Always verify Hebrew layout and text direction
7. **Log missing keys** - Enable debug mode during development

## Common Patterns

### Category Titles
```tsx
const categoryTitle = t(categoryConfig.titleKey, { ns: 'categories' });
```

### Breadcrumbs
```tsx
<BreadcrumbLink href={`/${lang}`}>{t('breadcrumbs.home')}</BreadcrumbLink>
```

### Buttons
```tsx
<Button>{t('buttons.viewDetails')}</Button>
```

### Navigation
```tsx
<Link to={`/${lang}/explore`}>{t('nav.businesses')}</Link>
```

## Troubleshooting

**Problem:** Seeing raw keys like `categories.shopsRetail.title`
- **Solution:** Make sure you're using the correct namespace: `t('shopsRetail.title', { ns: 'categories' })`

**Problem:** English text showing in Hebrew pages
- **Solution:** Check that Hebrew translations exist in the correct file and that the language parameter is being read correctly

**Problem:** Layout issues in Hebrew
- **Solution:** Ensure `dir="rtl"` is set on the container element

**Problem:** Dates not formatted correctly
- **Solution:** Use `Intl.DateTimeFormat` with the correct locale (`he-IL` or `en-US`)

---

For more information about i18next, visit: https://www.i18next.com/
