const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'public', 'properties.json');
try {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     
      .replace(/[^\w-]+/g, '')   
      .replace(/--+/g, '-')      
      .replace(/^-+/, '')        
      .replace(/-+$/, '');       
  };

  data.forEach(p => {
    const baseSlug = slugify(`${p.title}-${p.location}`);
    p.slug = baseSlug;
  });

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
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
