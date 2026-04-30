import { NextResponse } from 'next/server';

const BASE_URL = 'https://build-web-service-website.vercel.app';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/services', priority: '0.8', changefreq: 'weekly' },
  { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  { url: '/order', priority: '0.5', changefreq: 'monthly' },
  { url: '/blog/pourquoi-creer-un-site-web-en-algerie', priority: '0.6', changefreq: 'monthly' },
];

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
