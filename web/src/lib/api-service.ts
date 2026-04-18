import publicApisData from './public_apis.json';
import curatedApisData from './apilab-registry.json';
import { slugify } from './utils';

export interface PublicApi {
  id: string; // Slug for deep linking
  name: string;
  description: string;
  link: string;
  auth: string;
  https: boolean | string; // Handle both boolean from public and string from curated
  cors: string;
  category: string;
  endpoint?: string;
  method?: string;
  schema?: string;
  docsUrl?: string;
}

export interface ApiCategory {
  name: string;
  count: number;
}

interface RawApi {
  name: string;
  description: string;
  link: string;
  auth: string;
  https: boolean;
  cors: string;
}

interface RawCategory {
  name: string;
  count: number;
  apis: RawApi[];
}

interface RawData {
  total_categories: number;
  total_apis: number;
  categories: RawCategory[];
}

const data = publicApisData as unknown as RawData;

/**
 * Interface representing the structure of curated registry items
 */
interface CuratedApiSource {
  id: string;
  category: string;
  name: string;
  method?: string;
  description: string;
  auth: string;
  https: string;
  cors: string;
  endpoint?: string;
  docsUrl?: string;
  schema?: string;
}

// Map curated data to PublicApi interface shape with strict typing
const curatedApis: PublicApi[] = (curatedApisData as CuratedApiSource[]).map(api => ({
    ...api,
    link: api.endpoint || api.docsUrl || '#',
    https: api.https || 'Yes',
    cors: api.cors || 'Unknown'
}));

/**
 * Returns a flattened list of all APIs, including curated ones prioritized first.
 */
export const getFlattenedApis = (): PublicApi[] => {
  const flattened: PublicApi[] = [...curatedApis];
  const usedSlugs = new Set<string>(curatedApis.map(a => a.id));
  
  data.categories.forEach((category: RawCategory) => {
    category.apis.forEach((api: RawApi) => {
      const baseSlug = `${slugify(api.name)}-${slugify(category.name)}`;
      
      let finalSlug = baseSlug;
      let counter = 1;
      
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      usedSlugs.add(finalSlug);
      
      flattened.push({
        ...api,
        id: finalSlug,
        category: category.name
      });
    });
  });
  
  return flattened;
};

export const getApiCategories = (): ApiCategory[] => {
  return data.categories.map((cat: RawCategory) => ({
    name: cat.name,
    count: cat.count
  }));
};

// Search & Filter Logic 
export const filterApis = (
  apis: PublicApi[],
  searchTerm: string,
  category: string
) => {
  const lowerSearch = searchTerm.toLowerCase();
  return apis.filter(api => {
    const matchesCategory = category === 'All' || api.category === category;
    const matchesSearch = 
      api.name.toLowerCase().includes(lowerSearch) || 
      api.description.toLowerCase().includes(lowerSearch);
    
    return matchesCategory && matchesSearch;
  });
};

export const getApiById = (id: string): PublicApi | undefined => {
  // First check curated, then flattened
  const curated = curatedApis.find(api => api.id === id);
  if (curated) return curated;
  
  const all = getFlattenedApis();
  return all.find(api => api.id === id);
};
