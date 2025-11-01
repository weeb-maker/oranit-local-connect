import matter from 'gray-matter';

export interface HelpArticle {
  id: string;
  slug: string;
  slug_i18n: { en: string; he: string };
  lang: 'en' | 'he';
  category: string;
  title: string;
  excerpt: string;
  author: string;
  updatedAt: string;
  keywords: string[];
  related?: string[];
  faq?: Array<{ q: string; a: string }>;
  content: string;
  html: string;
  readingTime: number;
}

export interface CatalogItem {
  id: string;
  slug: string;
  lang: 'en' | 'he';
  title: string;
  excerpt: string;
  category: string;
  keywords: string[];
  updatedAt: string;
}

// Simple markdown to HTML converter (basic implementation)
const markdownToHtml = (markdown: string): string => {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  
  // Paragraphs
  html = html.split('\n\n').map(p => {
    if (!p.match(/^<[h|u|o|l]/)) {
      return `<p>${p}</p>`;
    }
    return p;
  }).join('\n');
  
  return html;
};

// Calculate reading time (words per minute)
const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Load and parse markdown file
export const loadArticle = async (slug: string, lang: 'en' | 'he'): Promise<HelpArticle | null> => {
  try {
    const response = await fetch(`/content/help/${lang}/${slug}.md`);
    if (!response.ok) return null;
    
    const fileContent = await response.text();
    const { data, content } = matter(fileContent);
    
    const html = markdownToHtml(content);
    const readingTime = calculateReadingTime(content);
    
    return {
      ...data,
      content,
      html,
      readingTime,
    } as HelpArticle;
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
};

// Load catalog for search
export const loadCatalog = async (lang: 'en' | 'he'): Promise<CatalogItem[]> => {
  try {
    const response = await fetch(`/content/help/catalog.${lang}.json`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Error loading catalog:', error);
    return [];
  }
};

// Client-side fuzzy search
export const searchArticles = (catalog: CatalogItem[], query: string): CatalogItem[] => {
  if (!query.trim()) return catalog;
  
  const normalizedQuery = query.toLowerCase();
  
  return catalog.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
    const excerptMatch = item.excerpt.toLowerCase().includes(normalizedQuery);
    const keywordsMatch = item.keywords.some(k => k.toLowerCase().includes(normalizedQuery));
    
    return titleMatch || excerptMatch || keywordsMatch;
  });
};

// Filter by category
export const filterByCategory = (catalog: CatalogItem[], category: string): CatalogItem[] => {
  if (!category) return catalog;
  return catalog.filter(item => item.category === category);
};

// Get category counts
export const getCategoryCounts = (catalog: CatalogItem[]): Record<string, number> => {
  return catalog.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};