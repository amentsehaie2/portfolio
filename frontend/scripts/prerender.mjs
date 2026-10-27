// Post-build step: writes static HTML for /blog, every post and the 404 page, plus sitemap.xml.
// Run after `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { getPrerenderRoutes, siteUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const routes = getPrerenderRoutes();

const warn = (message) => console.warn(`  WARN ${message}`);

for (const route of routes) {
  const { seo } = route;
  if (seo.title.length > 60) warn(`${route.path}: title is ${seo.title.length} chars (max 60)`);
  if (seo.description.length > 155) warn(`${route.path}: description is ${seo.description.length} chars (max 155)`);
  const h1Count = (route.html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) warn(`${route.path}: expected exactly one <h1>, found ${h1Count}`);

  let page = template
    .replace(/<title>[\s\S]*?<\/title>/, route.headHtml)
    .replace('<div id="root"></div>', () => `<div id="root">${route.html}</div>`);
  if (page === template) throw new Error(`Template markers not found for ${route.path}`);

  const file = route.path === '/404' ? path.join(dist, '404.html') : path.join(dist, route.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log(`prerendered ${route.path}`);
}

const urls = [
  { loc: `${siteUrl}/` },
  ...routes.filter((r) => r.path !== '/404').map((r) => ({ loc: `${siteUrl}${r.path}`, lastmod: r.lastmod })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`)
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');

await rm(ssrDir, { recursive: true, force: true });
