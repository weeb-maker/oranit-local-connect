/**
 * Normalizes Food & Drinks category key by removing spaces
 * This ensures both "אוכל ושתייה" and "אוכלושתייה" resolve to the same key
 */
export const normalizeFoodKey = (key: string): string => {
  return key.replace(/\s/g, '');
};

/**
 * Gets a top-level category i18n key with normalization
 * @param base - 'title' or 'description'
 * @param raw - raw category name (may include spaces)
 */
export const getTopKey = (base: 'title' | 'description', raw: string): string => {
  return `top.${normalizeFoodKey(raw)}.${base}`;
};
