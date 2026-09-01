/**
 * Next.js Robots Configuration supporting Dual Domains (.in & .com)
 * Automatically served at: /robots.txt
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/employee/',
          '/client/',
          '/newscreate',
          '/api/',
        ],
      },
    ],
    sitemap: [
      'https://inextets.in/sitemap.xml',
      'https://inextets.com/sitemap.xml',
    ],
  };
}
