import fs from 'fs';
import path from 'path';

const REQUIRED_KEYS = [
  'top.אוכלושתייה.title',
  'top.אוכלושתייה.description',
  'top.אוכל ושתייה.title',
  'top.אוכל ושתייה.description',
];

function get(obj: any, dotted: string): string | undefined {
  return dotted.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
}

function load(locale: 'he' | 'en') {
  const categoriesPath = path.join(process.cwd(), 'src', 'i18n', 'locales', locale, 'categories.json');
  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  return categories;
}

describe('i18n dictionary integrity (Food & Drinks keys)', () => {
  (['he', 'en'] as const).forEach(locale => {
    test(`${locale}: required keys exist and are non-empty`, () => {
      const dict = load(locale);
      for (const key of REQUIRED_KEYS) {
        const v = get(dict, key);
        expect(v).toBeDefined();
        expect(String(v || '').trim()).not.toHaveLength(0);
      }
    });
  });
});
