/**
 * REGISTRY SERVICE
 * -----------------
 * This service manages the discovery and retrieval of 500+ animated components.
 * It groups variants (JS/TS, CSS/Tailwind) under unique titles and allows 
 * on-demand fetching of component source code.
 */

import registryData from './registry/registry.json';

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: {
    type: string;
    path: string;
    content?: string;
  }[];
}

export interface ComponentGroup {
  title: string;
  description: string;
  variants: {
    id: string; // e.g. ASCIIText-TS-TW
    language: 'JS' | 'TS';
    styling: 'CSS' | 'TW';
  }[];
}

const ITEMS = (registryData as unknown as { items: RegistryItem[] }).items;

// Helper to extract variants from the flat registry
const getGroupedRegistry = (): ComponentGroup[] => {
  const groups: Record<string, ComponentGroup> = {};

  ITEMS.forEach((item) => {
    if (!groups[item.title]) {
      groups[item.title] = {
        title: item.title,
        description: item.description,
        variants: []
      };
    }

    // Determine language and styling from the item name (e.g., Component-TS-TW)
    const parts = item.name.split('-');
    const stylingPart = parts[parts.length - 1]; // TW or CSS
    const langPart = parts[parts.length - 2];    // JS or TS

    if ((langPart === 'JS' || langPart === 'TS') && stylingPart === 'CSS') {
      groups[item.title].variants.push({
        id: item.name,
        language: langPart as 'JS' | 'TS',
        styling: 'CSS'
      });
    }
  });

  return Object.values(groups).sort((a, b) => a.title.localeCompare(b.title));
};

export const REGISTRY_GROUPS = getGroupedRegistry();

/**
 * Dynamically imports a component's JSON file to get its content (source code, styles, etc.)
 */
export const getComponentVariantData = async (variantId: string): Promise<RegistryItem | null> => {
  try {
    // Dynamic import of the specific JSON file containing the source code
    const data = await import(`./registry/${variantId}.json`);
    return data.default as RegistryItem;
  } catch (error) {
    console.error(`Failed to load registry variant: ${variantId}`, error);
    return null;
  }
};

/**
 * Search the registry by title or description
 */
export const searchRegistry = (query: string): ComponentGroup[] => {
  const lowerQuery = query.toLowerCase();
  return REGISTRY_GROUPS.filter(group => 
    group.title.toLowerCase().includes(lowerQuery) || 
    group.description.toLowerCase().includes(lowerQuery)
  );
};
