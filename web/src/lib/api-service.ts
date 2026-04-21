import curatedApisData from './apilab-registry.json';

export interface PublicApi {
  id: string; // Slug for deep linking
  name: string;
  description: string;
  link: string;
  auth: string;
  https: string; 
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
 * Returns a flattened list of all curated industrial APIs.
 */
export const getFlattenedApis = (): PublicApi[] => {
  return [...curatedApis];
};

export const getApiCategories = (): ApiCategory[] => {
  const categoriesMap = curatedApis.reduce((acc, api) => {
    acc[api.category] = (acc[api.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoriesMap).map(([name, count]) => ({
    name,
    count
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
  return curatedApis.find(api => api.id === id);
};
