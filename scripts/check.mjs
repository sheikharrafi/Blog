import { readFile } from 'node:fs/promises';

const requiredFiles = ['public/index.html', 'public/styles.css', 'public/app.js', 'supabase/schema.sql'];
for (const file of requiredFiles) {
  const content = await readFile(file, 'utf8');
  if (!content.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const app = await readFile('public/app.js', 'utf8');
if (!app.includes('/rest/v1/posts') || !app.includes('BLOG_SUPABASE_URL')) {
  throw new Error('Supabase REST integration is missing from public/app.js');
}

console.log('Static files and Supabase integration checks passed.');
