# 🌐 I Next ETS — Dual-Domain Website Site Map & Route Architecture

> **Primary Regional Domain (India)**: [https://inextets.in](https://inextets.in)  
> **Global / International Domain**: [https://inextets.com](https://inextets.com)  
> **Dynamic XML Sitemap**: `/sitemap.xml` (Generates both `.in` and `.com` entries with hreflang alternates)  
> **Robots Directives**: `/robots.txt` (References both `.in` and `.com` sitemaps)  
> **Interactive HTML Directory**: `/sitemap` (With live domain switcher)

---

## 🗺️ Dual-Domain Architecture Overview

| Domain | Target Market | Canonical / Hreflang Tag | XML Sitemap Feed |
| :--- | :--- | :--- | :--- |
| **`https://inextets.in`** | India, Local Businesses, Regional Clients | `en-IN`, `x-default` | `https://inextets.in/sitemap.xml` |
| **`https://inextets.com`** | Worldwide, International Enterprise Clients, SaaS | `en-US` | `https://inextets.com/sitemap.xml` |

---

## 🌳 Visual Route Hierarchy

```
[https://inextets.in / https://inextets.com]
│
├── 🌟 Main & Company Hubs
│   ├── / .................................... Homepage
│   ├── /about ............................... About Us
│   ├── /service ............................. All Services Catalog
│   ├── /portfolio ........................... Client Case Studies & Projects
│   ├── /news ................................ News & Industry Insights
│   │   └── /news/[slug] ..................... Dynamic Blog Post Details
│   ├── /career .............................. Careers & Vacancies
│   ├── /apply ............................... Candidate Job Application Form
│   ├── /contact ............................. Contact Us & Office Location
│   ├── /support ............................. Customer Support Helpdesk
│   ├── /workinfo ............................ How We Work (Process & Milestones)
│   ├── /prework ............................. Pre-Work Questionnaire Intake
│   ├── /investment-policy-advisory .......... Tech Investment & Policy Advisory
│   └── /sitemap ............................. Visual Dual-Domain HTML Site Map
│
├── 🚀 Digital Marketing & Growth Services
│   ├── /social-media-marketing .............. Social Media Marketing (SMM)
│   ├── /digital-marketing ................... Digital Marketing & Inbound Growth
│   ├── /seomarket ........................... Search Engine Optimization (SEO)
│   ├── /lead-generation ..................... Lead Generation & Paid Advertising
│   └── /business-growth-package ............. Business Growth Package & Content
│
├── 💻 Web & Software Engineering
│   ├── /web-development ..................... Custom Website Development
│   ├── /webAppDevelopment ................... Web Application Development
│   ├── /mobile-app-development .............. iOS & Android Mobile Apps
│   ├── /softwaredev ......................... Custom Software & Enterprise ERP
│   ├── /cmsdev .............................. CMS & Headless Architecture
│   └── /ecomdev ............................. E-Commerce Development (Shopify/Custom)
│
├── 🎨 UI/UX & Creative Design
│   ├── /webdesign ........................... Modern Web Design & Layouts
│   ├── /uiuxdesign .......................... UI/UX Prototyping & Figma Systems
│   ├── /productdesign ....................... Digital Product Architecture & MVP
│   └── /brandidentity ....................... Corporate Branding & Guidelines
│
├── 🛡️ Emerging Tech & Cyber Security
│   ├── /ai-services ......................... Artificial Intelligence & Machine Learning
│   └── /cyber-security ...................... Penetration Testing & Data Security
│
├── ⚖️ Legal & Governance
│   ├── /privacy-policy ...................... Privacy Policy & GDPR Notice
│   └── /terms-conditions .................... Terms of Service & Contracts
│
└── 🔒 Protected System Portals (Non-Indexable / Auth Required)
    ├── /login ............................... Unified Login Gateway
    ├── /register ............................ Registration
    ├── /client/* ............................ Client Dashboard & Project Hub
    ├── /employee/* .......................... Employee Portal & Attendance Management
    └── /admin/* ............................. Master Admin Control Center
```

---

## 📊 Dual-Domain URL Inventory & Priority Matrix

| Route Path | Page Title | .IN Domain URL | .COM Domain URL | Priority | Change Frequency |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `/` | Home | `https://inextets.in/` | `https://inextets.com/` | `1.0` | Daily |
| `/about` | About Us | `https://inextets.in/about` | `https://inextets.com/about` | `0.90` | Monthly |
| `/service` | Services Hub | `https://inextets.in/service` | `https://inextets.com/service` | `0.90` | Weekly |
| `/portfolio` | Portfolio & Projects | `https://inextets.in/portfolio` | `https://inextets.com/portfolio` | `0.85` | Weekly |
| `/news` | News & Blog Updates | `https://inextets.in/news` | `https://inextets.com/news` | `0.85` | Daily |
| `/news/[slug]` | Single Blog Post | `https://inextets.in/news/[slug]` | `https://inextets.com/news/[slug]` | `0.70` | Weekly (Dynamic) |
| `/career` | Careers & Jobs | `https://inextets.in/career` | `https://inextets.com/career` | `0.80` | Weekly |
| `/apply` | Job Application | `https://inextets.in/apply` | `https://inextets.com/apply` | `0.70` | Monthly |
| `/contact` | Contact Us | `https://inextets.in/contact` | `https://inextets.com/contact` | `0.90` | Monthly |
| `/support` | Customer Support | `https://inextets.in/support` | `https://inextets.com/support` | `0.70` | Monthly |
| `/workinfo` | How We Work | `https://inextets.in/workinfo` | `https://inextets.com/workinfo` | `0.75` | Monthly |
| `/prework` | Pre-Work Intake | `https://inextets.in/prework` | `https://inextets.com/prework` | `0.70` | Monthly |
| `/investment-policy-advisory` | Investment Advisory | `https://inextets.in/investment-policy-advisory` | `https://inextets.com/investment-policy-advisory` | `0.80` | Monthly |
| `/sitemap` | HTML Site Map | `https://inextets.in/sitemap` | `https://inextets.com/sitemap` | `0.70` | Weekly |
| `/web-development` | Web Development | `https://inextets.in/web-development` | `https://inextets.com/web-development` | `0.85` | Weekly |
| `/mobile-app-development` | Mobile App Dev | `https://inextets.in/mobile-app-development` | `https://inextets.com/mobile-app-development` | `0.85` | Weekly |
| `/social-media-marketing` | Social Media Marketing | `https://inextets.in/social-media-marketing` | `https://inextets.com/social-media-marketing` | `0.85` | Weekly |
| `/digital-marketing` | Digital Marketing | `https://inextets.in/digital-marketing` | `https://inextets.com/digital-marketing` | `0.85` | Weekly |
| `/seomarket` | SEO Marketing | `https://inextets.in/seomarket` | `https://inextets.com/seomarket` | `0.85` | Weekly |
| `/lead-generation` | Lead Generation | `https://inextets.in/lead-generation` | `https://inextets.com/lead-generation` | `0.85` | Weekly |
| `/business-growth-package` | Growth Package | `https://inextets.in/business-growth-package` | `https://inextets.com/business-growth-package` | `0.85` | Weekly |
| `/ai-services` | AI & ML Services | `https://inextets.in/ai-services` | `https://inextets.com/ai-services` | `0.85` | Weekly |
| `/cyber-security` | Cyber Security | `https://inextets.in/cyber-security` | `https://inextets.com/cyber-security` | `0.85` | Weekly |
| `/webAppDevelopment` | Web App Development | `https://inextets.in/webAppDevelopment` | `https://inextets.com/webAppDevelopment` | `0.85` | Weekly |
| `/softwaredev` | Software Development | `https://inextets.in/softwaredev` | `https://inextets.com/softwaredev` | `0.85` | Weekly |
| `/cmsdev` | CMS Development | `https://inextets.in/cmsdev` | `https://inextets.com/cmsdev` | `0.85` | Weekly |
| `/ecomdev` | E-Commerce Development | `https://inextets.in/ecomdev` | `https://inextets.com/ecomdev` | `0.85` | Weekly |
| `/webdesign` | Web Design | `https://inextets.in/webdesign` | `https://inextets.com/webdesign` | `0.85` | Weekly |
| `/uiuxdesign` | UI/UX Design | `https://inextets.in/uiuxdesign` | `https://inextets.com/uiuxdesign` | `0.85` | Weekly |
| `/productdesign` | Product Design | `https://inextets.in/productdesign` | `https://inextets.com/productdesign` | `0.85` | Weekly |
| `/brandidentity` | Brand Identity | `https://inextets.in/brandidentity` | `https://inextets.com/brandidentity` | `0.85` | Weekly |
| `/privacy-policy` | Privacy Policy | `https://inextets.in/privacy-policy` | `https://inextets.com/privacy-policy` | `0.40` | Yearly |
| `/terms-conditions` | Terms & Conditions | `https://inextets.in/terms-conditions` | `https://inextets.com/terms-conditions` | `0.40` | Yearly |

---

## 🤖 Dual-Domain Crawling Configuration

### Robots Configuration (`src/app/robots.js` ➔ `/robots.txt`)
Directs search bots crawling either domain to their sitemaps while protecting internal portals:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /employee/
Disallow: /client/
Disallow: /newscreate
Disallow: /api/

Sitemap: https://inextets.in/sitemap.xml
Sitemap: https://inextets.com/sitemap.xml
```

### Next.js Dynamic Sitemap (`src/app/sitemap.js` ➔ `/sitemap.xml`)
- Loops through both `https://inextets.in` and `https://inextets.com`.
- Attaches `alternates` with `en-IN` and `en-US` language/region codes for cross-domain SEO authority.
