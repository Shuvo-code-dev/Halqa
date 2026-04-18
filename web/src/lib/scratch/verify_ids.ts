import { getFlattenedApis } from '../api-service';

function verifyIds() {
  console.log("--- API ID Audit ---");
  const apis = getFlattenedApis();
  const ids = apis.map(a => a.id);
  const uniqueIds = new Set(ids);
  
  console.log(`Total APIs: ${apis.length}`);
  console.log(`Unique IDs: ${uniqueIds.size}`);
  
  if (ids.length !== uniqueIds.size) {
    console.error("COLISION DETECTED!");
    const seen = new Set();
    const duplicates = ids.filter(n => seen.size === seen.add(n).size);
    console.log("Duplicate IDs:", duplicates);
  } else {
    console.log("SUCCESS: All IDs are globally unique.");
  }
  console.log("--------------------");
}

verifyIds();
