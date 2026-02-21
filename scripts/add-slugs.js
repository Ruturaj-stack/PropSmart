const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'public', 'properties.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')        // Trim - from start of text
    .replace(/-+$/, '');       // Trim - from end of text
};

data.forEach(p => {
  const baseSlug = slugify(`${p.title}-${p.location}`);
  // If IDs are short/clean, keep them for uniqueness if needed, 
  // but let's try just title-location first for "perfection".
  // If there are collisions, we might need a small suffix.
  p.slug = baseSlug;
});

// Check for collisions and add numeric suffix if needed
const slugs = {};
data.forEach(p => {
  if (slugs[p.slug]) {
    let i = 1;
    const originalSlug = p.slug;
    while (slugs[`${originalSlug}-${i}`]) {
      i++;
    }
    p.slug = `${originalSlug}-${i}`;
  }
  slugs[p.slug] = true;
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log(`Updated ${data.length} properties with unique slugs.`);
