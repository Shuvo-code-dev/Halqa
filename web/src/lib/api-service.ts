import publicApisData from './public_apis.json';

export interface PublicApi {
  id: string; // Slug for deep linking
  name: string;
  description: string;
  link: string;
  auth: string;
  https: boolean;
  cors: string;
  category: string;
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

export const getFlattenedApis = (): PublicApi[] => {
  const flattened: PublicApi[] = [];
  const usedSlugs = new Map<string, number>();
  
  data.categories.forEach((category: RawCategory) => {
    category.apis.forEach((api: RawApi) => {
      // Create a unique slug: lowercased name + category
      const baseSlug = `${api.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      let finalSlug = baseSlug;
      const count = usedSlugs.get(baseSlug) || 0;
      
      if (count > 0) {
        finalSlug = `${baseSlug}-${count}`;
      }
      
      usedSlugs.set(baseSlug, count + 1);
      
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

// Search & Filter Logic (Client-friendly)
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
  const all = getFlattenedApis();
  return all.find(api => api.id === id);
};
