import axios from 'axios';
import fs from 'fs';
import path from 'path';

const FREE_FOR_DEV_URL = 'https://raw.githubusercontent.com/ripienaar/free-for-dev/master/README.md';

interface Resource {
  id: string;
  name: string;
  url: string;
  category: string;
  recommendation: string;
  tier: 'Free' | 'Freemium' | 'Paid';
}

/**
 * Normalizes category names into Halqa taxonomy
 */
const normalizeCategory = (raw: string): string => {
  const c = raw.toLowerCase();
  if (c.includes('design') || c.includes('photo') || c.includes('icon') || c.includes('font')) return 'Design Tools';
  if (c.includes('learn') || c.includes('book') || c.includes('course') || c.includes('tutorial')) return 'Learning Hubs';
  if (c.includes('cloud') || c.includes('api') || c.includes('dev') || c.includes('test') || c.includes('tool')) return 'Dev Utilities';
  return 'General Resources';
};

async function sync() {
  console.log('--- HALQA RESOURCE SYNC START ---');
  const allResources: Resource[] = [];

  try {
    // 1. Fetch Free-for-dev
    console.log('Fetching Free-for-dev...');
    const { data: ffdText } = await axios.get(FREE_FOR_DEV_URL);
    
    // Parse Markdown Sections
    // Splitting by '## ' because major categories are at that level usually, 
    // but sometimes '### '. We'll try to catch both.
    const sections = ffdText.split(/\n##+\s+/);
    sections.shift(); // Remove intro

    sections.forEach((section: string) => {
      const lines = section.split('\n');
      const rawCategory = lines.shift() || 'General';
      const category = normalizeCategory(rawCategory);
      
      lines.forEach(line => {
        // More flexible Match Pattern: - [Name](URL) - Description.
        const match = line.trim().match(/^[*-]\s+\[(.*?)\]\((.*?)\)\s+-\s+(.*)$/);
        if (match) {
          allResources.push({
            id: `ffd-${allResources.length}`,
            name: match[1],
            url: match[2],
            category,
            recommendation: match[3],
            tier: 'Freemium'
          });
        }
      });
    });

    console.log(`Parsed ${allResources.length} items from Free-for-dev.`);

    // 2. Limit to Top 500 for initial launch as requested
    const finalResources = allResources.slice(0, 500);

    // 3. Save to registry
    const outPath = path.join(process.cwd(), 'src/lib/global-tools-registry.json');
    fs.writeFileSync(outPath, JSON.stringify(finalResources, null, 2));

    console.log(`Successfully generated registry at ${outPath}`);
    console.log(`Total Resources: ${finalResources.length}`);

  } catch (error) {
    console.error('Sync failed:', error);
  }
}

sync();
