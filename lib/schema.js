// =====================================================================
//  STRUCTURED DATA (JSON-LD) HELPERS
//
//  One function per schema type from the structure guide's Section 6
//  plan. Each returns a plain object matched exactly to what's visible
//  on the page it's used on — never claim more than the page shows.
// =====================================================================

import { brand } from "./content";

export const SITE_URL = "https://dotstory.io";

export function absUrl(path = "/") {
  return `${SITE_URL}${path}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: SITE_URL,
    logo: absUrl("/icon.svg"),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items) {
  // items: [{ label, href? }] — last item is the current page (no href required)
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: absUrl(it.href) } : {}),
    })),
  };
}

export function serviceSchema({ name, description, url, areaServed }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: absUrl(url),
    provider: { "@type": "Organization", name: brand.name, url: SITE_URL },
    ...(areaServed ? { areaServed } : {}),
  };
}

export function faqSchema(items) {
  if (!items || !items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleSchema({ headline, description, url, datePublished, dateModified, authorName }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absUrl(url),
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: authorName || `${brand.name} Editorial` },
    publisher: { "@type": "Organization", name: brand.name },
  };
}

export function aboutPageSchema({ url }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absUrl(url),
    about: { "@type": "Organization", name: brand.name },
  };
}

export function contactPageSchema({ url }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absUrl(url),
  };
}

export function collectionPageSchema({ url, name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absUrl(url),
    name,
    description,
  };
}
