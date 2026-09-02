import { BASE_URL } from '@/config/api';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

/**
 * Custom Next.js Route Handler for /sitemap.xml
 * Supports dual-domain multi-language alternates (inextets.in & inextets.com)
 * and resolves the conflict with the /sitemap visual UI page.
 */
export async function GET() {
  const domains = [
    'https://inextets.in',
    'https://inextets.com',
  ];

  // Core Static Marketing & Company Pages
  const staticPathConfigs = [
    { path: '', priority: '1.0', changeFrequency: 'daily' },
    { path: '/about', priority: '0.9', changeFrequency: 'monthly' },
    { path: '/service', priority: '0.9', changeFrequency: 'weekly' },
    { path: '/portfolio', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/news', priority: '0.85', changeFrequency: 'daily' },
    { path: '/career', priority: '0.8', changeFrequency: 'weekly' },
    { path: '/apply', priority: '0.7', changeFrequency: 'monthly' },
    { path: '/contact', priority: '0.9', changeFrequency: 'monthly' },
    { path: '/support', priority: '0.7', changeFrequency: 'monthly' },
    { path: '/workinfo', priority: '0.75', changeFrequency: 'monthly' },
    { path: '/prework', priority: '0.7', changeFrequency: 'monthly' },
    { path: '/investment-policy-advisory', priority: '0.8', changeFrequency: 'monthly' },
    { path: '/sitemap', priority: '0.7', changeFrequency: 'weekly' },

    // Digital Marketing & Growth Services
    { path: '/social-media-marketing', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/digital-marketing', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/lead-generation', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/business-growth-package', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/seomarket', priority: '0.85', changeFrequency: 'weekly' },

    // Web & Software Development Services
    { path: '/web-development', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/mobile-app-development', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/webAppDevelopment', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/softwaredev', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/cmsdev', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/ecomdev', priority: '0.85', changeFrequency: 'weekly' },

    // Design & UI/UX Services
    { path: '/webdesign', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/uiuxdesign', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/productdesign', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/brandidentity', priority: '0.85', changeFrequency: 'weekly' },

    // Emerging Technology & Security Services
    { path: '/ai-services', priority: '0.85', changeFrequency: 'weekly' },
    { path: '/cyber-security', priority: '0.85', changeFrequency: 'weekly' },

    // Legal & Policy Pages
    { path: '/privacy-policy', priority: '0.4', changeFrequency: 'yearly' },
    { path: '/terms-conditions', priority: '0.4', changeFrequency: 'yearly' },
  ];

  // Dynamically fetch published blog articles
  let blogSlugs = [];
  try {
    const res = await fetch(`${BASE_URL}/blog/getAll`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs)) {
        blogSlugs = data.blogs
          .filter((blog) => !blog.noIndex && blog.published !== false && blog.slug)
          .map((blog) => ({
            path: `/news/${blog.slug}`,
            lastModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
            priority: '0.7',
            changeFrequency: 'weekly',
          }));
      }
    }
  } catch (error) {
    console.warn('Dual-domain dynamic blog fetch fallback:', error.message);
  }

  const nowIso = new Date().toISOString();
  const allRouteConfigs = [
    ...staticPathConfigs.map((cfg) => ({
      ...cfg,
      lastModified: nowIso,
    })),
    ...blogSlugs,
  ];

  // Build valid XML
  const urlsXml = domains
    .map((domain) =>
      allRouteConfigs
        .map((route) => {
          return `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${route.lastModified || nowIso}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="https://inextets.in${route.path}" />
    <xhtml:link rel="alternate" hreflang="en-US" href="https://inextets.com${route.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://inextets.in${route.path}" />
  </url>`;
        })
        .join('\n')
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
